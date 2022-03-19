const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      backgroundColor: '#15181E',
      show: false,
      webPreferences: {
        nodeIntegration: true,
        worldSafeExecuteJavaScript: true,
        contextIsolation: false,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.loadFile('index.html');
    win.maximize();
    win.show();
    win.webContents.openDevTools()
  }

  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })

  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
  })

