const {
  app,
  dialog,
  BrowserWindow,
  desktopCapturer,
  ipcMain,
} = require("electron");
const path = require("path");
const { writeFile } = require("fs");

const createWindow = () => {
  // BrowserWindow

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    backgroundColor: "#15181E",
    show: false,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.maximize();
  win.show();
  win.webContents.openDevTools();

  // select screen recording source

  desktopCapturer.getSources({ types: ["window"] }).then((sources) => {
    for (const source of sources) {
      if (source.name === "mentor-studio") {
        win.webContents.send("CAPTURE_SOURCE", source);
        return;
      }
    }
  });

  // save recorded video

  ipcMain.handle("showSaveDialog", async (event, buffer) => {
    const { filePath } = await dialog.showSaveDialog(event.sender, {
      buttonLabel: "Save video",
      defaultPath: `vid-${Date.now()}.webm`,
    });

    if (filePath) {
      writeFile(filePath, buffer, () =>
        console.log("video saved successfully!")
      );
    }
  });
};

// electron reloader

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

// when ready

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
