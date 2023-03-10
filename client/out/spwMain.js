'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deativate = exports.activate = void 0;
const path = require("path");
const spwHoverProvider_1 = require("./hover/spwHoverProvider");
const spwDefinitionProvider_1 = require("./goToDefinition/spwDefinitionProvider");
const codeBlockParser_1 = require("./codeBlockHighlighter/codeBlockParser");
const codeBlockParseController_1 = require("./codeBlockHighlighter/codeBlockParseController");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
function activate(context) {
    let docType = 'speedware';
    let activeEditor = vscode_1.window.activeTextEditor;
    let codeBlockParser = new codeBlockParser_1.CodeBlockParser();
    let codeBlockParseController = new codeBlockParseController_1.CodeBlockParseController(codeBlockParser);
    let jump = vscode_1.commands.registerCommand("extension.jump", () => {
        codeBlockParser.jump();
    });
    if (!activeEditor || !activeEditor.document) {
        return;
    }
    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    const serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: { module: serverModule, transport: node_1.TransportKind.ipc }
    };
    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'speedware' }],
        synchronize: {
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    client = new node_1.LanguageClient('languageServer', 'Language Server', serverOptions, clientOptions);
    context.subscriptions.push(vscode_1.languages.registerHoverProvider(docType, new spwHoverProvider_1.SpwHoverProvider()));
    context.subscriptions.push(vscode_1.languages.registerDefinitionProvider(docType, new spwDefinitionProvider_1.SpwDefinitionProvider()));
    context.subscriptions.push(codeBlockParser);
    context.subscriptions.push(codeBlockParseController);
    context.subscriptions.push(jump);
    console.log("starting");
    client.start();
}
exports.activate = activate;
function deativate() {
    console.log("deactivate");
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deativate = deativate;
//# sourceMappingURL=spwMain.js.map