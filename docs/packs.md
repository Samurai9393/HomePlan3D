# Möbel- und Modul-Packs

Packs bringen zusätzliche Möbel oder Code in HomePlan 3D. Sie werden lokal als JSON-Datei
importiert. Eine Signatur, ein Herausgeber-Schlüssel, ein Kundenkonto oder ein Shop-Server
ist dafür nicht nötig: Alle Funktionen sind MIT-open-source und standardmäßig aktiviert.

## Import

1. Pack-Quelle als JSON schreiben (Format unten).
2. In Home Assistant importieren: Editor → **Möbel** → **Möbel-Pack importieren …**.
   Für Module: **⚙ Einstellungen → 🧩 Module → Modul einspielen …** oder
   **Erweiterungen → Module → Modul einspielen …**.
3. Bei Modulen den Code als Administrator ansehen und freigeben. Erst danach läuft er.

Mehrere Dateien können auf einmal ausgewählt werden. Entfernte Packs bleiben als einfache
Kästen im Plan und erscheinen nach erneutem Import wieder mit allen Verknüpfungen.

## Format

```json
{
  "format": "fp3dpack",
  "version": 1,
  "id": "example.kueche",
  "name": "Küchen-Pack",
  "publisher": "lokal",
  "description": "optional",
  "items": [
    {
      "id": "retro_fridge",
      "name": { "de": "Retro-Kühlschrank", "en": "Retro fridge" },
      "size": [0.6, 0.65, 1.5],
      "electric": true,
      "parts": [{ "shape": "box", "x": 0, "z": 0, "w": 1, "d": 1, "y": 0, "h": 1, "color": "white", "edges": true }],
      "symbol": [{ "shape": "rect", "x": 0, "z": 0, "w": 1, "d": 1 }]
    }
  ]
}
```

- `size`: Standardgröße in Metern (Breite, Tiefe, Höhe). Im Plan lässt sich jedes Möbel danach frei
  skalieren; alle Teile wachsen mit – außer denen mit `fix`.
- `fix` an einem Teil: welche Maße das Teil beim Skalieren **behält** – `"w"`, `"d"`, `"h"`
  oder mehrere (`"wdh"`). Beine, Armlehnen, Platten und Griffe behalten so ihre Größe, die Teile
  dazwischen strecken sich.
- `parts` (max. 60): `box`, `cyl` oder `loft`. Alle Maße sind **Anteile der Möbelgröße**: `x`/`z`
  Mitte (−0,5 … 0,5, vorne ist +z), `w`/`d` Breite/Tiefe (0 … 1), `y` Unterkante und `h` Höhe (0 … 1
  der Höhe). Ein Zylinder nimmt den kleineren Wert von `w` und `d` als Durchmesser; mit `axis: "x"`
  oder `"z"` liegt er entlang der Achse. Ein `loft` ist ein Quader mit anderer Oberseite
  (`tx`/`tz` Mitte, `tw`/`td` Größe) – für schräge Flächen.
- `rot` (Grad) dreht ein Teil um seine eigene Mitte, etwa für Wendeltreppen oder diagonale Streben.
- `color`: `#rrggbb` oder eine Rolle der eingebauten Palette (`body`, `fabric`, `cushion`, `wood`,
  `white`, `metal`, `dark`, `glass`, `plant`, `pot`, `accent`). `top` setzt eine eigene Farbe für die
  Oberseite, `edges` zeichnet leuchtende Kanten (`true`, `"glow"`, `"faint"`).
- `symbol` (optional, max. 40): Draufsicht aus `rect` (`fill` für gefüllt), `circle` (`r` als Anteil
  der kleineren Seite) und `line` (`x1`, `z1`, `x2`, `z2`). Ohne Symbol zeichnet der Plan die Teile
  von oben.
- `electric`: das Möbel lässt sich mit einem Schalter und Leistungssensor verknüpfen.
- `mount`: `floor` (Standard), `surface` (auf dem Möbel darunter), `wall` (Unterkante bei
  `wall_y` Metern) oder `ceiling` (hängt von der Decke).
- `surface`: die Oberseite trägt andere Möbel (Tisch, Kücheninsel, Werkbank).
- `hole`: eine Treppe, die in der Etage darüber die Treppenöffnung in den Boden schneidet.
- `light`: das Möbel ist eine Leuchte; der Wert beschreibt die Ausleuchtung (`ceiling`, `pendant`,
  `floor`, `table`, `wall`, `spot`, `garden` …). Teile mit `"glow": true` leuchten in Farbe und
  Helligkeit des Lichts.
- `screen`: ein Teil mit `"screen": true` ist ein Bildschirm, der mit einem Media Player
  verknüpft werden kann.
- **Bibliothek** (optional): `group` beschreibt die Art (`sofa`, `seating`, `table`, `storage`,
  `bed`, `kitchen`, `appliance`, `bath`, `lamp`, `media`, `office`, `tech`, `heating`, `energy`,
  `household`, `deco`, `plant`, `outdoor`, `kids`, `sport`, `pets`, `vehicle`, `stairs`,
  `architecture`), `room` die passenden Räume (`living`, `dining`, `kitchen`, `bedroom`, `kids`,
  `bath`, `office`, `hall`, `utility`, `garage`, `garden`, `hobby`; leer = überall), `tags`
  weitere Suchwörter. `family` und `variant` fassen Größenvarianten zu einer Karte zusammen.
  Ohne diese Felder ordnet NeonPlan das Möbel nach seinen Wörtern und dem Pack ein.

## Funktions- und Modul-Packs

Ein Pack kann statt Möbeln (oder zusätzlich) `features` tragen, zum Beispiel
`"features": ["weather"]` mit `"items": []`. Die Pro-Funktionen sind bereits über
`custom_components/homeplan3d/open-source-config.json` aktiviert; solche Packs ergänzen nur
Möbel oder Szenen, sie schalten nichts frei.

Ein Modul-Pack bringt Code mit. Es wird genauso lokal eingespielt wie ein Möbel-Pack. Der Code
wird nicht ausgeführt, bevor ein Administrator ihn unter **Erweiterungen → Module → Code ansehen
& freigeben** geprüft und freigegeben hat. Eine neue Fassung wartet ebenfalls auf Freigabe.
Die Datei bleibt lesbar; das Projekt steht vollständig unter der MIT-Lizenz.

## Pack-Bilder

`cd frontend && node pack-images.mjs <pack.json>... --out <ordner>` rendert mit der echten
3D-Grafik (vorher `npm run build`) je Pack ein Übersichtsbild (`overview.png`, 3200 × 2400)
und ein freigestelltes PNG pro Möbel (`items/<id>.png`).

## Updates

Eine neuere Version derselben Pack-ID ersetzt die installierte Fassung, ohne etwas im Plan zu
verlieren. Kurz gesagt: lokale JSON-Dateien, keine Signatur, kein Konto, kein Server – und bei
Modulen immer menschliche Freigabe vor dem Ausführen.
