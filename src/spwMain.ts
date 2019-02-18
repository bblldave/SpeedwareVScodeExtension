'use strict';

import vscode = require('vscode');
import { SpwHoverProvider } from './hover/spwHoverProvider';
import { SpwDefinitionProvider } from './goToDefinition/spwDefinitionProvider';
import { CodeBlockParser } from './codeBlockHighlighter/codeBlockParser';
import { CodeBlockParseController } from './codeBlockHighlighter/codeBlockParseController';


export function activate(context: vscode.ExtensionContext): void{

    let docType : vscode.DocumentSelector = 'speedware';
    let activeEditor = vscode.window.activeTextEditor;
    let codeBlockParser = new CodeBlockParser();
    let codeBlockParseController = new CodeBlockParseController(codeBlockParser);
    let jump = vscode.commands.registerCommand("extension.jump", () => {
        codeBlockParser.jump();
    });

    if(!activeEditor || !activeEditor.document) {
        return;
    }

    registerDocumentType(docType);

    function registerDocumentType(type : vscode.DocumentSelector) {
        context.subscriptions.push(vscode.languages.registerHoverProvider(type, new SpwHoverProvider()));
        context.subscriptions.push(vscode.languages.registerDefinitionProvider(type, new SpwDefinitionProvider()));
    }

    context.subscriptions.push(codeBlockParser);
    context.subscriptions.push(codeBlockParseController);
    context.subscriptions.push(jump);
}