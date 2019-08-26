import * as assert from 'assert';
import { before } from 'mocha';
import * as fs from 'fs';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});

	test('Create & open files', async () => {
    let files:string[] = [
      "/tmp/hello.txt",
      "/tmp/hello_test.txt",
    ];

    for (let file of files) {
      fs.closeSync(fs.openSync(file, 'w'));
    }

    // Open file
    let doc = await vscode
      .workspace
      .openTextDocument(files[0]);

    await vscode.window.showTextDocument(doc);

    // Swap to other file
    await vscode.commands.executeCommand('extension.switcheroo.swap');

    // Expect another file
    assert(vscode.window.activeTextEditor!.document.fileName == files[1]);
	});
});
