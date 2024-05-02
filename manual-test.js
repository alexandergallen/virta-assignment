import { getInterval, getVersion, setInterval } from "./api/virta-api.js";
import stations from "./data/stations.json" assert { type: "json" };

(async () => {
  for (const station of stations) {
    const res = await setInterval(station.id, 1);
    console.log(res);
  }
})();
