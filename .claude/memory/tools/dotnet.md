# .NET tooling

## 2026-11-24 — Windows desktop toolchain used for the STL converter
- What: Local SDK is `10.0.401`; `net8.0-windows` Windows Desktop targets build and test successfully with .NET 8/10 Windows Desktop runtimes installed. From the repo root: `dotnet build tools/StlToFp3dPack/StlToFp3dPack.csproj -c Release`, `dotnet test tools/StlToFp3dPack.Tests/StlToFp3dPack.Tests.csproj -c Release`, and `dotnet run --project tools/StlToFp3dPack/StlToFp3dPack.csproj -c Release`.
- What: Cached test packages are `Microsoft.NET.Test.Sdk` 17.14.1, `xunit` 2.9.3 and `xunit.runner.visualstudio` 3.1.4. A test project referencing the WinForms `WinExe` also uses `net8.0-windows` with `UseWindowsForms` and `EnableWindowsTargeting`.
- What: OpenTK.GLControl 4.0.2 resolves to OpenTK 4.9.3. Fixed-function `GL.Begin`/`GL.End` rendering needs `ContextProfile.Compatability` (OpenTK's spelling); GLControl uses WinForms `Paint`/`Resize` with `MakeCurrent()` and `SwapBuffers()`.
- Why: Reuse exact commands, versions and OpenTK settings instead of rediscovering them; avoid guessing package versions or the misspelled compatibility profile name.
