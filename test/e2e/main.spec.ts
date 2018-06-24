import { join } from "path";
import { AppConstructorOptions, Application } from "spectron";

const electronPath: string = join(__dirname, "..", "..", "node_modules", ".bin", "electron");
const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

describe("Application Launch", () => {

    let app: Application;
    beforeAll(async () => {

        const options: AppConstructorOptions = {
            args: [join(__dirname, "..", "..", "dist", "main.js")],
            path: electronPath,
        };

        app = new Application(options);
        return app.start();
    });

    afterAll(() => {
        if (app && app.isRunning()) {
          return app.stop();
        }
    });

    test("should open main window", async () => {
        const { client } = app;

        await client.waitUntilWindowLoaded();
        await delay(500);
        const count = await client.getWindowCount();
        expect(count).toBe(1);
    });

    test("should show title", async () => {
        const { client } = app;

        await client.waitUntilWindowLoaded();
        await delay(500);
        const title = await client.getTitle();
        return expect(title).toBe("Chase");
    });
});
