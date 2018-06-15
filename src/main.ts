import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { join } from "path";
import { format } from "url";

let mainWindow: Electron.BrowserWindow;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      backgroundThrottling: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(format({
    pathname: join(__dirname, "index.html"),
    protocol: "file",
    slashes: true,
  }));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();

  const template: Electron.MenuItemConstructorOptions[] = [{
    label: "File",
    submenu: [{
      label: "Open File",
      click: () => {
        dialog.showOpenDialog(mainWindow, {
          title: "Open File",
          properties: ["openFile"],
        });
      },
      accelerator: "CmdOrCtrl+O",
    }, {
      role: "close",
      accelerator: "CmdOrCtrl+Q",
    }],
  }];

  const menu: Electron.Menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
