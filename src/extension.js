"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const DoEndParser_1 = require("./DoEndParser");
const DoEndParserController_1 = require("./DoEndParserController");
const functionsArray = require("./hover/functions.json");
const variablesArray = require("./hover/variables.json");
const vscodeConfig = vscode_1.workspace.getConfiguration('speedware');
// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.

function createHover(snippet, type) {
    const example =
        typeof snippet.example == 'undefined' ? '' : snippet.example;
    const description =
        typeof snippet.description == 'undefined' ? '' : snippet.description;
    return new vscode_1.Hover({
        language: type,
        value: description + '\n\n' + example
    });
}

function activate(context) {
    const parser = new DoEndParser_1.default();
    const controller = new DoEndParserController_1.default(parser);
    const jump = vscode_1.commands.registerCommand("extension.jump", () => {
        parser.jump();
    });

    const active = vscode_1.window.activeTextEditor;
    if (!active || !active.document) return;

    registerDocType('speedware');

    function registerDocType(type) {
        if (vscodeConfig.hover === true){
            context.subscriptions.push( vscode_1.languages.registerHoverProvider(type,{
                provideHover(document, position, token) {
                    const range = document.getWordRangeAtPosition(position);
                    const word = document.getText(range);

                    for(const snippet in functionsArray) {
                        if(
                            functionsArray[snippet].prefix == word ||
                            functionsArray[snippet].hover == word
                        ){
                            return createHover(functionsArray[snippet],type);
                        }
                    }
                    for(const snippet in variablesArray) {
                        if(
                            variablesArray[snippet].prefix == word ||
                            variablesArray[snippet].hover == word
                        ){
                            return createHover(variablesArray[snippet],type);
                        }
                    }

                }
            }))
        }
    }

    context.subscriptions.push(parser);
    context.subscriptions.push(controller);
    context.subscriptions.push(jump);

    
    
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map