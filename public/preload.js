// This file is injected into the browser context but can talk to node

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'ipc', {
        send: (channel, data) => {
            ipcRenderer.send(channel, data);
        },
        on: (channel, func) => {

            // simplify this, only one listner at a time
            ipcRenderer.removeAllListeners(channel);

            // Strip event as it includes `sender` and is a security risk
            ipcRenderer.on(channel, (event, ...args) => {
                func(...args);
            });
        },
    },
);

console.log('ipc loaded');