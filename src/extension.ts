import * as vscode from 'vscode';
import { automatic_virtual_enviroment} from './Utils/Create_Profile';


export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('autorun-python-virtual-environment.Python_Virtual_Enviroment', async () => {
		const venvPath = vscode.workspace.getConfiguration('autorun-python-virtual-environment').get<string>('venv') || 'env';
		automatic_virtual_enviroment(venvPath);
	});
	context.subscriptions.push(disposable);
	vscode.workspace.onDidSaveTextDocument(async (document) => {
		if (document.languageId === 'python') {
			const config = vscode.workspace.getConfiguration('autorun-python-virtual-environment');
			if (config.get<boolean>('runOnSave')) {
				const choice = await vscode.window.showInformationMessage(
					'Do you want to create a virtual environment?',
					'Yes', 'No'
				);
				if (choice === 'Yes') {
					const venvPath = config.get<string>('venv') || 'env';
					await automatic_virtual_enviroment(venvPath);
				}
			}
		}
	});
}
export function deactivate() {}