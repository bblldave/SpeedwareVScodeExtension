"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlockParseController = void 0;
const vscode = require("vscode");
const path = require("path");
class CodeBlockParseController {
    constructor(parser) {
        this.parser = parser;
        let saveEv = vscode.workspace.onDidSaveTextDocument(saved => {
            setTimeout(() => {
                let fileName = path.basename(saved.fileName);
                if (fileName !== "settings.json") {
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
        if (editor !== undefined) {
            this.parser.clearDecorations(editor);
        }
    }
}
exports.CodeBlockParseController = CodeBlockParseController;
//# sourceMappingURL=codeBlockParseController.js.map