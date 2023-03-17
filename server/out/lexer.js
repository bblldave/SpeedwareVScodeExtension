"use strict";
const moo = require("moo");
const fs = require("mz/fs");
let lexer = moo.compile({
    verb: /\b(?:ABORT|AT|BREAK|CALCUL|CALL|CALLSUB|CASE|CLOSE|COMMAND|COMMAND|CONTINUE|CREATE|DCL|DCL|DCLFILE|DCLFRAME|DCLHUGE|DCLPRINTER|DCLPROC|DCLSESSION|DCLSQLDESCRIPTOR|DCLSQLDYNAMIC|DCLSTRUCT|DCLVIEW|DELETE|FAIL|FILE|FOR|IF|LET|LOADVAR|LOOP|NEW|NOTHING|ON|OPEN|PARMHUGE|PRINT|PRINT|PRINTHTML|PROCEED|PROTECTED|REMOTE|RETRY|RETURN|RUN|RUN|SECTION|SEGMENT|SELECT|SEND|SET|SKIP|SUBMIT|SUBRETURN|SUBSECTION|TAKE|TRANSACTION|WAIT|WHILE)\b/,
    option: /\b(?:ACCESS|ACCESS|ALIAS|APPLICATION|ARITHMETIC|ARITHMETIC|AS-PDF|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASYNC|ASYNC|ASYNC|BACKWARD|BASE|BASE|BATCHJOB|CENTER|COLUMNS|COMMIT-COUNT|COMPATIBLE|COMPATIBLE|CONNECT|CONNECT|CONNECT|CONNECTION|CONTROL-Y|CONTROL-Y|COUNTRY|CURSOR|CURSOR|CURSOR|CURSOR|CURSOR|DEFAULT|DISPLAY|EDIT|EDIT|EDIT|EDIT|ENCRYPT|ENCRYPT|ENVFILE|ENVFILE|ERROR|ERROR|EXECUTE|FILES|FORM|FORM|FORM|FORM|FORM|FORM|FORMAT|FORMAT|FORMAT|FORMAT|HEAD|HILITE|HOST|HOST|HOST|IGNORE|IGNORE|IMAGE-LOCK|IN|INIT|INIT|INPUT|IS|IS|ITEM-AREA|ITEM-AREA|ITEM-AREA|ITERATIONS|ITERATIONS|LANGUAGE|LAUNCH|LAUNCH|LEFT|LEFT|LIKE|LIKE|LOCATION|MATCH|MATCH|MATCH|MATCH|MATCH|MODIFY|NAME|NAME|NEED|NEED|NEWDEVICE|NEXT|NEXT|OMNIDEX|OPEN-IMMEDIATE|OUT|PRINTER|PRINTER|PRINTSCREEN|RAW|RECOMPILE|REDEFINES|REPORT-SETUP|RESET|RETURN-VALUE|RIGHT|RIGHT|Run-card|SCOPE|SELECTED|SEQUENCE|SEQUENCE|SHOW|SKIP|SKIP|SQL-CURSOR|SQL-DYNAMIC|SQL-ESCAPE-CLAUSE|STATEMENT|STEP|STORE|STRUCT|STRUCT|SYNC|SYNC|SYNC|SYNC|SYNC|TAKEFILE|TEXT|TIMEOUT|TIMEOUT|TIMEOUT|TITLE|TYPE|TYPE|USER|USING|VAL|WAIT|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW)\b/,
    parameter: /\b(?:ACCESS|ADDR-DELIM|ADDR-DELIMITER|ALIAS|APPLICATION-NAME|AREA|AT|AUTO-OPEN|BACKGROUND|BLANK|BLANKRULE|BOTTOM|BREAK|BUILD|BWZ|BY|BYTES|CALLBACK|CLOSE|COLUMN|CONDITION|COORDCOLUMN|COORDROW|COORDTYPE|COPIES|DATA-SOURCE|DATE|DAY|DECIMAL|DELETE|DEVICE|DIRECT|DIRECTION|DIV|ENABLE|ENCCHAR|EXIT|EXIT-CONFIRMATION|EXPONENT|EXPRESSION|FALSE|FILE|FILENAME|FINAL-CLOSE|FLOAT-COMPARE|FONT|FONTSIZE|FOREGROUND|FROM|FUNCTIONS|HEADING|HEIGHT|HIGHER|HORIZONTAL|HSPACE|IDENTIFICATION|IMMEDIATE|IN|INFO|INFORMATION|INP|INPUT|INTERRUPT|LANDSCAPE|LANGUAGE|LEFT|LENGTH|LEVEL|LIBSEARCH|LINE|LOCATION|LOCK|LOCKn|LOGON|LOWER|MASK|MAXDATA|MAXIMUM|MESSAGE|MINIMUM|MODE|MODULO|NAME|NESTED|NULL|NULL-ASSIGN|NULLCHAR|NUMBER|ORDER|OUTPUT|OVERFLOW|OVERWRITE|PARM|PARMRUN|PASSWORD|PATTERN|POSITION|PRIORITY|PROGRAM|PURGE|QUEUE|RECOMPILE|RECORDS|RELATIVE|REMOTE-CONNECT|RIGHT|ROW|SAVE|SCOPE|SEARCH|SECTION|SEEK|SESSION|SHARED|SPOOLNAME|SPOOLSIZE|SQL|SQL-TEXT|START-CLOSE|SUBTYPE|TARGET|TERMINAL|TEXT|TIME|TITLE|TO|TOP|TRUE|TYPE|UNIT|UNSIGNED|USER|USERID|USER-NAME|VALUE|VARIABLE|VENDOR|VERTICAL|VSPACE|WIDTH|WRITE|ZERO-NULL)\b/,
    variable: /\$(?:ACCOUNT|ACCOUNT|BASE|BASE|BASE|BATCH|BATCH|BLOB_FILE|BLOB_FILE|BOX|BOX|BOX|BOX|BOX|COLUMN|COLUMN|COUNT|COUNT|CPUMSEC|CPUMSEC|CUTOFF|CUTOFF|DATE|DATE|DATE|DATES|DATES|DATES|DBMS_ERRMESS|DBMS_ERRMESS|DBMS_ERRNO|DBMS_ERRNO|DEVPRN|DEVPRN|DEVPRN|ERRSYS|ERRSYS|FILE|FILE|FILE|GENCOM|GENCOM|GROUP|GROUP|IF|IF|IF|IF|LINE|LINE|LINES|LINES|LOCATION|LOCATION|LOGON|LOGON|NULL|NULL|OMNI_COUNT|OMNI_COUNT|OMNI_COUNT|OMNI_COUNT|PAGE|PAGE|PAGEHEIGHT|PAGEHEIGHT|PAGEHEIGHT|PAGEWIDTH|PAGEWIDTH|PAGEWIDTH|PARENT|PARENT|PIN|PIN|PRINTER_DEFAULT_DEVCLASS|PRINTER_DEFAULT_DEVCLASS|PRINTER_DEFAULT_TYPE|PRINTER_DEFAULT_TYPE|PROC_STATUS|PROC_STATUS|PROC_STATUS|PROFILE|PROFILE|RAND|RAND|REACTOR|REACTOR|ROW|ROW|SECTION_DURATION|SECTION_DURATION|SECTION_NAME|SECTION_NAME|SESSION_ID|SESSION_ID|SQLERROR|SQLERROR|SUM|SUM|SUM|TAKE_COUNT|TAKE_COUNT|TIME|TIME|TIMES|TIMES|TITLE|TITLE|TITLE|USER|USER|USERNO|USERNO|VERSION|VERSION|_RECNUM|_RECNUM|_RECORD|_RECORD|_RECORD_BY_ITEM|_RECORD_BY_ITEM)\b/,
    clause: /\b(?:\$COLUMN|\$COLUMN|AS|COLUMNS|ELSE|GET-INFORMATION|INTO-SQL-DESCRIPTOR|INTO-VARIABLES|NULL|OTHERWISE|PARAMETERS|RETURN-VALUE|SET-INFORMATION|THEN|USING|USING|USING-EXPRESSIONS|USING-SQL-DESCRIPTOR|WHERE|WITH)\b/,
    directive: /\b(?:#CHARSET|#CHARSET|#DEFINE|#DEFINE|#ELSE|#ELSE|#ENDIF|#ENDIF|#ENDNOTE|#ENDNOTE|#IFDEF|#IFDEF|#IFNDEF|#IFNDEF|#INCLUDE|#INCLUDE|#NOTE|#NOTE|#UNDEF|#UNDEF)\b/,
    function: /\$(?:ABS|ABS|ADDR|ADDR|ASC|ASC|BLOB_SIZE|BLOB_SIZE|CHR|CHR|CLN|CLN|CLOSE_SESSION|CLOSE_SESSION|CLOSE_SESSION|DAT|DAT|DATE_TO_MOMENT|DATE_TO_MOMENT|DATE_TO_MOMENT|DATETIME_TO_MOMENT|DATETIME_TO_MOMENT|DAY|DAY|DURATION_TO_TIME|DURATION_TO_TIME|DWS|DWS|EDIT|EDIT|EDIT|EDIT|EDIT|FILE_ACCESS|FILE_ACCESS|FILE_ACCESS|GETENV|GETENV|INCREMENT|INCREMENT|INCREMENT|INCREMENT|INCREMENT|INCREMENT|INITIALIZE|INITIALIZE|INITIALIZE|INITIALIZE|JUL|JUL|LEN|LEN|LJU|LJU|MATCH|MATCH|MATCH|MATCH|MATCH|MID|MID|MOD|MOD|MOMENT_TO_DATE|MOMENT_TO_DATE|MOMENT_TO_DATETIME|MOMENT_TO_DATETIME|MOMENT_TO_TIME|MOMENT_TO_TIME|MONTH|MONTH|NOW|NOW|NULL|NULL|NUM|NUM|NUM|POS|POS|POW|POW|RAND|RAND|REL|REL|REL|RJU|RJU|ROUND|ROUND|ROUND|ROUND_DURATION|ROUND_DURATION|ROUND_DURATION|ROUND_MOMENT|ROUND_MOMENT|ROUND_MOMENT|STR|STR|STR|STR|SUBRETURN|SUMMATION|SUMMATION|SUMMATION|SUMMATION|SUMMATION|TIME_TO_DURATION|TIME_TO_DURATION|TOTIME|TOTIME|TRIM|TRUNC|TRUNC|TRUNC_DURATION|TRUNC_DURATION|TRUNC_DURATION|TRUNC_MOMENT|TRUNC_MOMENT|TRUNC_MOMENT|UPS|UPS|WAIT_SESSION|WAIT_SESSION|WAIT_SESSION|WAIT_SESSION|WAIT_SESSION|YEAR|YEAR|ZFI|ZFI|INITIALIZE)\b/,
    subtype: /(?:ALPHA|DATE|DATETIME|DURATION|MOMENT|NUMERIC|TIME)\b/,
    storageType: /(?:BLOB|CHAR|DFLOAT|FLOAT|HPFLOAT|INT|PACK|TEXT|VARCHAR|ZONE)\b/,
    keyword: /\b(?:AS|COLUMNS|ELSE|GET-INFORMATION|INTO-SQL-DESCRIPTOR|INTO-VARIABLES|NULL|OTHERWISE|PARAMETERS|RETURN-VALUE|SET-INFORMATION|THEN|USING|USING|USING-EXPRESSIONS|USING-SQL-DESCRIPTOR|WHERE|WITH|DO|ACCESS|ACCESS|ALIAS|APPLICATION|ARITHMETIC|ARITHMETIC|AS-PDF|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASSIGN|ASYNC|ASYNC|ASYNC|BACKWARD|BASE|BASE|BATCHJOB|CENTER|COLUMNS|COMMIT-COUNT|COMPATIBLE|COMPATIBLE|CONNECT|CONNECT|CONNECT|CONNECTION|CONTROL-Y|CONTROL-Y|COUNTRY|CURSOR|CURSOR|CURSOR|CURSOR|CURSOR|DEFAULT|DISPLAY|EDIT|EDIT|EDIT|EDIT|ENCRYPT|ENCRYPT|ENVFILE|ENVFILE|ERROR|ERROR|EXECUTE|FILES|FORM|FORM|FORM|FORM|FORM|FORM|FORMAT|FORMAT|FORMAT|FORMAT|HEAD|HILITE|HOST|HOST|HOST|IGNORE|IGNORE|IMAGE-LOCK|IN|INIT|INIT|INPUT|IS|IS|ITEM-AREA|ITEM-AREA|ITEM-AREA|ITERATIONS|ITERATIONS|LANGUAGE|LAUNCH|LAUNCH|LEFT|LEFT|LIKE|LIKE|LOCATION|MATCH|MATCH|MATCH|MATCH|MATCH|MODIFY|NAME|NAME|NEED|NEED|NEWDEVICE|NEXT|NEXT|OMNIDEX|OPEN-IMMEDIATE|OUT|PRINTER|PRINTER|PRINTSCREEN|RAW|RECOMPILE|REDEFINES|REPORT-SETUP|RESET|RETURN-VALUE|RIGHT|RIGHT|Run-card|SCOPE|SELECTED|SEQUENCE|SEQUENCE|SHOW|SKIP|SKIP|SQL-CURSOR|SQL-DYNAMIC|SQL-ESCAPE-CLAUSE|STATEMENT|STEP|STORE|STRUCT|STRUCT|SYNC|SYNC|SYNC|SYNC|SYNC|TAKEFILE|TEXT|TIMEOUT|TIMEOUT|TIMEOUT|TITLE|TYPE|TYPE|USER|USING|VAL|WAIT|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|WINDOW|\$@n|ACCESS|ADDR-DELIM|ADDR-DELIMITER|ALIAS|APPLICATION-NAME|AREA|AT|AUTO-OPEN|BACKGROUND|BLANK|BLANKRULE|BOTTOM|BREAK|BUILD|BWZ|BY|BYTES|CALLBACK|CLOSE|COLUMN|CONDITION|COORDCOLUMN|COORDROW|COORDTYPE|COPIES|DATA-SOURCE|DATE|DAY|DECIMAL|DELETE|DEVICE|DIRECT|DIRECTION|DIV|ENABLE|ENCCHAR|EXIT|EXIT-CONFIRMATION|EXPONENT|EXPRESSION|FALSE|FILE|FILENAME|FINAL-CLOSE|FLOAT-COMPARE|FONT|FONTSIZE|FOREGROUND|FROM|FUNCTIONS|HEADING|HEIGHT|HIGHER|HORIZONTAL|HSPACE|IDENTIFICATION|IMMEDIATE|IN|INFO|INFORMATION|INP|INPUT|INTERRUPT|LANDSCAPE|LANGUAGE|LEFT|LENGTH|LEVEL|LIBSEARCH|LINE|LOCATION|LOCK|LOCKn|LOGON|LOWER|MASK|MAXDATA|MAXIMUM|MESSAGE|MINIMUM|MODE|MODULO|NAME|NESTED|NULL|NULL-ASSIGN|NULLCHAR|NUMBER|ORDER|OUTPUT|OVERFLOW|OVERWRITE|PARM|PARMRUN|PASSWORD|PATTERN|POSITION|PRIORITY|PROGRAM|PURGE|QUEUE|RECOMPILE|RECORDS|RELATIVE|REMOTE-CONNECT|RIGHT|ROW|SAVE|SCOPE|SEARCH|SECTION|SEEK|SESSION|SHARED|SPOOLNAME|SPOOLSIZE|SQL|SQL-TEXT|START-CLOSE|SUBTYPE|TARGET|TERMINAL|TEXT|TIME|TITLE|TO|TOP|TRUE|TYPE|UNIT|UNSIGNED|USER|USERID|USER-NAME|VALUE|VARIABLE|VENDOR|VERTICAL|VSPACE|WIDTH|WRITE|ZERO-NULL|FINAL|FOOTER|HEADING|RECORD|Asynchronous|BATCH|BATCH-name|COMPILEINFO|EXECUTEINFO|FINISH|GLOBAL|GLOBAL-SHARE|GLOBAL-SUB|INCLUDE-name|LISTING|NORUN|NOWARN|Remote|REPORT-FINISH|REPORT-name|Synchronous|UTILITY-UNSAT|EXIT|NULL|BLOB|CHAR|DFLOAT|FLOAT|HPFLOAT|INT|PACK|TEXT|VARCHAR|ZONE|ALPHA|DATE|DATETIME|DURATION|MOMENT|NUMERIC|TIME|ABORT|AT|BREAK|CALCUL|CALL|CALLSUB|CASE|CLOSE|COMMAND|COMMAND|CONTINUE|CREATE|DCL|DCL|DCLFILE|DCLFRAME|DCLHUGE|DCLPRINTER|DCLPROC|DCLSESSION|DCLSQLDESCRIPTOR|DCLSQLDYNAMIC|DCLSTRUCT|DCLVIEW|DELETE|FAIL|FILE|FOR|IF|LET|LOADVAR|LOOP|NEW|NOTHING|ON|OPEN|PARM|PARMHUGE|PRINT|PRINT|PRINTHTML|PROCEED|PROTECTED|REMOTE|RETRY|RETURN|RUN|RUN|SECTION|SEGMENT|SELECT|SEND|SET|SKIP|SUBMIT|SUBRETURN|SUBSECTION|TAKE|TRANSACTION|WAIT|WHILE|YES|NO|MINE|BEGIN|END|SPACES|AND|OF)\b/,
    blockComment: { match: /#NOTE(?:[\s\S]*?)#ENDNOTE/, lineBreaks: true },
    object: /(?:~?(?:#\s*[a-zA-Z_-][a-zA-Z0-9_-]*[a-zA-Z0-9]|(?:[a-zA-Z_-][a-zA-Z0-9_-]*[a-zA-Z0-9])))/,
    lineComment: { match: /\(\*[\s\S]*?\*\)(?![^(\n]*\))/, lineBreaks: true },
    NL: { match: /\r\n|\n/, lineBreaks: true },
    WS: { match: /[\s\t]+/, lineBreaks: true },
    number: /0|[1-9][0-9]*/,
    string: /(?:["'])(?:\\\1|(?!\\1).)*\1/,
    lparen: "(",
    rparen: ")",
    lbrace: "{",
    rbrace: "}",
    rbracket: "]",
    lbracket: "[",
    assign: "=",
    comma: ",",
    semiColon: ";",
    star: "*",
    colon: ":",
    hash: "#",
    dot: ".",
    dollar: "$",
    operators: /[\+\-\*\/\%\&\|\^\~\!\=\<\>\?]+/,
    verbs: /\b\w*[A-Z]\w*\b/
}, {
    offset: 1,
});
async function main() {
    const code = (await fs.readFile("test.spw")).toString();
    lexer.reset(code);
    let out = fs.createWriteStream("lexedOutput.txt", { flags: 'a' });
    while (true) {
        const token = lexer.next();
        if (!token) {
            break;
        }
        out.write(JSON.stringify(token, null, 4) + ',');
        //console.log(token);
    }
    out.end();
}
main().catch((err) => console.log(err.stack));
//# sourceMappingURL=lexer.js.map