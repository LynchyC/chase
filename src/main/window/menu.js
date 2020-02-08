import { dialog, Menu } from "electron";
import { basename } from "path";

import watcher from "../watcher";

export default (window, isDev = false) => {
    const template = [{
        label: "File",
        submenu: [{
            label: "Open File",
            click: async () => {
                const { filePaths = [] } = await dialog.showOpenDialog(window, {
                    filters: [{
                        name: "Files",
                        filters: ["doc", "docx", "html", "htm", "odt", "pdf", "xls", "xlsx", "ods", "ppt", "pptx", "txt", "log"]
                    }],
                    title: "Open File",
                    properties: ["openFile"]
                });
                if (filePaths.length) {
                    const [file] = filePaths;
                    watcher.add(basename(file), file);
                }
            },
            accelerator: "CmdOrCtrl+O"
        }, {
            role: "close",
            accelerator: "CmdOrCtrl+Q"
        }]
    }, ...(isDev && [{
        label: "Developer",
        submenu: [{
            label: "Open Dev Tools",
            click: () => {
                if (window.webContents.isDevToolsOpened()) {
                    window.webContents.closeDevTools();
                } else {
                    window.webContents.openDevTools();
                }
            },
            accelerator: "CmdOrCtrl+Shift+F12"
        }, {
            label: "Force Reload",
            click: () => {
                window.reload();
            },
            accelerator: "CmdOrCtrl+Shift+R"
        }]
    }])];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
