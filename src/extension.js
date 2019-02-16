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
const child_process = require('child_process');
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
        if (vscodeConfig.goToDefintion === true){
            context.subscriptions.push( vscode_1.languages.registerDefinitionProvider(type,{
                provideDefinition(document, position, token){
                    const range = document.getWordRangeAtPosition(position,RegExp("(LV-[\\w\\-]*)|\\b(GV-[\\w\\-]*)\\b|(PV-[\\w\\-]*)|\\b(INCLUDE-[\\w\\-]*|UTILITY-[\\w\\-]*|LOGIC-[\\w\\-]*|REPORT-[\\w\\-]*)\\b|[A-Z][A-Z]+-[A-Z]+-?[A-Z0-9]+-?[A-Z0-9]+-?[A-Z0-9]+|[A-Z][A-Z]+-[A-Z]+[A-Z]?|(PAS|HARP|VMPAS)\\.[A-Z]+|[\\w]+"));
                    const word = document.getText(range).trim();
                    return processSearch(word);
                }
            }))
        }
    }

    context.subscriptions.push(parser);
    context.subscriptions.push(controller);
    context.subscriptions.push(jump);
}

function processSearch(word){
    return new Promise((resolve,reject) => {
        const searchTerm = word;
        const directory = vscode_1.workspace.rootPath;
        const args = [];
        args.push('grep');
        args.push('-n');
        args.push('--column');
        args.push(searchTerm);
        //args.push(directory);
        const gitGrep = child_process.spawnSync('git',args,{
            cwd: directory
        });
        
        //const results = gitGrep.output;
        //console.log(results);
        const results = gitGrep.stdout.toString().split('\n');
        const list = [];
        results.forEach((item) => {
            let arr = item.split(":");
            if (arr.length > 2) {
                // In case of drive letter
                if (arr[0].length == 1) {
                    let path = arr.shift() + ':' + arr.shift();
                    arr.unshift(path);
                }
                // Position starts from zero refer to vscode.d.ts
                let line_no = parseInt(arr[1] -1);
                let col_no = parseInt(arr[2] -1);
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
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                else if(fileWording === ("SUBSECTION " + searchTerm ) || fileWording.includes("SUBSECTION " + searchTerm + " "))
                {
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                else if(fileWording.includes("NEWELEMENT " + searchTerm + " ") || fileWording.includes("NEWELEMENT " + searchTerm + "("))
                {
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                else if(fileWording.includes("NEWITEM " + searchTerm + " ") || fileWording.includes("NEWITEM " + searchTerm + "("))
                {
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                else if(fileWording === searchTerm  && line_no === 0)
                {
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                else if(fileWording.includes("PARM " + searchTerm + " ") || fileWording.includes("PARM " + searchTerm + "("))
                {
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                else if(fileWording.includes("NEWFILE " + searchTerm + " "))
                {
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                else if(fileWording.includes("NEWINDEX " + searchTerm + " "))
                {
                    let start_pos = new vscode_1.Position(line_no, col_no);
                    let end_pos = new vscode_1.Position(line_no, col_no + searchTerm.length);
                    let loc = new vscode_1.Location(vscode_1.Uri.file(directory + '/' + arr[0]), new vscode_1.Range(start_pos, end_pos));
                    list.push(loc);
                }
                
            }
        });
        return resolve(list);
    });

}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map