import * as assert from "assert";
import { before } from "mocha";
import { stub } from "sinon";
import * as fs from "fs";
import * as path from "path";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../extension';

const workspacePath = path.resolve(__dirname, "../../../fixtures/workspace");

suite("Extension Test Suite", () => {
  before(() => {
    vscode.window.showInformationMessage("Start all tests.");
  });

  test("Create & open files", async () => {
    let files: string[] = ["hello.txt", "hello_test.txt"];

    let mappings: string[][] = [["*.txt", "*_test.txt"]];

    for (let file of files) {
      fs.closeSync(fs.openSync(`${workspacePath}${path.sep}${file}`, "w"));
    }

    // Update config
    let target = vscode.ConfigurationTarget.Workspace;
    await vscode.workspace
      .getConfiguration("switcheroo")
      .update("mappings", mappings, target);

    // Open file
    let doc = await vscode.workspace.openTextDocument(
      `${workspacePath}${path.sep}${files[0]}`
    );

    await vscode.window.showTextDocument(doc);

    // Swap to other file
    await vscode.commands.executeCommand("extension.switcheroo.swap");

    // Expect another file
    assert(vscode.window.activeTextEditor !== undefined);

    assert(
      vscode.window.activeTextEditor.document.fileName ===
        `${workspacePath}${path.sep}${files[1]}`
    );
  }).timeout(5000);

  test("Prompt to create file if counterpart not exists", async () => {
    let files: string[] = ["hello.txt"];

    let mappings: string[][] = [
      [
        "hello.txt",
        "hello_test_tmp.txt", // File to be created
      ],
    ];

    for (let file of files) {
      fs.closeSync(fs.openSync(`${workspacePath}${path.sep}${file}`, "w"));
    }

    // Update config
    let target = vscode.ConfigurationTarget.Workspace;
    await vscode.workspace
      .getConfiguration("switcheroo")
      .update("mappings", mappings, target);

    // Open file
    let doc = await vscode.workspace.openTextDocument(
      `${workspacePath}${path.sep}${files[0]}`
    );

    await vscode.window.showTextDocument(doc);

    // Expect vscode.window.showQuickPick and choose Yes
    let quickPickStub = stub(vscode.window, "showQuickPick");
    quickPickStub.resolves({ label: "Yes" });

    // Swap to other file
    await vscode.commands.executeCommand("extension.switcheroo.swap");

    assert(fs.existsSync(`${workspacePath}${path.sep}hello_test_tmp.txt`));

    fs.unlinkSync(`${workspacePath}${path.sep}hello_test_tmp.txt`);
  }).timeout(10000);
});
