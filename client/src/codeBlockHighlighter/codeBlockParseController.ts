"use strict";
import vscode = require('vscode');
import path = require("path");
import { CodeBlockParser } from './codeBlockParser';

export class CodeBlockParseController {
    parser : CodeBlockParser;
    disposable : any;

    constructor(parser : CodeBlockParser) {
        this.parser = parser;
        let saveEv = vscode.workspace.onDidSaveTextDocument( saved => {
            setTimeout(() => {
                let fileName = path.basename(saved.fileName);
                if(fileName !== "settings.json") {
                    return;
                }
                this.parser.updateConfig();
            }, 2000);
        });
        let subscriptions = [];
        subscriptions.push(saveEv);
        vscode.window.onDidChangeTextEditorSelection(this.onChangeSelection, this, subscriptions);
        vscode.window.onDidChangeActiveTextEditor(this.onChangeEditor, this, subscriptions);
        this.disposable = vscode.Disposable.from(...subscriptions);
    }

    dispose() {
        this.disposable.dispose();
    }

    onChangeSelection() {
        this.parser.matchOpenCloseKeywords();
    }

    onChangeEditor() {
        let editor = vscode.window.activeTextEditor;
        if(editor !== undefined) {
            this.parser.clearDecorations(editor);
        }
    }
}