'use strict';
import * as path from 'path';
import { SpwHoverProvider } from './hover/spwHoverProvider';
import { SpwDefinitionProvider } from './goToDefinition/spwDefinitionProvider';
import { CodeBlockParser } from './codeBlockHighlighter/codeBlockParser';
import { CodeBlockParseController } from './codeBlockHighlighter/codeBlockParseController';
import {
    workspace, 
    ExtensionContext,
    DocumentSelector,
    window,
    commands,
    languages 
} from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext): void{

    let docType : DocumentSelector = 'speedware';
    let activeEditor = window.activeTextEditor;
    let codeBlockParser = new CodeBlockParser();
    let codeBlockParseController = new CodeBlockParseController(codeBlockParser);
    let jump = commands.registerCommand("extension.jump", () => {
        codeBlockParser.jump();
    });

    if(!activeEditor || !activeEditor.document) {
        return;
    }

    const serverModule = context.asAbsolutePath(
        path.join('server', 'out', 'server.js')
    );

    const serverOptions: ServerOptions = {
        run: {module: serverModule, transport: TransportKind.ipc},
        debug: {module: serverModule, transport: TransportKind.ipc}
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{scheme: 'file', language: 'speedware'}],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        }
    };

    client = new LanguageClient(
        'languageServer',
        'Language Server',
        serverOptions,
        clientOptions
    );

    context.subscriptions.push(languages.registerHoverProvider(docType, new SpwHoverProvider()));
    context.subscriptions.push(languages.registerDefinitionProvider(docType, new SpwDefinitionProvider()));
    context.subscriptions.push(codeBlockParser);
    context.subscriptions.push(codeBlockParseController);
    context.subscriptions.push(jump);
    console.log("starting");
    client.start();
}

export function deativate(): Thenable<void> | undefined {
    console.log("deactivate");
    if (!client) {
        return undefined;
    }
    return client.stop();
}