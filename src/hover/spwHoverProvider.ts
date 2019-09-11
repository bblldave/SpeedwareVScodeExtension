'use strict';

import vscode = require('vscode');
import { HoverProvider, Hover, TextDocument, Position, CancellationToken, WorkspaceConfiguration} from 'vscode';
import { SpwHoverContent } from './spwHoverContent';



export class SpwHoverProvider implements HoverProvider {

    private spwConfig = vscode.workspace.getConfiguration('speedware');
    private hoverContent = new SpwHoverContent;
    private functionsArray = this.hoverContent.functions;
    private variablesArray = this.hoverContent.variables;

    constructor() {
	
	}

    provideHover(document: TextDocument, position: Position, token: CancellationToken) {
        if (this.spwConfig.hover === true) {
            let range = document.getWordRangeAtPosition(position);
            let word = document.getText(range);

            for(let snippet in this.functionsArray){
                if(this.functionsArray[snippet].prefix == word ||
                   this.functionsArray[snippet].hover == word){
                       return this.createHover(this.functionsArray[snippet],'speedware');
                   }
            };
            for(const snippet in this.variablesArray) {
                if(
                    this.variablesArray[snippet].prefix == word ||
                    this.variablesArray[snippet].hover == word
                ){
                    return this.createHover(this.variablesArray[snippet],'speedware');
                }
            };

        }
    };

    createHover(snippet:any, type:any) {
        const example =
            typeof snippet.example == 'undefined' ? '' : snippet.example;
        const description =
            typeof snippet.description == 'undefined' ? '' : snippet.description;
        return new vscode.Hover({
            language: type,
            value: description + '\n\n' + example
        });
    };

}


