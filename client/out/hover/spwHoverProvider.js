'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpwHoverProvider = void 0;
const vscode = require("vscode");
const spwHoverContent_1 = require("./spwHoverContent");
class SpwHoverProvider {
    constructor() {
        this.spwConfig = vscode.workspace.getConfiguration('speedware');
        this.hoverContent = new spwHoverContent_1.SpwHoverContent;
        this.functionsArray = this.hoverContent.functions;
        this.variablesArray = this.hoverContent.variables;
    }
    provideHover(document, position, token) {
        if (this.spwConfig.hover === true) {
            let range = document.getWordRangeAtPosition(position);
            let word = document.getText(range);
            for (let snippet in this.functionsArray) {
                if (this.functionsArray[snippet].prefix == word ||
                    this.functionsArray[snippet].hover == word) {
                    return this.createHover(this.functionsArray[snippet], 'speedware');
                }
            }
            ;
            for (const snippet in this.variablesArray) {
                if (this.variablesArray[snippet].prefix == word ||
                    this.variablesArray[snippet].hover == word) {
                    return this.createHover(this.variablesArray[snippet], 'speedware');
                }
            }
            ;
        }
    }
    ;
    createHover(snippet, type) {
        const example = typeof snippet.example == 'undefined' ? '' : snippet.example;
        const description = typeof snippet.description == 'undefined' ? '' : snippet.description;
        return new vscode.Hover({
            language: type,
            value: description + '\n\n' + example
        });
    }
    ;
}
exports.SpwHoverProvider = SpwHoverProvider;
//# sourceMappingURL=spwHoverProvider.js.map