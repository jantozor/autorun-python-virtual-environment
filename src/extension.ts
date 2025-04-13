import * as vscode from 'vscode';
import { createTestFile} from './Utils/Create_Profile';


export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('autorun-python-virtual-environment.Python_Virtual_Enviroment', async () => {
		createTestFile();
	});
	context.subscriptions.push(disposable);
}
export function deactivate() {}