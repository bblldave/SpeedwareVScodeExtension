'use strict';
import vscode = require('vscode');

export class CodeBlockParser {
    decoration: any;
    past: boolean;
    keywords: any;
    wordSeperators: any;
    blockCmtStartLine = 0;
    blockCmtEndLine = 0;

    constructor() {
        this.updateConfig();
        this.past = false;
    }

    dispose(){};

    updateConfig() {
        let config = vscode.workspace.getConfiguration("speedware");
        this.decoration = vscode.window.createTextEditorDecorationType(config.style);
        let keywords = config.codeBlockKeywords;
        let all = keywords.open.concat(keywords.close);
        this.keywords = Object.assign({ all }, keywords);
        this.wordSeperators = config.wordSeparators;
        let editor = vscode.window.activeTextEditor;
        
        if(editor !== undefined) {
            this.clearDecorations(editor);
        }

    }

    clearDecorations(editor: any) {
        editor.setDecorations(this.decoration, []);
    }

    matchOpenCloseKeywords() {
        let editor = vscode.window.activeTextEditor;
        if(!editor) {
            return;
        }
        let doc = editor.document;
        let pos = editor.selection.active;
        // Get the currently selected word
        let { word: wordA, range: wordARange } = this.findWordRange(doc, pos);
        // If word is a keyword then find complement and highlight them both
        if (this.isKeyword(wordA, doc, wordARange)) {
            let parseDir = this.keywords.open.includes(wordA) ? 1 : -1;
            let wordBRange = this.parseUntilComplement(1, parseDir, doc, parseDir === 1 ? wordARange.end : wordARange.start);
            if(wordBRange !== undefined) {
                this.past = true;
                editor.setDecorations(this.decoration, [wordARange, wordBRange]);
            }
        }

    }

    // Jumps cursor to complementary or nearest keyword
    jump() {
        let editor = vscode.window.activeTextEditor;
        if(!editor) {
            return;
        }
        let doc = editor.document;
        let pos = editor.selection.active;
        let { word, range } = this.findWordRange(doc, pos);
        //If on a keyword, got to complementing keyword. Else go to next keyword
        if(this.isKeyword(word, doc, range)) {
            let parseDir = this.keywords.open.includes(word) ? 1 : -1;
            let complement = this.parseUntilComplement(1, parseDir, doc, parseDir === 1 ? range.end : range.start);
            if (complement !== undefined) {
                editor.selection = new vscode.Selection(complement.start, complement.end);

            }else {
                let { range: nextRange } = this.findNextKeyword(1, doc, pos.line, range.end.character);
                if(!nextRange.isEmpty) {
                    editor.selection = new vscode.Selection(nextRange.start, nextRange.end);
                }
            }
        }
    }

    findWordRange(doc : any, pos : any) {
        let { line, character } = pos;
        let lineText = doc.lineAt(line).text;
        let start = character;
        while (start > 0) {
            let char = lineText.slice(start -1, start);
            if (this.wordSeperators.includes(char)) {
                break;
            }else {
                start--;
            }

        }
        let end = character;
        while(end < lineText.length) {
            let char = lineText.slice(end, end + 1);
            if (this.wordSeperators.includes(char)) {
                break;
            }else {
                end++;
            }
        }
        let word = lineText.slice(start, end);
        let range = new vscode.Range(new vscode.Position(line, start), new vscode.Position(line, end));
        return { word, range} ;
    }

    isKeyword(word : any, doc : any, range : any) {
        return (this.keywords.all.includes(word));
    }

    findNextKeyword(parseDir : any, doc : any, line : any, character? : any) : any{
        let forward = parseDir === 1;
        let lineText = doc.lineAt(line).text;
        if(character === undefined) {
            character = forward ? 0 : lineText.length;
        }else if (!forward) {
            character -=1;
        }
        while (forward ? character < lineText.length : character >= 0) {
            if(this.wordSeperators.includes(lineText[character])) {
                character += parseDir;
                continue;
            }
            let { word, range } = this.findWordRange(doc, new vscode.Position(line, character));
            let commentStart = lineText.indexOf("(*",0);
            let commentEnd = lineText.indexOf("*)");
            
            let linechecker;
            if (lineText.includes('#NOTE')) {
                this.blockCmtStartLine = range.start.line +1;
                linechecker = doc.lineAt(this.blockCmtStartLine).text;
                for (let lineNumber = this.blockCmtStartLine; lineNumber < doc.lineCount; lineNumber++) {
                    let text = doc.lineAt(lineNumber).text;
                    if (text.includes('#ENDNOTE')) {
                        this.blockCmtEndLine = lineNumber +1;
                        break;
                    }
                }
            }
            if (this.isKeyword(word,doc,range) && range.start.line > this.blockCmtStartLine &&
                                                  range.end.line < this.blockCmtEndLine)
            {
                character += parseDir;
                continue;
            }

            if (this.isKeyword(word, doc, range ) && 
                lineText.indexOf(word,0) > commentStart && 
                lineText.indexOf(word,0) < commentEnd) 
            {
                character += parseDir;
                continue;
            }
            if(this.isKeyword(word, doc, range)) {
                return { word, range };
            }else {
                character = forward ? range.end.character : range.start.character -1;
            }
        }
        // Go to next line
        if(line + parseDir >= 0 && doc.lineCount > line + parseDir) {
            return this.findNextKeyword(parseDir, doc, line + parseDir);
        }
        let pos = new vscode.Position(line, character);
        return { word: "", range: new vscode.Range(pos, pos)};
    }

    parseUntilComplement(open : any, parseDir : any, doc : any, pos : any) : any {
        let { word, range } = this.findNextKeyword(parseDir, doc, pos.line, pos.character);
        if(range.isEmpty) {
            return undefined;
        }
        if (this.isKeyword(word,doc,range)) {
            if(this.keywords.open.includes(word)) {
                open += parseDir;
            }else if(this.keywords.close.includes(word)) {
                open -= parseDir;
            }
        }
        if(open === 0) {
            return range;
        }
        return this.parseUntilComplement(open, parseDir, doc, parseDir === 1 ? range.end : range.start);
    }
}