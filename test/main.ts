import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { after, before } from "./utils";

chai.should();
chai.use(chaiAsPromised);

describe("Application Launch", (): void => {

    beforeEach(before);

    afterEach(after);

    it("should open main window", function() {
        return this.app.client.waitUntilWindowLoaded()
            .getWindowCount().should.eventually.equal(1);
    });

    it("should show title", function() {
        return this.app.client.waitUntilWindowLoaded()
            .getTitle().should.eventually.equal("Chase");
    });
});
