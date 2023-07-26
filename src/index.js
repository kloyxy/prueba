const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let win;

const { Client } = require('discord-rpc');
const clientId = '1133144934849990726';

function createWindow() {
  win = new BrowserWindow({
    icon: path.join('build/icon.ico'),
    width: 500,
    height: 650,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, '/js/update.js'),
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
      //devTools: false
    },
    resizable: false
  })
  win.loadFile(__dirname + '/html/main.html')

  ipcMain.on('minimizeApp',(event, data) => {
    win.minimize();
  })

  ipcMain.on('closeApp',(event, data) => {
    win.close();
  })
}

const rpc = new Client({ transport: 'ipc'});

autoUpdater.on("checking-for-update", () => {
  log.info("Buscando actualizaciones...")
})

autoUpdater.on("update-available", (info) => {
  log.info("Actualizacion Encontrada!")
})

autoUpdater.on("update-not-available", (info) => {
  log.info("No hay actualizacion!")
})

autoUpdater.on("error", () => {
  log.info("X Error en AutoUpdater X" + err)
})

autoUpdater.on("download-progress", (progressTrack) => {
  log.info("\nDescarga en proceso..")
  log.info(progressTrack)
})

autoUpdater.on("update-downloaded", (info) => {
  log.info("Actualizacion Terminada!")
})

rpc.on('ready', () => {
  console.log('> DISCORD RPC CONNECTED');
  rpc.setActivity({
    details: 'Esperando en el Launcher',
    startTimestamp: new Date(),
    largeImageKey: 'logoff',
    largeImageText: 'Octopus Launcher',
    instance: true
  });
});

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify()
});

rpc.login({ clientId }).catch(console.error);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});