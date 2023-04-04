// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const lexer = require("../out/lexer.js");
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["object", (lexer.has("colon") ? {type: "colon"} : colon), (lexer.has("NL") ? {type: "NL"} : NL), "statements", {"literal":"EXIT"}, (lexer.has("semiColon") ? {type: "semiColon"} : semiColon), (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "statements", "symbols": ["statement"]},
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL), "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["statement", "statements$ebnf$1"]},
    {"name": "statement$ebnf$1", "symbols": ["option_list"], "postprocess": id},
    {"name": "statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$2", "symbols": ["parameter_list"], "postprocess": id},
    {"name": "statement$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$3", "symbols": [(lexer.has("lineComment") ? {type: "lineComment"} : lineComment)], "postprocess": id},
    {"name": "statement$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": ["_", (lexer.has("verb") ? {type: "verb"} : verb), "_", "object", "_", "statement$ebnf$1", "_", "statement$ebnf$2", (lexer.has("semiColon") ? {type: "semiColon"} : semiColon), "_", "statement$ebnf$3"], "postprocess": 
        (data) => {
          return {
            type: "statement",
            value: data
          }
        }
            },
    {"name": "statement", "symbols": ["var_assignment"]},
    {"name": "statement$ebnf$4", "symbols": ["parameter"], "postprocess": id},
    {"name": "statement$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$5", "symbols": [(lexer.has("keyword") ? {type: "keyword"} : keyword)], "postprocess": id},
    {"name": "statement$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$6", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb)], "postprocess": id},
    {"name": "statement$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$7", "symbols": ["object"], "postprocess": id},
    {"name": "statement$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$8", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb)], "postprocess": id},
    {"name": "statement$ebnf$8", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement$ebnf$9", "symbols": ["option"], "postprocess": id},
    {"name": "statement$ebnf$9", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), "_", "statement$ebnf$4", "_", "statement$ebnf$5", "_", "statement$ebnf$6", "_", "statement$ebnf$7", "_", "statement$ebnf$8", "_", "statement$ebnf$9", (lexer.has("semiColon") ? {type: "semiColon"} : semiColon)]},
    {"name": "statement", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), "_", "option", (lexer.has("semiColon") ? {type: "semiColon"} : semiColon)]},
    {"name": "statement", "symbols": ["_", (lexer.has("lineComment") ? {type: "lineComment"} : lineComment)]},
    {"name": "statement", "symbols": ["_", (lexer.has("blockComment") ? {type: "blockComment"} : blockComment)]},
    {"name": "object", "symbols": [(lexer.has("object") ? {type: "object"} : object)]},
    {"name": "object$subexpression$1", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "object$subexpression$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "object$subexpression$1", "symbols": [(lexer.has("object") ? {type: "object"} : object)]},
    {"name": "object", "symbols": [(lexer.has("object") ? {type: "object"} : object), (lexer.has("lparen") ? {type: "lparen"} : lparen), "object$subexpression$1", (lexer.has("rparen") ? {type: "rparen"} : rparen)]},
    {"name": "option$subexpression$1$ebnf$1", "symbols": ["parameter_list"], "postprocess": id},
    {"name": "option$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "option$subexpression$1", "symbols": ["option$subexpression$1$ebnf$1"]},
    {"name": "option$subexpression$1", "symbols": ["object"]},
    {"name": "option$subexpression$1", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "option$subexpression$1", "symbols": [(lexer.has("parameter") ? {type: "parameter"} : parameter)]},
    {"name": "option", "symbols": [(lexer.has("option") ? {type: "option"} : option), (lexer.has("lparen") ? {type: "lparen"} : lparen), "option$subexpression$1", (lexer.has("rparen") ? {type: "rparen"} : rparen)]},
    {"name": "option_list$ebnf$1", "symbols": []},
    {"name": "option_list$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "option"]},
    {"name": "option_list$ebnf$1$subexpression$1", "symbols": ["parameter_list"]},
    {"name": "option_list$ebnf$1$subexpression$1", "symbols": ["option"]},
    {"name": "option_list$ebnf$1", "symbols": ["option_list$ebnf$1", "option_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "option_list", "symbols": ["option", "_", "option_list$ebnf$1"]},
    {"name": "parameter$subexpression$1", "symbols": [(lexer.has("string") ? {type: "string"} : string)]},
    {"name": "parameter$subexpression$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "parameter$subexpression$1", "symbols": [(lexer.has("object") ? {type: "object"} : object)]},
    {"name": "parameter$subexpression$1", "symbols": [(lexer.has("subtype") ? {type: "subtype"} : subtype)]},
    {"name": "parameter$subexpression$1", "symbols": [(lexer.has("storageType") ? {type: "storageType"} : storageType)]},
    {"name": "parameter$subexpression$1", "symbols": [(lexer.has("parameter") ? {type: "parameter"} : parameter)]},
    {"name": "parameter", "symbols": [(lexer.has("parameter") ? {type: "parameter"} : parameter), (lexer.has("assign") ? {type: "assign"} : assign), "parameter$subexpression$1"]},
    {"name": "parameter", "symbols": [(lexer.has("parameter") ? {type: "parameter"} : parameter)]},
    {"name": "parameter_list$ebnf$1", "symbols": []},
    {"name": "parameter_list$ebnf$1$subexpression$1", "symbols": [(lexer.has("comma") ? {type: "comma"} : comma), "_", "parameter"]},
    {"name": "parameter_list$ebnf$1", "symbols": ["parameter_list$ebnf$1", "parameter_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameter_list", "symbols": ["parameter", "parameter_list$ebnf$1"]},
    {"name": "var_assignment", "symbols": [(lexer.has("object") ? {type: "object"} : object), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expression", "_", (lexer.has("semiColon") ? {type: "semiColon"} : semiColon)], "postprocess": 
        (data) => {
          return {
            type: "var_assignment",
            var_name: data[0],
            value: data[4]
          }
        }
            },
    {"name": "expression", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("object") ? {type: "object"} : object)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("variable") ? {type: "variable"} : variable)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("func") ? {type: "func"} : func)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
