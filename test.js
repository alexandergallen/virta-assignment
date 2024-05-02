import { assert } from "chai";
import { getInterval, getVersion, setInterval } from "./api/virta-api.js";
import stations from "./data/stations.json" assert { type: "json" };
import { describe } from "mocha";
for (const station of stations) {
  describe(`Testing station ${station.id}`, () => {
    describe("Version API", () => {
      it("should return version", async () => {
        const res = await getVersion(station.id);
        assert.equal(res.result, station.version, "Version missmatch");
      });
    });
    describe("Interval API", () => {
      let existingInterval;
      let newInterval;
      it("should return interval", async () => {
        const res = await getInterval(station.id);
        assert.exists(res.result, "Interval doesn't exist");
        existingInterval = res.result;
      });
      // Set interval
      it("should set interval", async () => {
        newInterval = existingInterval + 1;
        const setRes = await setInterval(station.id, newInterval);
        console.log("setRes", setRes);
        assert.equal(setRes.result, "OK", "Failed to set new interval");
        const getRes = await getInterval(station.id);
        assert.equal(
          getRes.result,
          newInterval,
          "Interval missmatch, interval did not update properly"
        );
      });
    });
  });
}
