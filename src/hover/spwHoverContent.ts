'use strict';

export class SpwHoverContent {
    functions: any = {
        "absolute": {
            "prefix": "ABS",
            "description":
                "The $ABS function returns the absolute value of a numeric or duration expression.",
            "example": "$ABS ([EXP[RESSION]=] numeric_expression|duration_expression)"
        },
        "address": {
            "prefix": "ADDR",
            "description":
                "The $ADDR function converts a string expression into the conventional format for an address",
            "example": "$ADDR ([EXP[RESSION]=] string_expression)" 
        },
        "ascii": {
            "prefix": "ASC",
            "description":
                "The $ASC function returns the ASCII value of the first character of a string expression.",
            "example": "$ASC ([EXP[RESSION]=] string_expression)" 
        },
        "blobsize": {
            "prefix": "BLOB_SIZE",
            "description":
                "The $BLOB_SIZE function retrieves the size of a BLOB column or variable.",
            "example": "$BLOB_SIZE ([NAME=] [file.]variable)" 
        },
        "character": {
            "prefix": "CHR",
            "description":
                "The $CHR function converts a numeric expression to its ASCII character equivalent.",
            "example": "$CHR ([EXP[RESSION]=] numeric_expression)" 
        },
        "clean": {
            "prefix": "CLN",
            "description":
                "The $CLN function removes multiple blanks from a string.",
            "example": "$CLN ([EXP[RESSION]=] string_expression )" 
        },
        "closesession": {
            "prefix": "CLOSE_SESSION",
            "description":
                "The $CLOSE_SESSION function manually closes a remote session.",
            "example": "$CLOSE_SESSION ([[SESSION=] session]);" 
        },
        "date": {
            "prefix": "DAT",
            "description":
                "The $DAT function converts a numeric expression from its Julian date value to a date expression",
            "example": "$DAT ([EXP[RESSION]=] numeric_expression)" 
        },
        "datetomoment": {
            "prefix": "DATE_TO_MOMENT",
            "description":
                "The $DATE_TO_MOMENT function converts a date and time to a moment.",
            "example": "$DATE_TO_MOMENT ([EXP[RESSION]=] date expression, [TIME=] time_expression)" 
        },
        "datetimetomoment": {
            "prefix": "DATETIME_TO_MOMENT",
            "description":
                "The $DATE_TO_MOMENT function converts a date and time to a moment.",
            "example": "$DATETIME_TO_MOMENT ([EXP[RESSION]=] datetime_expression)" 
        },
        "day": {
            "prefix": "DAY",
            "description":
                "The $DAY function accepts a date or moment expression and returns the name of the corresponding weekday",
            "example": "$DAY ([EXP[RESSION]=] date_expression|moment_expression)" 
        },
        "durationtotime": {
            "prefix": "DURATION_TO_TIME",
            "description":
                "The $DURATION_TIME function converts a duration to a time.",
            "example": "$DURATION_TO_TIME([EXP[RESSION]=] duration_expression)" 
        },
        "dws": {
            "prefix": "DWS",
            "description":
                "The $DWS function converts uppercase alphabetic characters to lowercase.",
            "example": "$DWS ([EXP[RESSION]=] string_expression)" 
        },
        "edit": {
            "prefix": "EDIT",
            "description":
                "The $EDIT function formats an expression for display.",
            "example": "$EDIT ( [EXP[RESSION]=] [,[MASK=] string_expression ] [,[LEN[GTH]=] integer_expression ] [,[BWZ=] YES|NO ]);" 
        },
        "fileaccess": {
            "prefix": "FILE_ACCESS",
            "description":
                "The $FILE_ACCESS function checks the existence of a file, and its accessibility.",
            "example": "$FILE_ACCESS ( [NAME=] string_expression [,[ACCESS=] ANY|READ|WRITE|READ-WRITE])" 
        },
        "getenvironment": {
            "prefix": "GETENV",
            "description":
                "The $GETENV function returns an environment/system variable.",
            "example": "$GETENV ([VAR[IABLE]=] variable)" 
        },
        "increment": {
            "prefix": "INCREMENT",
            "description":
                "The $INCREMENT function increments numeric array or non-array cells.",
            "example": "$INCREMENT ( [NAME=] variable [,[FROM1=] integer_expression ][,[TO1=] integer_expression ] [,[FROM2=] integer_expression ] [,[TO2=] integer_expression ] [,[VAL[UE]=] numeric_expression])" 
        },
        "initialize": {
            "prefix": "INITIALIZE",
            "description":
                "he $INITIALIZE function assigns a value to array or non-array cells..",
            "example": "$INITIALIZE ( [NAME=] variable [,[FROM1=] integer_expression ] [,[TO1=] integer_expression ] [,[FROM2=] integer_expression ] [,[TO2=] integer_expression ] [,[VAL[UE]=] expression) ])" 
        },
        "julian": {
            "prefix": "JUL",
            "description":
                "The $JUL function converts a date expression to a Julian date.",
            "example": "$JUL ([EXP[RESSION]=] date_expression)" 
        },
        "length": {
            "prefix": "LEN",
            "description":
                "The $LEN function returns the display length of a string expression.",
            "example": "$LEN ([EXP[RESSION]=] string_expression)" 
        },
        "leftjustify": {
            "prefix": "LJU",
            "description":
                "The $LJU function left-justifies a string within its display length.",
            "example": "$LJU ([EXP[RESSION]=] string_expression)" 
        },
        "match": {
            "prefix": "MATCH",
            "description":
                "The $MATCH function compares an expression to a pattern or range of values.",
            "example": "$MATCH ( [EXP[RESSION=] expression [,[PAT[TERN]=] string_expression ] [,[MIN[IMUM]=] expression ] [,[MAX[IMUM]=] expression ])" 
        },
        "mid": {
            "prefix": "MID",
            "description":
                "The $MID function extracts characters from a specified position in a string expression.",
            "example": "$MID ( [EXP[RESSION]=] string_expression, [FROM=] integer_expression [,[TO=] integer_expression ]))" 
        },
        "modulo": {
            "prefix": "MOD",
            "description":
                "The $MOD function performs a modulo operation.",
            "example": "$MOD ([EXP[RESSION]=] numeric_expression|duration_expression, [MODULO=] numeric_expression|duration_expression)" 
        },
        "momenttodate": {
            "prefix": "MOMENT_TO_DATE",
            "description":
                "The $MOMENT_TO_DATE function converts a moment expression to a date.",
            "example": "$MOMENT_TO_DATE ([EXP[RESSION]=] moment_expression)" 
        },
        "momenttodatetime": {
            "prefix": "MOMENT_TO_DATETIME",
            "description":
                "The $MOMENT_TO_DATETIME function converts a moment expression to a datetime expression",
            "example": "$MOMENT_TO_DATETIME ([EXP[RESSION]=] moment_expression)" 
        },
        "momenttotime": {
            "prefix": "MOMENT_TO_TIME",
            "description":
                "The $MOMENT_TO_TIME function converts a moment expression to a time.",
            "example": "$MOMENT_TO_TIME ([EXP[RESSION]=] moment_expression)" 
        },
        "month": {
            "prefix": "MOMENT_TO_TIME",
            "description":
                "The $MONTH function returns the name of the month in a date expression.",
            "example": "$MONTH ([EXP[RESSION]=] date_expression)" 
        },
        "now": {
            "prefix": "NOW",
            "description":
                "The $NOW function returns a MOMENT-type variable.",
            "example": "$NOW" 
        },
        "null": {
            "prefix": "NULL",
            "description":
                "The $NULL function checks whether the value of an expression is null.",
            "example": "$NULL ([EXP[RESSION]=] expression)" 
        },
        "position": {
            "prefix": "POS",
            "description":
                "The $POS function looks for a target string within a string expression and returns the position of the target.",
            "example": "$POS ([EXP[RESSION]=] string_expression,[TARGET=] string_expression)" 
        },
        "power": {
            "prefix": "POW",
            "description":
                "The $POW function raises a numeric expression to the power of a specified exponent.",
            "example": "$POW ([EXP[RESSION]=] numeric_expression,[EXPO[NENT]=] exponent)" 
        },
        "relative": {
            "prefix": "REL",
            "description":
                "The $REL function calculates a relative date based on a date expression.",
            "example": "$REL ([EXP[RESSION]=] date_expression [,[REL[ATIVE]=] relative_date)])" 
        },
        "rightjustify": {
            "prefix": "RJU",
            "description":
                "The $RJU function right-justifies a string within its display length.",
            "example": "$RJU ([EXP[RESSION]=] string_expression)" 
        },
        "round": {
            "prefix": "ROUND",
            "description":
                "The $ROUND function rounds a numeric expression to a specified number of significant digits.",
            "example": "$ROUND ( [EXP[RESSION]=] numeric_expression [,[DEC[IMAL]=] integer_expression])" 
        },
        "roundduration": {
            "prefix": "ROUND_DURATION",
            "description":
                "The $ROUND_DURATION function rounds a duration expression.",
            "example": "$ROUND_DURATION ([EXP[RESSION]=] duration_expression, [UNIT=] duration_expression)" 
        },
        "roundmoment": {
            "prefix": "ROUND_MOMENT",
            "description":
                "The $ROUND_MOMENT function rounds a moment expression.",
            "example": "$ROUND_MOMENT ([EXP[RESSION]=] moment_expression,[UNIT=] duration_expression)" 
        },
        "string": {
            "prefix": "STR",
            "description":
                "The $STR function converts any expression to a string expression.",
            "example": "$STR ( [EXP[RESSION]=] expression [,[LEN[GTH]=] integer_expression ] [,[DEC[IMAL]=] integer_expression])" 
        },
        "subreturn": {
            "prefix": "SUBRETURN",
            "description":
                "The $SUBRETURN function retrieves the value returned by the SUBRETURN verb.",
            "example": "$SUBRETURN ([SUB[SECTION]=] string_constant);" 
        },
        "summation": {
            "prefix": "SUMMATION",
            "description":
                "The $SUMMATION function calculates the total of numeric array cells.",
            "example": "$SUMMATION ( [NAME=] numeric_array [,[FROM1=] integer_expression ] [,[TO1=] integer_expression ] [,[FROM2=] integer_expression ] [,[TO2=] integer_expression ] )" 
        },
        "timetoduration": {
            "prefix": "TIME_TO_DURATION",
            "description":
                "The $TIME_TO_DURATION function converts a time to a duration.",
            "example": "$TIME_TO_DURATION([EXP[RESSION]=] time_expression)" 
        },
        "totime": {
            "prefix": "TOTIME",
            "description":
                "The $TOTIME function converts a 4- or 6-character time string expression into a time expression in the format HHMMSS.",
            "example": "$TOTIME ([EXP[RESSION]=] string_expression)" 
        },
        "trim": {
            "prefix": "TRIM",
            "description":
                "The $TRIM function removes blanks from a string.",
            "example": "$TRIM ( [EXP[RESSION]=] string_expression [,[BLANK=] ALL|CENTER|LEFT|RIGHT])" 
        },
        "truncate": {
            "prefix": "TRUNC",
            "description":
                "The $TRUNC function truncates a numeric expression.",
            "example": "$TRUNC ( [EXP[RESSION]=] numeric_expression [,[DEC[IMAL]=] integer_expression])" 
        },
        "truncateduration": {
            "prefix": "TRUNC_DURATION",
            "description":
                "The $TRUNC_DURATION expression truncates a duration expression.",
            "example": "$TRUNC_DURATION ([EXP[RESSION]=] duration_expression, [UNIT=] duration_expression)" 
        },
        "truncatemoment": {
            "prefix": "TRUNC_MOMENT",
            "description":
                "The $TRUNC_DURATION expression truncates a duration expression.",
            "example": "$TRUNC_MOMENT ([EXP[RESSION]=] moment_expression, [UNIT=] duration_expression)" 
        },
        "upshift": {
            "prefix": "UPS",
            "description":
                "The $UPS function upshifts alphabetic characters.",
            "example": "$UPS ([EXP[RESSION]=] string_expression)" 
        },
        "waitsession": {
            "prefix": "WAIT_SESSION",
            "description":
                "The $WAIT_SESSION function customizes an asynchronous remote section call. See “Remote section calls” on page 545 for details about remote calls.",
            "example": "$WAIT_SESSION ([ [SESSION=] session ] [,[TIME=] integer_expression ][,[MESSAGE=] string_expression ]);" 
        },
        "year": {
            "prefix": "YEAR",
            "description":
                "The $YEAR function extracts the year from a date expression.",
            "example": "$YEAR([EXP[RESSION]=] date_expression)" 
        },
        "zerofill": {
            "prefix": "ZFI",
            "description":
                "The $ZFI function fills leading blanks of a string expression with zeros.",
            "example": "$ZFI([EXP[RESSION]=] string_expression)" 
        }
    
       
       
    };

    variables: any = {
        "account": {
            "prefix": "ACCOUNT",
            "description":
                "The $ACCOUNT variable contains the name of the end user’s logon account or current directory.",
            "example": "$ACCOUNT"
        },
        "base": {
            "prefix": "BASE",
            "description":
                "The $BASE variable contains database connection information for a specified table.",
            "example": "$BASE ([NAME=] [base.]table)"
        },
        "batch": {
            "prefix": "BATCH",
            "description":
                "The $BATCH variable distinguishes between operations running in batch mode and those running in online mode.",
            "example": "$BATCH"
        },
        "blobfile": {
            "prefix": "BLOB_FILE",
            "description":
                "The $BLOB_FILE variable contains a file location of a BLOB.",
            "example": "$BLOB_FILE ([LOC[ATION]=] file)"
        },
        "box": {
            "prefix": "BOX",
            "description":
                "The $BOX variable draws a box or lines on screen.",
            "example": "PRINT $BOX ([ [HEIGHT=] integer_expression ] [,[WIDTH=] integer_expression ] [,[LINE=] SINGLE|DOUBLE|LARGE|BLANK|INVISIBLE ])"
        },
        "count": {
            "prefix": "COUNT",
            "description":
                "The $COUNT variable contains the number of records currently read in a report.",
            "example": "$COUNT"
        },
        "cpumsec": {
            "prefix": "CPUMSEC",
            "description":
                "The $CPUMSEC variable contains the current CPU consumption in milliseconds.",
            "example": "$CPUMSEC"
        },
        "cutoff": {
            "prefix": "CUTOFF",
            "description":
                "The $CUTOFF variable contains the cutoff year used by the application.",
            "example": "$CUTOFF"
        },
        "date": {
            "prefix": "DATE",
            "description":
                "The $DATE and $DATES variables both contain the current date in YYYYMMDD format.",
            "example": "$DATE|$DATES [([REL[ATIVE]=] relative_date)]"
        },
        "dates": {
            "prefix": "DATES",
            "description":
                "The $DATE and $DATES variables both contain the current date in YYYYMMDD format.",
            "example": "$DATE|$DATES [([REL[ATIVE]=] relative_date)]"
        },
        "dbmserr": {
            "prefix": "DBMS_ERRMESS",
            "description":
                "The $DBMS_ERRMESS variable contains a DBMS error message.",
            "example": "$DBMS_ERRMESS"
        },
        "dbmserrno": {
            "prefix": "DBMS_ERRNO",
            "description":
                "The $DBMS_ERRNO variable contains the number of a DBMS error message.",
            "example": "$DBMS_ERRNO ([SEEK=] NEXT|CURRENT)"
        },
        "devprn": {
            "prefix": "DEVPRN",
            "description":
                "The $DEVPRN variable queries the profile for a printer name.",
            "example": "$DEVPRN ([NAME=] printer)"
        },
        "systemerror": {
            "prefix": "ERRSYS",
            "description":
                "The $ERRSYS variable contains an error number representing the status of an operating-system command.",
            "example": "$ERRSYS"
        },
        "file": {
            "prefix": "FILE",
            "description":
                "The $FILE variable contains a table identification number.",
            "example": "$FILE ([NAME=] [base.]table)"
        },
        "gencom": {
            "prefix": "GENCOM",
            "description":
                "The $GENCOM variable passes environment variables with a routine accessed by the CALL verb.",
            "example": "CALL routine USING $GENCOM (variable);"
        },
        "group": {
            "prefix": "GROUP",
            "description":
                "The $GROUP variable contains the name of the end user’s logon group or current directory.",
            "example": "$GROUP"
        },
        "if": {
            "prefix": "IF",
            "description":
                "The $IF variable evaluates a logical condition.",
            "example": "$IF ( [COND[ITION]=] condition,[TRUE=] expression1, [FALSE=] expression2, [,[NULL=] expression3])"
        },
        "line": {
            "prefix": "LINE",
            "description":
                "The $LINE variable contains the current line number, and the $LINES variable contains the total lines printed in a report.",
            "example": "$LINE   $LINES"
        },
        "lines": {
            "prefix": "LINES",
            "description":
                "The $LINE variable contains the current line number, and the $LINES variable contains the total lines printed in a report.",
            "example": "$LINE   $LINES"
        },
        "location": {
            "prefix": "LOCATION",
            "description":
                "The $LOCATION variable contains the physical location of a structure. See also “Structures” on page 560.",
            "example": "$LOCATION ([FILE=] declared_file)"
        },
        "logon": {
            "prefix": "LOGON",
            "description":
                "The $LOGON variable contains the system identifier or logon name under which the current session was begun.",
            "example": "$LOGON"
        },
        "onmicount": {
            "prefix": "OMNI_COUNT",
            "description":
                "The $OMNI_COUNT variable contains the number of records qualified by an Omnidex keyword query.",
            "example": "$OMNI_COUNT ([ [FILE=] [base.]table ] [,[INTERRUPT=] YES|NO ])"
        },
        "page": {
            "prefix": "PAGE",
            "description":
                "The $PAGE variable contains the current report page number.",
            "example": "$PAGE"
        },
        "pageheight": {
            "prefix": "PAGEHEIGHT",
            "description":
                "The $PAGEHEIGHT variable contains the number of lines in a given physical printer page.",
            "example": "$PAGEHEIGHT ([DEVICE=] printer)"
        },
        "pagewidth": {
            "prefix": "PAGEWIDTH",
            "description":
                "The $PAGEWIDTH variable contains the number of columns in a given physical printer page.",
            "example": "$PAGEWIDTH ([DEVICE=] printer|)"
        },
        "parent": {
            "prefix": "PARENT",
            "description":
                "The $PARENT variable returns the name of a section.",
            "example": "$PARENT"
        },
        "pin": {
            "prefix": "PARENT",
            "description":
                "The $PIN variable contains the process identification number of the current Speedware program.",
            "example": "$PIN"
        },
        "printerdefaulttype": {
            "prefix": "PRINTER_DEFAULT_TYPE",
            "description":
                "The $PRINTER_DEFAULT_TYPE variable contains the default printer type.",
            "example": "$PRINTER_DEFAULT_TYPE"
        },
        "printerdefaultdevice": {
            "prefix": "PRINTER_DEFAULT_DEVCLASS",
            "description":
                "The $PRINTER_DEFAULT_DEVCLASS variable contains the default printer device class.",
            "example": "$PRINTER_DEFAULT_DEVCLASS"
        },
        "procstatus": {
            "prefix": "PROC_STATUS",
            "description":
                "The $PROC_STATUS variable contains the return status of a user-defined procedure or function. See also “User-defined procedures” on page 568.",
            "example": "$PROC_STATUS ([NAME=] procedure)"
        },
        "profile": {
            "prefix": "PROFILE",
            "description":
                "The $PROFILE variable extracts information from the profile.",
            "example": "$PROFILE ( INFO[RMATION]= keyword [,[ID[ENTIFICATION]=] string_expression])"
        },
        "random": {
            "prefix": "RAND",
            "description":
                "The $RAND variable contains a random number.",
            "example": "$RAND ([ [LOWER=] integer_constant ] [,[HIGHER=] integer_constant ])"
        },
        "reactor": {
            "prefix": "REACTOR",
            "description":
                "The $REACTOR variable contains the name and location of the Speedware executable file running the current section.",
            "example": "$REACTOR"
        },
        "recordnumber": {
            "prefix": "_RECNUM",
            "description":
                "The _RECNUM variable contain the current record number.",
            "example": "_RECNUM"
        },
        "record": {
            "prefix": "_RECORD",
            "description":
                "The _RECORD variable contains the contents of the current record buffer.",
            "example": "_RECORD [[byte1:byte2]] represents the bytes in a substring."
        },
        "recordbyitem": {
            "prefix": "_RECORD_BY_ITEM",
            "description":
                "The _RECORD_BY_ITEM variable contains the contents of the current record buffer.",
            "example": "_RECORD_BY_ITEM"
        },
        "sectionduration": {
            "prefix": "SECTION_DURATION",
            "description":
                "The $SECTION_DURATION variable reports the elapsed time of a section.",
            "example": "$SECTION_DURATION"
        },
        "sectionname": {
            "prefix": "SECTION_NAME",
            "description":
                "The $SECTION_NAME variable contains the name of the current section.",
            "example": "$SECTION_NAME"
        },
        "sectionid": {
            "prefix": "SECTION_ID",
            "description":
                "The $SESSION_ID variable reports the Speedware Autobahn session identification number.",
            "example": "$SESSION_ID"
        },
        "sqldynamicstatement": {
            "prefix": "SQLDYNSTATUS",
            "description":
                "The $SQLDYNSTATUS variable contains the status of an SQL dynamic statement.",
            "example": "$SQLDYNSTATUS"
        },
        "sqlerror": {
            "prefix": "SQLERROR",
            "description":
                "The $SQLERROR variable contains the status of the current SQL statement.",
            "example": "$SQLERROR"
        },
        "sum": {
            "prefix": "SUM",
            "description":
                "The $SUM variable contains the current cumulative total of a numeric item in a REPORT section.",
            "example": "AT event ,... DO statement $SUM ([NAME=] item)"
        },
        "takecount": {
            "prefix": "TAKE_COUNT",
            "description":
                "The $TAKE_COUNT variable returns the number of records in the take file.",
            "example": "$TAKE_COUNT"
        },
        "time": {
            "prefix": "TIME",
            "description":
                "The $TIME or $TIMES variable contains the current system time (hardware time).",
            "example": "$TIME   $TIMES"
        },
        "times": {
            "prefix": "TIMES",
            "description":
                "The $TIME or $TIMES variable contains the current system time (hardware time).",
            "example": "$TIME   $TIMES"
        },
        "title": {
            "prefix": "TITLE",
            "description":
                "The $TITLE variable contains the section or application title.",
            "example": "$TITLE ([SECT[ION]=] CURRENT|APPLICATION])"
        },
        "user": {
            "prefix": "USER",
            "description":
                "The $USER variable contains the name, and the $USERNO variable contains the level number of the current end user.",
            "example": "$USER    $USERNO"
        },
        "userno": {
            "prefix": "USERNO",
            "description":
                "The $USER variable contains the name, and the $USERNO variable contains the level number of the current end user.",
            "example": "$USER    $USERNO"
        },
        "version": {
            "prefix": "VERSION",
            "description":
                "The $VERSION variable contains the version number of the Speedware program running the application.",
            "example": "$VERSION"
        }
    };
    
}