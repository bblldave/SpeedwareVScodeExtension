# SPEEDWARE README

This extension is to add support for the speedware programming language.

## Features

Syntax Highlighting is currently available.

Code snippets are in the works and should be available soon.


## Requirements
This extension will be activated on any file that has the .spw extension

## Extension Settings


## Known Issues


## Release Notes

You can customize your highlighting colors by looking at the speedware.tmLanguage.json file. Look for the "name" field for each type of match. This is what is used to color your keywords. You can use this by going to your VScode user settings and applying them to the scope of your custom textmate rules. This will change the color of these elements to your desired color. Example below:
```
    "editor.tokenColorCustomizations": {
       "textMateRules": [
           {
               "scope": "keyword.control.spw",
               "settings": {
                   "foreground": "#ff00dd"
               } 
           },
           {
               "scope": "constant.numeric.spw",
               "settings": {
                   "foreground": "#d66b06",
               }
           }
       ]
    }
```
   

### Version 0.0.1

Initial release of syntax highlighting

### Version 0.0.2

Added code snippets for basic if statements and for loops.
Updated database fields for better syntax highlighting. To access code snippets simply type if or for and view the snippets in the dropdown.

### Version 1.0.0
Updated language document to allow for better syntax highlighting.
Added comments to language document to explain what each pattern is used for
Added code snipper for line comments. Type lc and select the line comment dropdown

### Version 1.1.0
Added BEGIN and END highlighting to help identify blocks of code. Also implemented Jump to command. Shortcut keys are ALT + SHIFT + \
Added Hover feature for all speedware functions. Speedware variables do not support hover feature yet.
To customize BEGIN and END highlighting use the following in your settings:
```
    "speedware.style": {
        "borderWidth": "1px",
        "borderStyle": "none none solid none",
        "borderColor": "#00FF00",
        "color": "#00FF00"
    },
```

BEGIN and END matching was implemented based on the do...end Match extension

### Version 1.1.1
Added hover feature to Speedware variables

### Version 1.2.0
Added goToDefinition feature for speedware
Uset F12 key to open definition in a new window for use alt + F12 to peak defintions

### Version 1.2.3
Fixed bug that caused code block highlighter to crash and require a vscode restart
Fixed the for selected do begin snipped
Added a scope to single quoted strings. Now you should be able to change the color is desired
Updated code block highlighter

### Version 1.2.5
Fixed bug that caused code block highlighter to highlight keywords within comments
Fixed bug that prevented go to definition from working when a LOGIC program was changed to UTILITY by autobahn

-----------------------------------------------------------------------------------------------------------

