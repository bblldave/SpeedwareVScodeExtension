"use strict";
const moo = require("moo");
const fs = require("mz/fs");
let lexer = moo.compile({
    WS: /[ \t]+/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: "(",
    rparen: ")",
    lbrace: "{",
    rbrace: "}",
    function: /\$[A-Z]*/,
    variable: /[A-Z]V-[\w\-]*/,
    database: /[A-Z][A-Z]+-[A-Z]+[A-Z]?/,
    Verbs: /[a-zA-Z][a-zA-Z_0-9]*/,
    assign: "=",
    NL: { match: /\r\n|\n/, lineBreaks: true },
    comma: ",",
    semiColon: ";",
    star: "*",
});
async function main() {
    const code = (await fs.readFile("test.spw")).toString();
    lexer.reset(code);
    while (true) {
        const token = lexer.next();
        if (!token) {
            break;
        }
        console.log(token);
    }
}
main().catch((err) => console.log(err.stack));
//# sourceMappingURL=lexer.js.map