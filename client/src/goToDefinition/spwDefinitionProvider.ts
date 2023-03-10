'use strict';

import vscode = require('vscode');
import { DefinitionProvider, TextDocument,  Position, CancellationToken} from 'vscode';



export class SpwDefinitionProvider implements DefinitionProvider {
    private child_process = require('child_process');

    provideDefinition(document: TextDocument, position: Position, token: CancellationToken): any{
        let range = document.getWordRangeAtPosition(position,RegExp("(LV-[\\w\\-]*)|\\b(GV-[\\w\\-]*)\\b|(PV-[\\w\\-]*)|\\b(INCLUDE-[\\w\\-]*|UTILITY-[\\w\\-]*|LOGIC-[\\w\\-]*|REPORT-[\\w\\-]*)\\b|[A-Z][A-Z]+-[A-Z]+-?[A-Z0-9]+-?[A-Z0-9]+-?[A-Z0-9]+|[A-Z][A-Z]+-[A-Z]+[A-Z]?|(PAS|HARP|VMPAS)\\.[A-Z]+|[\\w]+"));
        let word = document.getText(range).trim();
        return this.processSearch(word);
    }

    gitGrepSearch(word: string) {
        let searchTerm = word;
        let directory = vscode.workspace.rootPath;
        let args = [];
        args.push('grep');
        args.push('-n');
        args.push('--column');
        args.push(searchTerm);
        const gitGrep = this.child_process.spawnSync('git',args,{
            cwd: directory
        });
        
        let results = gitGrep.stdout.toString().split('\n');
        return results;
    }

    searchForMatch(grepResultList: any[], searchTerm: string){
        let results = grepResultList;
        let matchList: any[] = [];
        let directory = vscode.workspace.rootPath;
        results.forEach((item: any) => {
            let arr = item.split(":");
            if (arr.length > 2) {
                // In case of drive letter
                if (arr[0].length == 1) {
                    let path = arr.shift() + ':' + arr.shift();
                    arr.unshift(path);
                }
                // Position starts from zero refer to vscode.d.ts
                let line = parseInt(arr[1]);
                let line_no = line -1;
                let col = parseInt(arr[2]);
                let col_no = col - 1;
                let fileWording = arr[3].trim();
                if(!fileWording.includes("SUBSECTION") && (fileWording.indexOf(searchTerm + searchTerm.length) != " " || fileWording.indexOf(searchTerm + searchTerm.length) != "("))
                {
                    if(fileWording === searchTerm  && line_no === 0)
                    {
                        fileWording = fileWording;
                    }
                    else
                    {
                        fileWording = fileWording + " ";
                    }
                    
                }
                // use regex,the seach result is not the original word
                if(fileWording.includes("DCL " + searchTerm + " ")|| fileWording.includes("DCL " + searchTerm + "(") || fileWording.includes("DCL " +searchTerm + "\\n"))
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                else if(fileWording === ("SUBSECTION " + searchTerm ) || fileWording.includes("SUBSECTION " + searchTerm + " "))
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                else if(fileWording.includes("NEWELEMENT " + searchTerm + " ") || fileWording.includes("NEWELEMENT " + searchTerm + "("))
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                else if(fileWording.includes("NEWITEM " + searchTerm + " ") || fileWording.includes("NEWITEM " + searchTerm + "("))
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                else if(fileWording === searchTerm  && line_no === 0)
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                else if(fileWording.includes("PARM " + searchTerm + " ") || fileWording.includes("PARM " + searchTerm + "("))
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                else if(fileWording.includes("NEWFILE " + searchTerm + " "))
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                else if(fileWording.includes("NEWINDEX " + searchTerm + " "))
                {
                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(directory + '/' + arr[0]), new vscode.Range(start_pos, end_pos));
                    matchList.push(loc);
                }
                
            }
        });

        return matchList;
    }

    processSearch(word:string){
        return new Promise((resolve,reject) => {
           let list: any[] = [];
           let results = this.gitGrepSearch(word);
           
            list = this.searchForMatch(results,word);

            if (list.length === 0) {
                if(word.includes("LOGIC-"))
                {
                    let newSearchWord = word.replace('LOGIC-', 'UTILITY-')
                    let newResults = this.gitGrepSearch(newSearchWord);
                    let newList = this.searchForMatch(newResults,newSearchWord);
                    newList.forEach(element => {
                        list.push(element);
                    });
                }
            }
            return resolve(list);
        });
    }
}
