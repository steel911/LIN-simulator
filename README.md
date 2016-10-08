# A LIN diagnostic Application

## Functions
LIN(Local Interconnect Network) is widely used in Automotives.
Our program offers a modern design GUI for LIN diagnostic & Simulation.
Currently, this Application only support our unique design lin-box.
We have further plan to support more general Arduino Develop Board.

## Set up Environment on Mac
Set up Environment on Mac is staight forword.
- Git clone or Download zip file
- Node.js v4.5.0+
    + npm version v2.15.9+

## Set up Environment on Windows PC
Set up Environment on Windows can be time comsuming.
- Git clone or Download zip file
- Visual Studio 2015 Community Verison with update 3 or higher
    + Select *Common Tools for Visual C++* during setup
- Node.js v4.5.0+
    + npm version v2.15.9+
- Update npm by npm-windows-upgrade
- Update node.js by nvm(Windows installer provided)

```bash
// open an elevated Powershell(Run as Administrator)
// install node-gyp
npm install -g node-gyp

// install npm-windows-upgrade
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
npm install --global --production npm-windows-upgrade

```

## Install Dependencies

```bash
// install node modules
npm install --save-dev electron
npm install --save-dev electron-prebuilt
npm install --save-dev serialport
npm install --save-dev mustache
sudo npm install --save-dev electron-rebuild
```

## Build Script

```bash
// rebuild node modules for Electron
sudo ./node_modules/.bin/electron-rebuild

// rebuild node modules for Electron(Windows)
.\node-modules\.bin\electron-rebuild.cmd

// Manully build node modules for Electron
// path/to/module
HOME=~/.electron-gyp node-gyp rebuild --target=1.3.3 --arch=x64 --dist-url=https://atom.io/download/atom-shell
```

## Run from Command Line
```bash
npm start
```