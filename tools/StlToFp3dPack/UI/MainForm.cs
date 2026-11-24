using System.Windows.Forms;
using StlToFp3dPack.Io;
using StlToFp3dPack.Models;
using StlToFp3dPack.Rendering;
using StlToFp3dPack.Services;

namespace StlToFp3dPack.UI;

/// <summary>WinForms shell for pack editing and the guided STL import workflow.</summary>
public sealed class MainForm : Form
{
    private static readonly string[] ColorRoles =
    {
        "body", "fabric", "cushion", "wood", "white", "front", "metal", "dark", "glass", "plant", "pot", "accent",
    };

    private readonly PackEditor _editor = new();
    private readonly StlImportSession _session = new();

    private readonly TextBox _packId = new();
    private readonly TextBox _packName = new();
    private readonly TextBox _publisher = new();
    private readonly NumericUpDown _release = new();
    private readonly TextBox _description = new();
    private readonly TextBox _features = new();
    private readonly CheckBox _hasModule = new();
    private readonly ComboBox _moduleKind = new();
    private readonly TextBox _moduleCode = new();

    private readonly ListBox _items = new();
    private readonly TextBox _status = new();

    private readonly Button _openStl = new() { Text = "Open STL…" };
    private readonly ComboBox _upAxis = new();
    private readonly NumericUpDown _target = new();
    private readonly Button _applySize = new() { Text = "Apply size" };
    private readonly Label _rawExtents = new();
    private readonly TextBox _itemId = new();
    private readonly TextBox _itemName = new();
    private readonly ListBox _parts = new();
    private readonly Button _addBox = new() { Text = "Add box" };
    private readonly Button _addCyl = new() { Text = "Add cyl" };
    private readonly Button _duplicatePart = new() { Text = "Duplicate" };
    private readonly Button _deletePart = new() { Text = "Delete" };
    private readonly Button _moveUp = new() { Text = "Move up" };
    private readonly Button _moveDown = new() { Text = "Move down" };
    private readonly Label _partCount = new();

    private readonly ComboBox _partShape = new();
    private readonly NumericUpDown _partX = NewFraction();
    private readonly NumericUpDown _partZ = NewFraction();
    private readonly NumericUpDown _partW = NewSpan();
    private readonly NumericUpDown _partD = NewSpan();
    private readonly NumericUpDown _partY = NewSpan();
    private readonly NumericUpDown _partH = NewSpan();
    private readonly ComboBox _partColor = new();
    private readonly TextBox _partHex = new();
    private readonly Button _pickColor = new() { Text = "Pick…" };
    private readonly ComboBox _partAxis = new();
    private readonly NumericUpDown _partRot = new();
    private readonly CheckBox _glassLook = new() { Text = "Glass-like look" };
    private readonly Button _applyPart = new() { Text = "Apply to part" };

    private readonly ModelViewport _viewport = new();
    private readonly Button _resetView = new() { Text = "Reset view" };
    private readonly Button _fitView = new() { Text = "Fit model" };

    private bool _loadingParts;

    public MainForm()
    {
        Text = "STL to fp3dpack guided converter";
        StartPosition = FormStartPosition.CenterScreen;
        Size = new System.Drawing.Size(1180, 760);
        MinimumSize = new System.Drawing.Size(1000, 640);
        BuildUi();
        RefreshAll();
    }

    private void BuildUi()
    {
        var menu = new MenuStrip();
        var file = new ToolStripMenuItem("File");
        file.DropDownItems.Add(new ToolStripMenuItem("New pack", null, (_, _) => NewPack()));
        file.DropDownItems.Add(new ToolStripMenuItem("Open pack…", null, (_, _) => OpenPack()));
        file.DropDownItems.Add(new ToolStripMenuItem("Save As…", null, (_, _) => SaveAs()));
        file.DropDownItems.Add(new ToolStripMenuItem("Overwrite open pack", null, (_, _) => Overwrite()));
        file.DropDownItems.Add(new ToolStripSeparator());
        file.DropDownItems.Add(new ToolStripMenuItem("Exit", null, (_, _) => Close()));
        menu.Items.Add(file);
        Controls.Add(menu);
        MainMenuStrip = menu;

        var root = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 1, Padding = new Padding(8) };
        root.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 48));
        root.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 52));

        var left = new TableLayoutPanel { Dock = DockStyle.Fill, RowCount = 3, ColumnCount = 1 };
        left.RowStyles.Add(new RowStyle(SizeType.Absolute, 285));
        left.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        left.RowStyles.Add(new RowStyle(SizeType.Absolute, 130));
        left.Controls.Add(BuildMetadataGroup(), 0, 0);
        left.Controls.Add(BuildItemsGroup(), 0, 1);
        left.Controls.Add(BuildStatusGroup(), 0, 2);

        var right = new TableLayoutPanel { Dock = DockStyle.Fill, RowCount = 3, ColumnCount = 1 };
        right.RowStyles.Add(new RowStyle(SizeType.Absolute, 190));
        right.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        right.RowStyles.Add(new RowStyle(SizeType.Absolute, 150));
        right.Controls.Add(BuildStlGroup(), 0, 0);
        right.Controls.Add(BuildPartsGroup(), 0, 1);
        right.Controls.Add(BuildPreviewPanel(), 0, 2);

        root.Controls.Add(left, 0, 0);
        root.Controls.Add(right, 1, 0);
        Controls.Add(root);
    }

    private GroupBox BuildMetadataGroup()
    {
        var group = new GroupBox { Text = "Pack metadata", Dock = DockStyle.Fill };
        var grid = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 7, Padding = new Padding(8) };
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 110));
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        for (int i = 0; i < 7; i++)
            grid.RowStyles.Add(new RowStyle(SizeType.Absolute, 34));

        AddRow(grid, 0, "Id", _packId);
        AddRow(grid, 1, "Name", _packName);
        AddRow(grid, 2, "Publisher", _publisher);
        _release.Minimum = 1;
        _release.Maximum = 100000;
        AddRow(grid, 3, "Release", _release);
        AddRow(grid, 4, "Description", _description);
        _features.PlaceholderText = "comma-separated feature ids";
        AddRow(grid, 5, "Features", _features);

        var modulePanel = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.LeftToRight, AutoScroll = true };
        _hasModule.Text = "Module";
        _hasModule.AutoSize = true;
        _moduleKind.DropDownStyle = ComboBoxStyle.DropDownList;
        _moduleKind.Items.AddRange(new object[] { "voice", "stage" });
        _moduleKind.SelectedIndex = 0;
        _moduleKind.Width = 80;
        _moduleCode.Width = 200;
        _moduleCode.PlaceholderText = "JavaScript module code";
        modulePanel.Controls.Add(_hasModule);
        modulePanel.Controls.Add(_moduleKind);
        modulePanel.Controls.Add(_moduleCode);
        grid.Controls.Add(modulePanel, 1, 6);
        grid.Controls.Add(new Label { Text = "Module", AutoSize = true, Padding = new Padding(0, 8, 0, 0) }, 0, 6);

        _hasModule.CheckedChanged += (_, _) => UpdateModuleControls();
        UpdateModuleControls();
        group.Controls.Add(grid);
        return group;
    }

    private GroupBox BuildItemsGroup()
    {
        var group = new GroupBox { Text = "Pack items", Dock = DockStyle.Fill };
        var grid = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 1, RowCount = 2, Padding = new Padding(8) };
        grid.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        grid.RowStyles.Add(new RowStyle(SizeType.Absolute, 40));
        _items.Dock = DockStyle.Fill;
        grid.Controls.Add(_items, 0, 0);

        var buttons = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.LeftToRight };
        var remove = new Button { Text = "Remove selected item", AutoSize = true };
        remove.Click += (_, _) => RemoveItem();
        buttons.Controls.Add(remove);
        grid.Controls.Add(buttons, 0, 1);
        group.Controls.Add(grid);
        return group;
    }

    private GroupBox BuildStatusGroup()
    {
        var group = new GroupBox { Text = "Validation", Dock = DockStyle.Fill };
        _status.Dock = DockStyle.Fill;
        _status.Multiline = true;
        _status.ReadOnly = true;
        _status.ScrollBars = ScrollBars.Vertical;
        group.Controls.Add(_status);
        return group;
    }

    private GroupBox BuildStlGroup()
    {
        var group = new GroupBox { Text = "STL import", Dock = DockStyle.Fill };
        var grid = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 5, Padding = new Padding(8) };
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 130));
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        for (int i = 0; i < 5; i++)
            grid.RowStyles.Add(new RowStyle(SizeType.Absolute, 32));

        _openStl.AutoSize = true;
        _openStl.Click += (_, _) => OpenStl();
        grid.Controls.Add(_openStl, 1, 0);
        grid.Controls.Add(new Label { Text = "STL file", AutoSize = true, Padding = new Padding(0, 8, 0, 0) }, 0, 0);

        _upAxis.DropDownStyle = ComboBoxStyle.DropDownList;
        _upAxis.Items.AddRange(new object[] { "Z up", "Y up" });
        _upAxis.SelectedIndex = 0;
        grid.Controls.Add(_upAxis, 1, 1);
        grid.Controls.Add(new Label { Text = "Up axis", AutoSize = true, Padding = new Padding(0, 8, 0, 0) }, 0, 1);

        _target.DecimalPlaces = 4;
        _target.Minimum = 0.01m;
        _target.Maximum = 10m;
        _target.Value = 1m;
        _target.Width = 120;
        _applySize.AutoSize = true;
        _applySize.Click += (_, _) => ApplySize();
        var sizePanel = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.LeftToRight };
        sizePanel.Controls.Add(_target);
        sizePanel.Controls.Add(_applySize);
        grid.Controls.Add(sizePanel, 1, 2);
        grid.Controls.Add(new Label { Text = "Longest extent (m)", AutoSize = true, Padding = new Padding(0, 8, 0, 0) }, 0, 2);

        _rawExtents.AutoSize = true;
        grid.Controls.Add(_rawExtents, 1, 3);
        grid.Controls.Add(new Label { Text = "Raw extents", AutoSize = true, Padding = new Padding(0, 8, 0, 0) }, 0, 3);

        var buttons = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.LeftToRight };
        var addItem = new Button { Text = "Add item to pack", AutoSize = true };
        addItem.Click += (_, _) => AddItemToPack();
        buttons.Controls.Add(addItem);
        buttons.Controls.Add(new Label { Text = "Item id / name", AutoSize = true, Padding = new Padding(6, 8, 4, 0) });
        _itemId.Width = 150;
        _itemName.Width = 180;
        buttons.Controls.Add(_itemId);
        buttons.Controls.Add(_itemName);
        grid.Controls.Add(buttons, 1, 4);
        grid.Controls.Add(new Label { Text = "New item", AutoSize = true, Padding = new Padding(0, 8, 0, 0) }, 0, 4);

        group.Controls.Add(grid);
        return group;
    }

    private GroupBox BuildPartsGroup()
    {
        var group = new GroupBox { Text = "Primitive parts", Dock = DockStyle.Fill };
        var grid = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 1, Padding = new Padding(8) };
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 42));
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 58));

        var listPanel = new TableLayoutPanel { Dock = DockStyle.Fill, RowCount = 2, ColumnCount = 1 };
        listPanel.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        listPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 44));
        _parts.Dock = DockStyle.Fill;
        _parts.SelectedIndexChanged += (_, _) => LoadSelectedPart();
        listPanel.Controls.Add(_parts, 0, 0);
        var partButtons = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.LeftToRight };
        _addBox.AutoSize = true;
        _addBox.Click += (_, _) => AddPart("box");
        _addCyl.AutoSize = true;
        _addCyl.Click += (_, _) => AddPart("cyl");
        _duplicatePart.AutoSize = true;
        _duplicatePart.Click += (_, _) => DuplicatePart();
        _deletePart.AutoSize = true;
        _deletePart.Click += (_, _) => DeletePart();
        _moveUp.AutoSize = true;
        _moveUp.Click += (_, _) => MovePart(-1);
        _moveDown.AutoSize = true;
        _moveDown.Click += (_, _) => MovePart(1);
        _partCount.AutoSize = true;
        _partCount.Padding = new Padding(10, 8, 0, 0);
        partButtons.Controls.Add(_addBox);
        partButtons.Controls.Add(_addCyl);
        partButtons.Controls.Add(_duplicatePart);
        partButtons.Controls.Add(_deletePart);
        partButtons.Controls.Add(_moveUp);
        partButtons.Controls.Add(_moveDown);
        partButtons.Controls.Add(_partCount);
        listPanel.Controls.Add(partButtons, 0, 1);
        grid.Controls.Add(listPanel, 0, 0);
        grid.Controls.Add(BuildPartEditor(), 1, 0);
        group.Controls.Add(grid);
        return group;
    }

    private GroupBox BuildPartEditor()
    {
        var group = new GroupBox { Text = "Part fields", Dock = DockStyle.Fill };
        var grid = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 12, Padding = new Padding(8) };
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 62));
        grid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        for (int i = 0; i < 12; i++)
            grid.RowStyles.Add(new RowStyle(SizeType.Absolute, i is 10 or 11 ? 42 : 26));

        _partShape.DropDownStyle = ComboBoxStyle.DropDownList;
        _partShape.Items.AddRange(new object[] { "box", "cyl" });
        _partShape.SelectedIndex = 0;
        AddRow(grid, 0, "Shape", _partShape);
        AddRow(grid, 1, "x", _partX);
        AddRow(grid, 2, "z", _partZ);
        AddRow(grid, 3, "w", _partW);
        AddRow(grid, 4, "d", _partD);
        AddRow(grid, 5, "y", _partY);
        AddRow(grid, 6, "h", _partH);

        _partAxis.DropDownStyle = ComboBoxStyle.DropDownList;
        _partAxis.Items.AddRange(new object[] { "(default)", "x", "y", "z" });
        _partAxis.SelectedIndex = 0;
        AddRow(grid, 7, "Axis", _partAxis);

        _partRot.Minimum = -360m;
        _partRot.Maximum = 360m;
        _partRot.DecimalPlaces = 1;
        _partRot.Increment = 1m;
        AddRow(grid, 8, "Rot °", _partRot);

        _partColor.DropDownStyle = ComboBoxStyle.DropDownList;
        _partColor.Items.AddRange(ColorRoles.Cast<object>().ToArray());
        _partColor.SelectedIndex = 0;
        _partHex.PlaceholderText = "#rrggbb";
        _partHex.Width = 100;
        _pickColor.AutoSize = true;
        _pickColor.Click += (_, _) => PickColor();
        var colorPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = false,
        };
        colorPanel.Controls.Add(_partColor);
        colorPanel.Controls.Add(_partHex);
        colorPanel.Controls.Add(_pickColor);
        grid.Controls.Add(colorPanel, 1, 9);
        grid.Controls.Add(new Label { Text = "Color", AutoSize = true, Padding = new Padding(0, 6, 0, 0) }, 0, 9);

        _glassLook.AutoSize = true;
        var glassWarning = new Label
        {
            Text = "fp3dpack cannot store real transparency; this exports only the color role \"glass\".",
            AutoSize = true,
            MaximumSize = new System.Drawing.Size(300, 40),
            ForeColor = System.Drawing.Color.DarkSlateGray,
        };
        var glassPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = true,
        };
        glassPanel.Controls.Add(_glassLook);
        glassPanel.Controls.Add(glassWarning);
        _glassLook.CheckedChanged += (_, _) =>
        {
            if (_loadingParts)
                return;
            if (_glassLook.Checked)
            {
                _partHex.Text = "";
                _partColor.SelectedItem = "glass";
            }
            else if (string.Equals(_partColor.SelectedItem?.ToString(), "glass", StringComparison.Ordinal))
            {
                _partColor.SelectedItem = "body";
            }
        };
        _partColor.SelectedValueChanged += (_, _) =>
        {
            if (!_loadingParts)
                _glassLook.Checked = string.Equals(_partColor.SelectedItem?.ToString(), "glass", StringComparison.Ordinal);
        };
        grid.Controls.Add(glassPanel, 1, 10);
        grid.Controls.Add(new Label { Text = "Transparency", AutoSize = true, Padding = new Padding(0, 6, 0, 0) }, 0, 10);

        _applyPart.AutoSize = true;
        _applyPart.Click += (_, _) => ApplyPart();
        var lastPanel = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            FlowDirection = FlowDirection.LeftToRight,
            WrapContents = true,
        };
        lastPanel.Controls.Add(_applyPart);
        grid.Controls.Add(lastPanel, 1, 11);
        group.Controls.Add(grid);
        return group;
    }

    private Panel BuildPreviewPanel()
    {
        var panel = new Panel { Dock = DockStyle.Fill };

        _viewport.Dock = DockStyle.Fill;
        _viewport.PartSelected += index =>
        {
            if (index >= 0 && index < _parts.Items.Count)
                _parts.SelectedIndex = index;
        };
        panel.Controls.Add(_viewport);

        var note = new Label
        {
            Text = "Blue: scaled STL wireframe · shaded parts are selectable · glass is a color-role preview, not real transparency",
            Dock = DockStyle.Bottom,
            Height = 28,
            TextAlign = ContentAlignment.MiddleLeft,
            ForeColor = System.Drawing.Color.DimGray,
        };
        panel.Controls.Add(note);

        var toolbar = new FlowLayoutPanel
        {
            Dock = DockStyle.Top,
            Height = 36,
            FlowDirection = FlowDirection.LeftToRight,
        };
        _resetView.AutoSize = true;
        _resetView.Click += (_, _) => _viewport.ResetView();
        _fitView.AutoSize = true;
        _fitView.Click += (_, _) => _viewport.FitView();
        toolbar.Controls.Add(_resetView);
        toolbar.Controls.Add(_fitView);
        toolbar.Controls.Add(new Label
        {
            Text = "Drag: orbit · Wheel: zoom · Click a part: select",
            AutoSize = true,
            Padding = new Padding(12, 8, 0, 0),
            ForeColor = System.Drawing.Color.DimGray,
        });
        panel.Controls.Add(toolbar);
        return panel;
    }

    private static void AddRow(TableLayoutPanel grid, int row, string label, Control control)
    {
        grid.Controls.Add(new Label { Text = label, AutoSize = true, Padding = new Padding(0, 8, 0, 0) }, 0, row);
        control.Dock = DockStyle.Fill;
        grid.Controls.Add(control, 1, row);
    }

    private static NumericUpDown NewFraction()
    {
        return new NumericUpDown
        {
            Minimum = -0.5m,
            Maximum = 0.5m,
            DecimalPlaces = 4,
            Increment = 0.01m,
        };
    }

    private static NumericUpDown NewSpan()
    {
        return new NumericUpDown
        {
            Minimum = 0.001m,
            Maximum = 1m,
            DecimalPlaces = 4,
            Increment = 0.01m,
        };
    }

    private void UpdateModuleControls()
    {
        _moduleKind.Enabled = _hasModule.Checked;
        _moduleCode.Enabled = _hasModule.Checked;
    }

    private void CaptureMetadata()
    {
        var features = _features.Text
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList();
        ModuleDefinition? module = _hasModule.Checked
            ? new ModuleDefinition { Api = 1, Kind = _moduleKind.SelectedItem?.ToString() ?? "voice", Code = _moduleCode.Text }
            : null;
        _editor.UpdateMetadata(new PackMetadataEdit(
            _packId.Text,
            _packName.Text,
            _publisher.Text,
            (int)_release.Value,
            _description.Text,
            features,
            module));
    }

    private void RefreshAll()
    {
        _packId.Text = _editor.Document.Id;
        _packName.Text = _editor.Document.Name;
        _publisher.Text = _editor.Document.Publisher;
        _release.Value = Math.Max(_release.Minimum, Math.Min(_release.Maximum, _editor.Document.Release));
        _description.Text = _editor.Document.Description;
        _features.Text = string.Join(", ", _editor.Document.Features);
        _hasModule.Checked = _editor.Document.Module is not null;
        _moduleKind.SelectedItem = _editor.Document.Module?.Kind ?? "voice";
        _moduleCode.Text = _editor.Document.Module?.Code ?? "";
        UpdateModuleControls();
        RefreshItems();
        RefreshParts();
        RefreshValidation();
    }

    private void RefreshItems()
    {
        _items.Items.Clear();
        foreach (PackItem item in _editor.Document.Items)
        {
            _items.Items.Add($"{item.Id} — {item.Name.GetValueOrDefault("en", "")} — {item.Parts.Count} parts");
        }
        if (_items.Items.Count > 0)
            _items.SelectedIndex = 0;
    }

    private void RefreshParts()
    {
        _loadingParts = true;
        _parts.Items.Clear();
        foreach (PackPart part in _session.Parts)
        {
            _parts.Items.Add($"{part.Shape}: x={part.X:0.###} z={part.Z:0.###} y={part.Y:0.###} w={part.W:0.###} d={part.D:0.###} h={part.H:0.###} {part.Color}");
        }
        if (_parts.Items.Count > 0)
            _parts.SelectedIndex = 0;
        _partCount.Text = $"Parts: {_parts.Items.Count} / {PackValidator.MaxParts}";
        _partCount.ForeColor = _parts.Items.Count >= PackValidator.MaxParts
            ? System.Drawing.Color.Firebrick
            : System.Drawing.Color.DimGray;
        _loadingParts = false;
        LoadSelectedPart();
        UpdateViewport();
    }

    private void UpdateViewport()
    {
        _viewport.SetScene(PreviewScene.Create(_session.Normalized, _session.Parts));
    }

    private void RefreshValidation()
    {
        var lines = new List<string>();
        ValidationResult packResult = _editor.Validate();
        lines.Add(packResult.IsValid ? "Pack: valid." : "Pack errors:\n- " + string.Join("\n- ", packResult.Errors));
        if (_session.HasMesh || _session.HasSize)
        {
            ValidationResult itemResult = _session.ValidateCurrent();
            lines.Add(itemResult.IsValid ? "Current item: valid." : "Current item errors:\n- " + string.Join("\n- ", itemResult.Errors));
        }
        _status.Text = string.Join("\n\n", lines);
    }

    private PackPart? SelectedPart()
    {
        int index = _parts.SelectedIndex;
        return index >= 0 && index < _session.Parts.Count ? _session.Parts[index] : null;
    }

    private void LoadSelectedPart()
    {
        if (_loadingParts)
            return;
        PackPart? part = SelectedPart();
        _viewport.SetSelectedPart(_parts.SelectedIndex);
        foreach (Control control in new Control[]
        {
            _partShape, _partX, _partZ, _partW, _partD, _partY, _partH,
            _partAxis, _partRot, _partColor, _partHex, _pickColor, _glassLook, _applyPart,
        })
            control.Enabled = part is not null;
        if (part is null)
            return;

        _loadingParts = true;
        _partShape.SelectedItem = part.Shape;
        _partX.Value = Clamp(_partX, part.X);
        _partZ.Value = Clamp(_partZ, part.Z);
        _partW.Value = Clamp(_partW, part.W);
        _partD.Value = Clamp(_partD, part.D);
        _partY.Value = Clamp(_partY, part.Y);
        _partH.Value = Clamp(_partH, part.H);
        _partAxis.SelectedItem = string.IsNullOrEmpty(part.Axis) ? "(default)" : part.Axis;
        _partRot.Value = Clamp(_partRot, part.Rot ?? 0);

        bool glass = string.Equals(part.Color, "glass", StringComparison.Ordinal);
        _glassLook.Checked = glass;
        if (glass)
        {
            _partColor.SelectedItem = "glass";
            _partHex.Text = "";
        }
        else if (ColorRoles.Contains(part.Color))
        {
            _partColor.SelectedItem = part.Color;
            _partHex.Text = "";
        }
        else
        {
            _partColor.SelectedItem = "body";
            _partHex.Text = part.Color ?? "";
        }
        _loadingParts = false;
    }

    private static decimal Clamp(NumericUpDown control, double value) =>
        Math.Max(control.Minimum, Math.Min(control.Maximum, (decimal)Math.Clamp(value, (double)control.Minimum, (double)control.Maximum)));

    private void ApplyPart()
    {
        PackPart? part = SelectedPart();
        if (part is null)
            return;
        part.Shape = _partShape.SelectedItem?.ToString() ?? "box";
        part.X = (double)_partX.Value;
        part.Z = (double)_partZ.Value;
        part.W = (double)_partW.Value;
        part.D = (double)_partD.Value;
        part.Y = (double)_partY.Value;
        part.H = (double)_partH.Value;
        part.Axis = string.Equals(_partAxis.SelectedItem?.ToString(), "(default)", StringComparison.Ordinal)
            ? null
            : _partAxis.SelectedItem?.ToString();
        part.Rot = (double)_partRot.Value;

        string hex = _partHex.Text.Trim();
        part.Color = _glassLook.Checked
            ? "glass"
            : hex.Length > 0
                ? hex
                : _partColor.SelectedItem?.ToString() ?? "body";
        RefreshParts();
        RefreshValidation();
    }

    private void PickColor()
    {
        using var dialog = new ColorDialog
        {
            FullOpen = true,
            Color = TryParseColor(_partHex.Text) ?? System.Drawing.Color.LightSlateGray,
        };
        if (dialog.ShowDialog(this) != DialogResult.OK)
            return;
        _glassLook.Checked = false;
        _partHex.Text = $"#{dialog.Color.R:X2}{dialog.Color.G:X2}{dialog.Color.B:X2}";
        ApplyPart();
    }

    private static System.Drawing.Color? TryParseColor(string value)
    {
        try
        {
            PreviewColor parsed = PreviewColor.FromHex(value);
            return System.Drawing.Color.FromArgb(
                (int)(parsed.R * 255),
                (int)(parsed.G * 255),
                (int)(parsed.B * 255));
        }
        catch (FormatException)
        {
            return null;
        }
    }

    private void MovePart(int delta)
    {
        PackPart? part = SelectedPart();
        if (part is null || !_session.MovePart(part, delta))
            return;
        RefreshParts();
        RefreshValidation();
    }

    private void AddPart(string shape)
    {
        try
        {
            _session.AddPart(shape);
            RefreshParts();
            RefreshValidation();
        }
        catch (InvalidOperationException ex)
        {
            MessageBox.Show(this, ex.Message, "Cannot add part", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
    }

    private void DuplicatePart()
    {
        PackPart? part = SelectedPart();
        if (part is null)
            return;
        try
        {
            _session.DuplicatePart(part);
            RefreshParts();
            RefreshValidation();
        }
        catch (InvalidOperationException ex)
        {
            MessageBox.Show(this, ex.Message, "Cannot duplicate part", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
    }

    private void DeletePart()
    {
        PackPart? part = SelectedPart();
        if (part is null)
            return;
        _session.RemovePart(part);
        RefreshParts();
        RefreshValidation();
    }

    private void NewPack()
    {
        if (!ConfirmDiscard())
            return;
        _editor.NewPack();
        RefreshAll();
    }

    private void OpenPack()
    {
        using var dialog = new OpenFileDialog
        {
            Filter = "fp3dpack files (*.fp3dpack;*.json)|*.fp3dpack;*.json|All files (*.*)|*.*",
            Title = "Open an fp3dpack file",
        };
        if (dialog.ShowDialog(this) != DialogResult.OK)
            return;
        try
        {
            _editor.OpenPack(dialog.FileName);
            RefreshAll();
        }
        catch (InvalidDataException ex)
        {
            MessageBox.Show(this, ex.Message, "Cannot open pack", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private void OpenStl()
    {
        using var dialog = new OpenFileDialog
        {
            Filter = "STL files (*.stl)|*.stl|All files (*.*)|*.*",
            Title = "Open an STL file",
        };
        if (dialog.ShowDialog(this) != DialogResult.OK)
            return;
        try
        {
            UpAxis axis = _upAxis.SelectedIndex == 1 ? UpAxis.Y : UpAxis.Z;
            _session.LoadStl(dialog.FileName, axis);
            _itemId.Text = _session.ItemId;
            _itemName.Text = _session.ItemName;
            double[] extents = _session.RawExtents();
            _rawExtents.Text = $"{extents[0]:0.###} × {extents[1]:0.###} × {extents[2]:0.###} (raw units, not metres)";
            _target.Enabled = true;
            _applySize.Enabled = true;
            RefreshParts();
            RefreshValidation();
        }
        catch (InvalidDataException ex)
        {
            MessageBox.Show(this, ex.Message, "Cannot open STL", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private void ApplySize()
    {
        try
        {
            _session.ApplySize((double)_target.Value);
            RefreshParts();
            RefreshValidation();
        }
        catch (ArgumentException ex)
        {
            MessageBox.Show(this, ex.Message, "Cannot apply size", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
    }

    private void AddItemToPack()
    {
        CaptureMetadata();
        _session.ItemId = _itemId.Text.Trim();
        _session.ItemName = _itemName.Text.Trim();
        try
        {
            PackItem item = _session.CreateItem();
            ValidationResult result = _editor.AddItem(item);
            RefreshItems();
            RefreshValidation();
            if (!result.IsValid)
                MessageBox.Show(this, string.Join("\n", result.Errors), "Item not added", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
        catch (InvalidOperationException ex)
        {
            MessageBox.Show(this, ex.Message, "Item not added", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
    }

    private void RemoveItem()
    {
        int index = _items.SelectedIndex;
        if (index < 0 || index >= _editor.Document.Items.Count)
            return;
        string id = _editor.Document.Items[index].Id;
        if (MessageBox.Show(this, $"Remove item '{id}' from the pack?", "Remove item", MessageBoxButtons.YesNo, MessageBoxIcon.Question) != DialogResult.Yes)
            return;
        CaptureMetadata();
        ValidationResult result = _editor.RemoveItem(id);
        RefreshItems();
        RefreshValidation();
        if (!result.IsValid)
            MessageBox.Show(this, string.Join("\n", result.Errors), "Item not removed", MessageBoxButtons.OK, MessageBoxIcon.Warning);
    }

    private void SaveAs()
    {
        CaptureMetadata();
        using var dialog = new SaveFileDialog
        {
            Filter = "fp3dpack files (*.fp3dpack)|*.fp3dpack|JSON files (*.json)|*.json",
            FileName = _editor.SourcePath is null ? _packId.Text + ".fp3dpack" : Path.GetFileName(_editor.SourcePath),
            Title = "Save pack as",
            OverwritePrompt = true,
        };
        if (dialog.ShowDialog(this) != DialogResult.OK)
            return;
        try
        {
            _editor.SaveAs(dialog.FileName);
            RefreshValidation();
        }
        catch (Exception ex) when (ex is IOException or InvalidDataException or InvalidOperationException)
        {
            MessageBox.Show(this, ex.Message, "Cannot save pack", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private void Overwrite()
    {
        if (_editor.SourcePath is null)
        {
            MessageBox.Show(this, "Open an existing pack first, or use Save As.", "No pack file open", MessageBoxButtons.OK, MessageBoxIcon.Information);
            return;
        }
        CaptureMetadata();
        if (MessageBox.Show(this, $"Overwrite {_editor.SourcePath}?", "Confirm overwrite", MessageBoxButtons.YesNo, MessageBoxIcon.Warning) != DialogResult.Yes)
            return;
        try
        {
            _editor.Overwrite();
            RefreshValidation();
        }
        catch (Exception ex) when (ex is IOException or InvalidDataException or InvalidOperationException)
        {
            MessageBox.Show(this, ex.Message, "Cannot save pack", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private bool ConfirmDiscard()
    {
        return MessageBox.Show(this, "Discard the current pack and start a new one?", "New pack", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes;
    }
}
