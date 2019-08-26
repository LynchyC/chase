import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from "electron";
import { basename, join } from "path";
import { format } from "url";
import watcher from "main/watcher";

const isDevelopment = process.env.NODE_ENV === "development";

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        minHeight: 600,
        minWidth: 725,
        webPreferences: {
            backgroundThrottling: false,
            nodeIntegration: true
        }
    });

    watcher.initialize(mainWindow);
    const url = isDevelopment ? "http://localhost:8080" : format({
        pathname: join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    });

    mainWindow.loadURL(url);
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
                    filters: [{
                        name: "Files",
                        filters: ["doc", "docx", "html", "htm", "odt", "pdf", "xls", "xlsx", "ods", "ppt", "pptx", "txt", "log"]
                    }],
                    title: "Open File",
                    properties: ["openFile"]
                }, (files = []) => {
                    if (files.length) {
                        const [file] = files;
                        watcher.add(basename(file), file);
                    }
                });
            },
            accelerator: "CmdOrCtrl+O"
        }, {
            role: "close",
            accelerator: "CmdOrCtrl+Q"
        }]
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
                accelerator: "CmdOrCtrl+Shift+F12"
            }, {
                label: "Force Reload",
                click() {
                    mainWindow.reload();
                },
                accelerator: "CmdOrCtrl+Shift+R"
            }]
        }];
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

app.on("window-all-closed", () => {
    app.quit();
});

app.on("quit", () => {
    watcher.end();
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

ipcMain.on("file:open-in-explorer", (e, id) => {
    const { path } = watcher.getFile(id);
    shell.showItemInFolder(path);
});
