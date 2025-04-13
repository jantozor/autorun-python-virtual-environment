import * as vscode from 'vscode';
import { exec } from 'child_process';

export function checkPython(): Promise<boolean> {
	return new Promise((resolve) => {
		exec('python --version', (error, stdout, stderr) => {
			if (error) {
				exec('python3 --version', (err3, stdout3, stderr3) => {
					if (err3) {
						vscode.window.showErrorMessage('Python is not installed or not added to PATH.');
						resolve(false);
					} else {
						vscode.window.showInformationMessage(`Python is installed: ${stdout3.trim()}`);
						resolve(true);
					}
				});
			} else {
				vscode.window.showInformationMessage(`Python is installed: ${stdout.trim()}`);
				resolve(true);
			}
		});
	});
}
// Function to create the virtual environment
export function createVirtualEnv(envPath: string): Promise<boolean> {
	return new Promise((resolve) => {
		// Create the virtual environment
		exec(`python -m venv "${envPath}"`, (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage('Failed to create virtual environment.');
				resolve(false);
				return;
			}
			vscode.window.showInformationMessage('Virtual environment created successfully!');
			resolve(true);  // Resolve as true if the virtual environment is created
		});
	});
}