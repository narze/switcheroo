// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "switcheroo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

  context.subscriptions.push(disposable);

	let swapCommand = vscode.commands.registerCommand('extension.switcheroo.swap', async () => {
    let mappings: Array<Array<string>> = await vscode.workspace.getConfiguration().get('switcheroo.mappings') || [];
    let currentFile = vscode.window.activeTextEditor!.document.fileName;

    if (vscode.workspace.workspaceFolders) {
      let workspaceRoot = vscode.workspace.workspaceFolders[0].uri.path;
      let currentFileRelative = currentFile.split(workspaceRoot + '/')[1];

      for (let mapping of mappings) {
        let index = mapping.indexOf(currentFileRelative);

        if (index !== -1) {
          let nextIndex = (index + 1) % mapping.length;
          let nextFile = mapping[nextIndex];
          let document = await vscode.workspace.openTextDocument(workspaceRoot + '/' + nextFile);

          return vscode.window.showTextDocument(document);
        }
      }
    } else {
      return vscode.window.showErrorMessage('Switcheroo : Please add a folder to this workspace to use this function.');
    }
    return;
	});

	context.subscriptions.push(swapCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
