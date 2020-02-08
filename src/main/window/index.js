import { app } from "electron";

import watcher from "../watcher";
import registerMenu from "./menu";
import create from "./create";

const isDev = process.env.NODE_ENV === "development";
let window;

const activate = () => {
    if (window === null) {
        window = create(isDev);
    }
};

const quit = () => {
    watcher.end();
};

const ready = () => {
    window = create(isDev);
    registerMenu(window, isDev);
};

const windowAllClosed = () => {
    app.quit();
};

export default () => {
    app.on("activate", activate);
    app.on("quit", quit);
    app.on("ready", ready); // Event invokes first
    app.on("window-all-closed", windowAllClosed);
}
