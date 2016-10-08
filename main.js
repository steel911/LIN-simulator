'use strict'
/*jslint esversion: 6*/
/*jslint node: true */

const electron = require('electron');

// Module to control application's life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;

/* Keep a global reference of the window object, if you don't, the
window will be closed automatically when the JavaScript object is
garbage collected.*/
let mainWindow;
let appIcon;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow(
                                  {
                                    width: 1280,
                                    height: 800,
                                    frame: false,
                                    resizable: false,
                                    show: false
                                });

    // And load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        /*Dereference the window objet, usually you would store windows
        in an array if your app supports multi windows, this is the time
        when you should delete the corresponding element.*/
        mainWindow = null;
        app.quit();
    });

    mainWindow.show();
}

function createTray() {

}

function createMenu() {

}

/* This method will be called when Electron has finished initialization
and is ready to create browser windows.*/
app.on('ready', () => {
    createWindow();
    createTray();
});

app.on('window-all-closed', () => {
    /* On macOS it is common for applications and their menu bar to
    stay active until the user quits explicitly with CMD + Q */
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    /* On macOS it is common for application and their menu bar to stay
    active until the user quits explicitly with CMD + Q */
    if(mainWindow === null) {
        createWindow();
    }
});
