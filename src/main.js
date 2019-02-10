import { app, BrowserWindow, dialog, ipcMain, Menu } from "electron";
import { join } from "path";
import { format } from "url";
import Watcher from "./watcher";
const isDevelopment = process.env.NODE_ENV === "development" ? true : false;

let mainWindow;
let watcher;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minHeight: 515,
    minWidth: 465,
    webPreferences: {
      backgroundThrottling: false,
    },
  });

  watcher = new Watcher(mainWindow);

  // and load the index.html of the app.
  if (isDevelopment) {
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

  let template = [{
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

  if (isDevelopment) {
    template = [...template, {
      label: "Developer",
      submenu: [{
        label: "Open Dev Tools",
        click() {
          if (mainWindow.webContents.isDevToolsOpened()) {
            mainWindow.webContents.closeDevTools();
          } else {
            mainWindow.webContents.openDevTools();
          }
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

  const menu = Menu.buildFromTemplate(template);
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

ipcMain.on("file:added", (e, name, path) => {
  watcher.add(name, path);
});

ipcMain.on("file:removed", (e, id) => {
  watcher.remove(id);
});
