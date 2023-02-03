import { ipcMain } from 'electron';

import mysql from './generator/sources/MySql';
import io from './io';
import compile from './compile'

const appName = 'code-cutter'

// handle ipc from window
ipcMain.on('command', async function (event, data) {
    console.log('command', data)
    try {
        let result = null;
        let source = null;

        switch (data.source) {
        case 'mysql':
            source = mysql;
        }

        switch (data.command) {
            case 'getTables':
                result = await source.getTables(data.options);
                break

            case 'getColumns':
                result = await source.getColumns(data.options, data.table);
                break;

            case 'saveConnection':
                const fileName = await io.getPath(appName, 'connections', data.fileName)
                try{
                     await io.saveFile(fileName, data.content);
                     result = true
                } catch(e) {
                    throw new Error('Error saving file: ' + fileName);
                }
                break;

            case 'getConnection':
                try{
                    const fileName = await io.getPath(appName, 'connections', data.fileName)
                    result = await io.readFile(fileName);
                } catch(e) {
                    throw new Error('Error saving file: ' + fileName);
                }
                break;

            case 'getTemplates':
                try{
                    result = await io.listFiles(appName, 'templates')
                } catch(e) {
                    throw new Error('Error listing folder: templates' , e);
                }
                break;

            case 'getTemplate':
                try{
                    const fileName = await io.getPath(appName, 'templates', data.fileName)
                    result = await io.readFile(fileName);
                } catch(e) {
                    throw new Error('Error listing folder: templates' , fileName);
                }
                break;

            case 'readFile':
                try{
                    result = await io.readFile(data.fileName, 'utf-8');
                } catch(e) {
                    throw new Error('Error reading file: ' + data.fileName);
                }
                break;                

            case 'compile':
                result = await compile.compile(data.template, data.data);
                break;                 
        }

        console.log('result')
        console.log(result)
        event.sender.send('command', { __id: data.__id, result: result });
    } catch (e) {
        console.error(e)
        event.sender.send('command', { __id: data.__id, error: e.message });
    }
});