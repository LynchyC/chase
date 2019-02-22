import { join } from "path";
import { Application } from "spectron";

const electronPath = join(__dirname, "..", "..", "node_modules", ".bin", "electron");

describe("Application Launch", () => {

    let app;
    beforeAll(async () => {
        app = new Application({
            args: [join(__dirname, "..", "..", "dist", "main.js")],
            path: electronPath,
        });
        return app.start();
    });

    afterAll(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    test("should open main window", async () => {
        const {client} = app;

        await client.waitUntilWindowLoaded();
        const count = await client.getWindowCount();
        expect(count).toBe(1);
    });

    test("should show title", async () => {
        const {client} = app;
        const title = await client.getTitle();
        return expect(title).toBe("Chase");
    });
});
