import { join } from "path";
import { AppConstructorOptions, Application } from "spectron";

const electronPath: string = join(__dirname, "..", "node_modules", ".bin", "electron");

export const before = function() {
    this.timeout(10000);

    const options: AppConstructorOptions = {
        args: ["./dist/main.js"],
        path: electronPath,
        startTimeout: 10000,
        waitTimeout: 10000,
    };

    this.app = new Application(options);
    return this.app.start();
};

export const after = function() {
    this.timeout(10000);
    if (this.app && this.app.isRunning()) {
        return this.app.stop();
    }
};
