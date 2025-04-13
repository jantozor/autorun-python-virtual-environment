import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { checkPython, createVirtualEnv } from './python_checker';


export async function createTestFile(): Promise<boolean>  {
    const hasPython = await checkPython();
    if (!hasPython) {
		return false;
	}
    // Your new terminal settings
	const newTerminalSettings = {
		"terminal.integrated.profiles.windows": {
			"PowerShell": {
				"source": "PowerShell",
				"icon": "terminal-powershell"
			},
			"PowerShell customenv": {
				"source": "PowerShell",
				"args": [
					"-NoExit",
					"-Command",
					". '${workspaceFolder}\\.vscode\\Microsoft.PowerShell_profile.ps1'"
				],
				"icon": "terminal-powershell"
			},
			"Command Prompt": {
				"path": [
					"${env:windir}\\Sysnative\\cmd.exe",
					"${env:windir}\\System32\\cmd.exe"
				],
				"args": [],
				"icon": "terminal-cmd"
			},
			"Git Bash": {
				"source": "Git Bash"
			}
		},
		"terminal.integrated.defaultProfile.windows": "PowerShell customenv"
	};

    const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) {
		vscode.window.showErrorMessage('No workspace is open.');
		return false;
	}

	const workspacePath = workspaceFolders[0].uri.fsPath;
    const envFolderPath = path.join(workspacePath, 'env'); // You can change 'env' to another name
	const vscodeFolderPath = path.join(workspacePath, '.vscode');
	const settingsFilePath = path.join(vscodeFolderPath, 'settings.json');
	const powershellProfilePath = path.join(vscodeFolderPath, 'Microsoft.PowerShell_profile.ps1');

    if (fs.existsSync(envFolderPath)) {
        vscode.window.showInformationMessage('Virtual environment already exists.');
    }
    else{
        const virtualenv = await createVirtualEnv(envFolderPath);
    }

	// Ensure .vscode folder exists
	if (!fs.existsSync(vscodeFolderPath)) {
		fs.mkdirSync(vscodeFolderPath);
	}
    
    // Load existing settings if they exist
	let settings: any = {};
	if (fs.existsSync(settingsFilePath)) {
		try {
			const existingData = fs.readFileSync(settingsFilePath, 'utf8');
			settings = JSON.parse(existingData);
		} catch (e) {
			vscode.window.showErrorMessage('Failed to parse existing settings.json.');
			return false;
		}
	}
    // Merge settings deeply
	settings["terminal.integrated.profiles.windows"] = {
		...settings["terminal.integrated.profiles.windows"],
		...newTerminalSettings["terminal.integrated.profiles.windows"]
	};

	settings["terminal.integrated.defaultProfile.windows"] =
		newTerminalSettings["terminal.integrated.defaultProfile.windows"];

	// Write updated settings back to file
	fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 4));
	vscode.window.showInformationMessage('Updated .vscode/settings.json with terminal profiles.');

    // Create PowerShell profile script
	const powershellScriptContent = `$pythonVersion = python --version
echo "Custom environment activated for $pythonVersion"
.\\env\\Scripts\\Activate`;
    
    // Write the PowerShell profile script
    fs.writeFileSync(powershellProfilePath, powershellScriptContent);
    vscode.window.showInformationMessage('Created Microsoft.PowerShell_profile.ps1.');
	setTimeout (resetTerminal,1000);
    //resetTerminal();
    return true;
}
export function resetTerminal(): void {
	//vscode.window.terminals.forEach(terminal => terminal.dispose());
	const terminal = vscode.window.createTerminal();
	terminal.show();
	//terminal.sendText('echo Hello World');
}
