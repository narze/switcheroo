// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fileResolver from "./fileResolver";
import * as fs from "fs";
import * as path from "path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "switcheroo" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World!");
    }
  );

  context.subscriptions.push(disposable);

  let swapCommand = vscode.commands.registerCommand(
    "extension.switcheroo.swap",
    async () => {
      const activeFile = vscode.window.activeTextEditor;
      if (activeFile === undefined) return;

      let mappings: Array<Array<string>> =
        (await vscode.workspace
          .getConfiguration("switcheroo")
          .get("mappings")) || [];

      const currentFile = activeFile.document.uri.fsPath;

      if (vscode.workspace.workspaceFolders) {
        let workspaceRoot = vscode.workspace.workspaceFolders[0].uri.path;
        let currentFileRelative =
          currentFile.split(`${workspaceRoot}${path.sep}`)[1] || "";

        for (let mapping of mappings) {
          let targetFile = fileResolver.resolve(currentFileRelative, mapping);
          if (targetFile != false) {
            targetFile = targetFile.replace(/[\\/]/g, path.sep);
          }

          const targetFilePath = `${workspaceRoot}${path.sep}${targetFile}`;

          if (targetFile) {
            if (fs.existsSync(targetFilePath)) {
              let document = await vscode.workspace.openTextDocument(
                targetFilePath
              );
              return vscode.window.showTextDocument(document);
            } else {
              let answer = await vscode.window.showQuickPick(
                [{ label: "Yes" }, { label: "No" }],
                { placeHolder: `Create file ${targetFile}?` }
              );

              if (answer && answer.label === "Yes") {
                fs.writeFileSync(targetFilePath, "");

                let document = await vscode.workspace.openTextDocument(
                  targetFilePath
                );

                return vscode.window.showTextDocument(document);
              }
            }
          }
        }
      } else {
        return vscode.window.showErrorMessage(
          "Switcheroo : Please add a folder to this workspace to use this function."
        );
      }
      return;
    }
  );

  context.subscriptions.push(swapCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
