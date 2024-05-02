import { assert } from "chai";
import { getInterval, getVersion, setInterval } from "./api/virta-api.js";
import stations from "./data/stations.json" assert { type: "json" };
import { describe } from "mocha";
for (const station of stations) {
  describe(`Testing station ${station.id}`, () => {
    describe("Version API", () => {
      it("should return version", async () => {
        const res = await getVersion(station.id);
        // Check if version is returned or check for exact version if version specified for station in test data
        // this could be tested in multiple different ways depending on the requirements. This example implementation
        // would simply allow an exact version to be tested for some stations, while just any version is tested for others.
        if (station.version) {
          assert.equal(res.result, station.version, "Version missmatch");
        } else {
          assert.exists(res.result, "No version returned from API");
        }
      });
    });
    describe("Interval API", () => {
      let existingInterval;
      it("should return interval", async () => {
        const res = await getInterval(station.id);
        assert.exists(res.result, "No Interval returned from API");
        existingInterval = res.result;
      });
      it("should set interval", async () => {
        // Add 1 to existing interval so it does not match existing value
        const newInterval = existingInterval + 1;
        const setRes = await setInterval(station.id, newInterval);
        assert.equal(setRes.result, "OK", "Failed to set new interval");
        // Check if the interval is actually set correctly for the station
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
