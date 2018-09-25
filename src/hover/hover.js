const functionsArr = require('./functions.json');



function createHover(snippet, type) {
    const example =
        typeof snippet.example == 'undefined' ? '' : snippet.example;
    const description =
        typeof snippet.description == 'undefined' ? '' : snippet.description;
    return new vscode.Hover({
        language: type,
        value: description + '\n\n' + example
    });
}