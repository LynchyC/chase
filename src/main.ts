import { FSWatcher } from "chokidar";
import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { join } from "path";
import { format } from "url";
import Watcher from "./watcher";

let mainWindow: Electron.BrowserWindow;
let watcher: Watcher = null;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      backgroundThrottling: false,
    },
  });

  // and load the index.html of the app.
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080");
  } else {
    mainWindow.loadURL(format({
      pathname: join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    }));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();

  watcher = new Watcher(new FSWatcher({
    ignored: /(^|[\/\\])\../,
  }), mainWindow);

  let template: Electron.MenuItemConstructorOptions[] = [{
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

  if (process.env.NODE_ENV === "development") {
    template = [...template, {
      label: "Developer",
      submenu: [{
        label: "Open Dev Tools",
        click() {
          mainWindow.webContents.openDevTools();
        },
        accelerator: "CmdOrCtrl+Shift+F12",
      }, {
        label: "Force Reload",
        click() {
          mainWindow.reload();
        },
        accelerator: "CmdOrCtrl+Shift+R",
      }],
    }];
  }

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

ipcMain.on("files:added", (e: Event, files: string | string[]) => {
  watcher.add(files);
});

ipcMain.on("files:unwatch", (e: Event, files: string | string[]) => {
  watcher.remove(files);
});
