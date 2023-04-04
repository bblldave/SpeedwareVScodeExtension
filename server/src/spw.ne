@{%
  const lexer = require("../out/lexer.js");
%}

@lexer lexer

program
  -> object %colon %NL statements "EXIT" %semiColon %NL

statements
  -> statement_semi (%NL statement_semi):*

statement_semi
  -> statement %semiColon

statement
  -> _ %verb _ object _ option_list:? _ parameter_list:? _ %lineComment:?
    {%
      (data) => {
        return {
          type: "statement",
          value: data
        }
      }
    %}
  | var_assignment
  | %verb _ parameter:? _ %keyword:? _ %verb:? _ object:? _ %verb:? _ option:?
  | %verb _ option
  | _ %lineComment
  | _ %blockComment

object -> %object | %object %lparen (%string | %number | %object) %rparen

option -> %option %lparen (parameter_list:? | object | %string | %parameter) %rparen

option_list -> option _ (%comma _ option | parameter_list | option):*

parameter -> %parameter %assign (%string | %number | %object | %subtype | %storageType | %parameter) | %parameter

parameter_list -> parameter (%comma _ parameter):*

var_assignment
  -> %object _ %assign _ expression
    {%
      (data) => {
        return {
          type: "var_assignment",
          var_name: data[0],
          value: data[4]
        }
      }
    %}

expression
  -> %string  {% id %}
  | %number   {% id %}
  | %object   {% id %}
  | %variable {% id %}
  | %func     {% id %}

_ -> %WS:*