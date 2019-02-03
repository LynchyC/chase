import { join } from "path";
import { AppConstructorOptions, Application } from "spectron";

const electronPath: string = join(__dirname, "..", "..", "node_modules", ".bin", "electron");

describe("Application Launch", () => {

    beforeAll(async () => {
        this.app = new Application({
            args: [join(__dirname, "..", "..", "dist", "main.js")],
            path: electronPath,
        });
        return this.app.start();
    });

    afterAll(() => {
        if (this.app && this.app.isRunning()) {
          return this.app.stop();
        }
    });

    test("should open main window", async () => {
        const { client } = this.app;

        await client.waitUntilWindowLoaded();
        const count = await client.getWindowCount();
        expect(count).toBe(1);
    });

    test("should show title", async () => {
        const { client } = this.app;
        const title = await client.getTitle();
        return expect(title).toBe("Chase");
    });
});
