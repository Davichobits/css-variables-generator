import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Comando para transformar a variables CSS
  let disposableCSS = vscode.commands.registerCommand('extension.transformToCSSVars', () => {
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

  // Comando para transformar a variables Tailwind
  let disposableTailwind = vscode.commands.registerCommand('extension.generateTailwindVars', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    const transformedText = transformToTailwindVariables(text);

    editor.edit(editBuilder => {
      editBuilder.replace(selection, transformedText);
    });
  });

  context.subscriptions.push(disposableCSS, disposableTailwind);
}

function transformToCSSVariables(text: string): string {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const vars = lines.map(line => {
    const match = line.match(/- (.+): (.+)/);
    if (match) {
      let name = match[1];
      const value = match[2];

      // Eliminar paréntesis y reemplazar espacios por guiones
      name = name.replace(/\s*\(\s*(.*?)\s*\)\s*/g, '-$1').replace(/\s+/g, '-');

      return `  --${name}: ${value};`;
    }
    return '';
  });

  return `:root {\n${vars.join('\n')}\n}`;
}

function transformToTailwindVariables(text: string): string {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  const vars = lines.map(line => {
    const match = line.match(/- (.+): (.+)/);
    if (match) {
      let name = match[1];
      const value = match[2];

      // Eliminar paréntesis y reemplazar espacios por guiones
      name = name.replace(/\s*\(\s*(.*?)\s*\)\s*/g, '-$1').replace(/\s+/g, '-');
      // Convertir a formato Tailwind
      name = `color-${name.replace(/-/g, '-')}`;

      return `  --${name}: ${value};`;
    }
    return '';
  });

  return `@theme {\n${vars.join('\n')}\n}`;
}