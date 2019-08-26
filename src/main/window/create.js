import { BrowserWindow } from "electron";
import { format } from "url";
import { join } from "path";

import watcher from "main/watcher";

export default (isDev = false) => {
    let window = new BrowserWindow({
        minHeight: 600,
        minWidth: 725,
        webPreferences: {
            backgroundThrottling: false,
            nodeIntegration: true
        }
    });

    watcher.initialize(window);
    const url = isDev ? "http://localhost:8080" : format({
        pathname: join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    });

    window.loadURL(url);
    window.on("closed", () => {
        window = null;
    });

    return window;
}
