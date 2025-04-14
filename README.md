# Autorun-python-virtual-environment README

**Autorun-python-virtual-environment** is a Visual Studio Code extension that automatically sets up a Python virtual environment for your project and configures the terminal to use it seamlessly. It's designed to help you bootstrap Python projects quickly without needing to manually create and activate a virtual environment.

## Features

- 📦 Automatically checks if Python is installed on your system.
- 🔁 Automatically closes all open terminals and opens a new one with the virtual environment activated.
- 🛠️ Creates a virtual environment in a folder of your choice (default: `/env`).
- 📝 Automatically generates a `.vscode/Microsoft.PowerShell_profile.ps1` script with activation logic.
- 🧠 Smart detection of existing `.vscode/settings.json` and merges required terminal profile configuration.
- ⚙️ Sets up a custom PowerShell profile for Windows terminals to auto-activate the virtual environment.

## Requirements

- Python must be installed (`python` or `python3` should be available in your system PATH).
- Works best with PowerShell on Windows.
- VS Code 1.70 or higher.

## Extension Settings

his extension contributes the following settings:

* `autorunPythonVirtualEnv.runOnSave`: Enable or disable automatic Python virtual environment creation.
* `autorunPythonVirtualEnv.env`: Set the relative folder path for the virtual environment (default: `"env"`).

## Known Issues

- Currently optimized for PowerShell terminals on Windows. Unix shell support (e.g., bash/zsh) is in progress.
- May conflict with existing PowerShell profiles if heavily customized.

## Release Notes

### 1.0.0

- Initial release of `autorun-python-virtual-environment`.
- Auto-detection of Python.
- Auto-creation of virtual environment.
- PowerShell profile configuration and terminal integration.

---