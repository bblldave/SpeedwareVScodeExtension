"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
class DoEndParser {
    constructor() {
        // Get configuration
        this.updateConfig();
        // Set control values
        this.past = false;
    }
    dispose() { }
    updateConfig() {
        const config = vscode_1.workspace.getConfiguration("doEndMatch");
        this.decoration = vscode_1.window.createTextEditorDecorationType(config.style);
        const keywords = config.keywords;
        const all = keywords.open.concat(keywords.close);
        this.keywords = Object.assign({ all }, keywords);
        this.wordSeparators = config.wordSeparators;
        this.ignoreDoWithColon = config.ignoreDoWithColon;
        // Clean past styles
        const editor = vscode_1.window.activeTextEditor;
        if (editor !== undefined) {
            this.clearDecorations(editor);
        }
    }
    clearDecorations(editor) {
        editor.setDecorations(this.decoration, []);
    }
    // Main function that decorates matches
    matchDoEnd() {
        // Get the current text editor
        const editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        // Clean past styles
        if (this.past) {
            this.clearDecorations(editor);
        }
        const doc = editor.document;
        const pos = editor.selection.active;
        // Get word surrounding cursor, if any
        const { word: wordA, range: wordARange } = this.findWordRange(doc, pos);
        // If word a keyword then find the complement and highlight them both.
        if (this.isKeyword(wordA, doc, wordARange)) {
            // Check whether to go forwards or backwards
            const parseDir = this.keywords.open.includes(wordA) ? 1 : -1;
            // Find complement of wordA
            const wordBRange = this.parseUntilComplement(1, parseDir, doc, parseDir === 1 ? wordARange.end : wordARange.start);
            if (wordBRange !== undefined) {
                this.past = true;
                editor.setDecorations(this.decoration, [wordARange, wordBRange]);
            }
        }
    }
    // Jumps to complementary or nearest keyword
    jump() {
        // Get the current text editor
        const editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const doc = editor.document;
        const pos = editor.selection.active;
        const { word, range } = this.findWordRange(doc, pos);
        // If on a keyword, go to closing keyword. Else, go to next keyword
        if (this.isKeyword(word, doc, range)) {
            if (word === "do" && this.ignoreDoWithColon) {
                const nextChar = doc
                    .lineAt(range.end.line)
                    .text.charAt(range.end.character);
                if (nextChar === ":") {
                    const { range: nextRange } = this.findNextKeyword(1, doc, pos.line, range.end.character);
                    if (!nextRange.isEmpty) {
                        editor.selection = new vscode_1.Selection(nextRange.start, nextRange.end);
                    }
                }
            }
            const parseDir = this.keywords.open.includes(word) ? 1 : -1;
            const complement = this.parseUntilComplement(1, parseDir, doc, parseDir === 1 ? range.end : range.start);
            if (complement !== undefined) {
                editor.selection = new vscode_1.Selection(complement.start, complement.end);
            }
        }
        else {
            const { range: nextRange } = this.findNextKeyword(1, doc, pos.line, range.end.character);
            if (!nextRange.isEmpty) {
                editor.selection = new vscode_1.Selection(nextRange.start, nextRange.end);
            }
        }
    }
    findWordRange(doc, pos) {
        const { line, character } = pos;
        const lineText = doc.lineAt(line).text;
        let start = character;
        while (start > 0) {
            const char = lineText.slice(start - 1, start);
            if (this.wordSeparators.includes(char)) {
                break;
            }
            else {
                start--;
            }
        }
        let end = character;
        while (end < lineText.length) {
            const char = lineText.slice(end, end + 1);
            if (this.wordSeparators.includes(char)) {
                break;
            }
            else {
                end++;
            }
        }
        const word = lineText.slice(start, end);
        const range = new vscode_1.Range(new vscode_1.Position(line, start), new vscode_1.Position(line, end));
        return { word, range };
    }
    isKeyword(word, doc, range) {
        return (this.keywords.all.includes(word) && !this.shouldIgnore(word, doc, range));
    }
    shouldIgnore(word, doc, range) {
        if (word === "do" && this.ignoreDoWithColon) {
            const nextChar = doc
                .lineAt(range.end.line)
                .text.charAt(range.end.character);
            return nextChar === ":";
        }
        return false;
    }
    findNextKeyword(parseDir, doc, line, character) {
        const forward = parseDir === 1;
        const lineText = doc.lineAt(line).text;
        if (character === undefined) {
            character = forward ? 0 : lineText.length;
        }
        else if (!forward) {
            character -= 1;
        }
        while (forward ? character < lineText.length : character >= 0) {
            if (this.wordSeparators.includes(lineText[character])) {
                character += parseDir;
                continue;
            }
            const { word, range } = this.findWordRange(doc, new vscode_1.Position(line, character));
            if (this.isKeyword(word, doc, range)) {
                return { word, range };
            }
            else {
                character = forward ? range.end.character : range.start.character - 1;
            }
        }
        // Go to next line
        if (line + parseDir >= 0 && doc.lineCount > line + parseDir) {
            return this.findNextKeyword(parseDir, doc, line + parseDir);
        }
        const pos = new vscode_1.Position(line, character);
        return { word: "", range: new vscode_1.Range(pos, pos) };
    }
    parseUntilComplement(open, parseDir, doc, pos) {
        // Find next keyword
        const { word, range } = this.findNextKeyword(parseDir, doc, pos.line, pos.character);
        if (range.isEmpty) {
            // No word was found
            return undefined;
        }
        // Check if word opens or closes
        if (this.isKeyword(word, doc, range)) {
            if (this.keywords.open.includes(word)) {
                open += parseDir;
            }
            else if (this.keywords.close.includes(word)) {
                open -= parseDir;
            }
        }
        // Closing found
        if (open === 0) {
            return range;
        }
        // Check next keyword
        return this.parseUntilComplement(open, parseDir, doc, parseDir === 1 ? range.end : range.start);
    }
}
exports.default = DoEndParser;
//# sourceMappingURL=DoEndParser.js.map