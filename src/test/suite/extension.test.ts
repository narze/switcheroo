import * as assert from 'assert';
import { before } from 'mocha';
import * as fs from 'fs';
import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

const workspacePath = path.resolve(__dirname, '../../../src/test/fixtures/workspace');

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('Create & open files', async () => {
    let files:string[] = [
      "hello.txt",
      "hello_test.txt",
    ];

    let mappings:string[][] = [
      [
        "*.txt",
        "*_test.txt",
      ]
    ];

    for (let file of files) {
      fs.closeSync(fs.openSync(`${workspacePath}/${file}`, 'w'));
    }

    // Update config
    // TODO: Update temp config
    let target = vscode.ConfigurationTarget.Global;
    await vscode.workspace.getConfiguration('switcheroo').update('mappings', mappings, target);

    // Open file
    let doc = await vscode
      .workspace
      .openTextDocument(`${workspacePath}/${files[0]}`);

    await vscode.window.showTextDocument(doc);

    // Swap to other file
    await vscode.commands.executeCommand('extension.switcheroo.swap');

    // Expect another file
    assert(vscode.window.activeTextEditor!.document.fileName === `${workspacePath}/${files[1]}`);
	}).timeout(5000);
});
