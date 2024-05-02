import { assert } from "chai";

const baseUrl = "https://api-energy-k8s.test.virtaglobal.com/v1";

export const getVersion = async (station) => {
  const response = await fetch(`${baseUrl}/tests/${station}`, {
    method: "POST",
    body: JSON.stringify({ command: "getVersion" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  assert(
    response.status === 200,
    `Failed to get version: ${response.statusText}, code ${response.status}`
  );
  return await response.json();
};

export const getInterval = async (station) => {
  const response = await fetch(`${baseUrl}/tests/${station}`, {
    method: "POST",
    body: JSON.stringify({ command: "getInterval" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  assert(
    response.status === 200,
    `Failed to get interval: ${response.statusText}, code ${response.status}`
  );
  console.log("what");
  return await response.json();
};

export const setInterval = async (station, interval) => {
  const response = await fetch(`${baseUrl}/tests/${station}`, {
    method: "POST",
    body: JSON.stringify({ command: "setValues", payload: interval }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  assert(
    response.status === 200,
    `Failed to set interval: ${response.statusText}, code ${response.status}`
  );
  return await response.json();
};
