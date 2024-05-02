import { getInterval, getVersion, setInterval } from "./api/virta-api.js";
import stations from "./data/stations.json" assert { type: "json" };

(async () => {
  // Exploratory testing script that allows for rapid testing using "npm manual-test.js"
  for (const station of stations) {
    const res = await setInterval(station.id, 1);
    console.log(res);
  }
})();
