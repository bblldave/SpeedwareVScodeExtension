'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const spwHoverProvider_1 = require("./hover/spwHoverProvider");
const spwDefinitionProvider_1 = require("./goToDefinition/spwDefinitionProvider");
const codeBlockParser_1 = require("./codeBlockHighlighter/codeBlockParser");
const codeBlockParseController_1 = require("./codeBlockHighlighter/codeBlockParseController");
function activate(context) {
    let docType = 'speedware';
    let activeEditor = vscode.window.activeTextEditor;
    let codeBlockParser = new codeBlockParser_1.CodeBlockParser();
    let codeBlockParseController = new codeBlockParseController_1.CodeBlockParseController(codeBlockParser);
    let jump = vscode.commands.registerCommand("extension.jump", () => {
        codeBlockParser.jump();
    });
    if (!activeEditor || !activeEditor.document) {
        return;
    }
    registerDocumentType(docType);
    function registerDocumentType(type) {
        context.subscriptions.push(vscode.languages.registerHoverProvider(type, new spwHoverProvider_1.SpwHoverProvider()));
        context.subscriptions.push(vscode.languages.registerDefinitionProvider(type, new spwDefinitionProvider_1.SpwDefinitionProvider()));
    }
    context.subscriptions.push(codeBlockParser);
    context.subscriptions.push(codeBlockParseController);
    context.subscriptions.push(jump);
}
exports.activate = activate;
//# sourceMappingURL=spwMain.js.map