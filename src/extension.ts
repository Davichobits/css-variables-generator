// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.transformToCSSVars', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    const transformedText = transformToCSSVariables(text);

    editor.edit(editBuilder => {
      editBuilder.replace(selection, transformedText);
    });
  });

  context.subscriptions.push(disposable);
}

function transformToCSSVariables(text: string): string {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const vars = lines.map(line => {
    const match = line.match(/- (.+): (.+)/);
    if (match) {
      const name = match[1].replace(/\s+/g, '-'); // Reemplaza espacios por guiones
      const value = match[2];
      return `  --${name}: ${value};`;
    }
    return '';
  });

  return `:root {\n${vars.join('\n')}\n}`;
}

export function deactivate() {}
