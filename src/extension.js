"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const DoEndParser_1 = require("./DoEndParser");
const DoEndParserController_1 = require("./DoEndParserController");
// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
function activate(context) {
    const parser = new DoEndParser_1.default();
    const controller = new DoEndParserController_1.default(parser);
    const jump = vscode_1.commands.registerCommand("extension.jump", () => {
        parser.jump();
    });
    context.subscriptions.push(parser);
    context.subscriptions.push(controller);
    context.subscriptions.push(jump);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map