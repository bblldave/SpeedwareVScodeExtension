"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const path = require("path"); // VS Code extensibility API
const vscode_1 = require("vscode");
class DoEndParserController {
    constructor(parser) {
        this.parser = parser;
        const saveEv = vscode_1.workspace.onDidSaveTextDocument(saved => {
            setTimeout(() => {
                const fileName = path.basename(saved.fileName);
                if (fileName !== "settings.json") {
                    return;
                }
                this.parser.updateConfig();
            }, 2000);
        });
        // Subscribe to selection change and editor activation events
        const subscriptions = [];
        subscriptions.push(saveEv);
        vscode_1.window.onDidChangeTextEditorSelection(this.onChangeSelection, this, subscriptions);
        vscode_1.window.onDidChangeActiveTextEditor(this.onChangeEditor, this, subscriptions);
        // Create a combined disposable
        this.disposable = vscode_1.Disposable.from(...subscriptions);
    }
    dispose() {
        this.disposable.dispose();
    }
    onChangeSelection() {
        this.parser.matchDoEnd();
    }
    onChangeEditor() {
        const editor = vscode_1.window.activeTextEditor;
        if (editor !== undefined) {
            this.parser.clearDecorations(editor);
        }
    }
}
exports.default = DoEndParserController;
//# sourceMappingURL=DoEndParserController.js.map