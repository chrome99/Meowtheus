const MEOW_API_URL = "http://localhost:3000";
const meowingInterval = 5000;

function sendMeowRequest() {
  return fetch(`${MEOW_API_URL}/meow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      catId: "fluffy",
      timestamp: new Date().toISOString(),
    }),
  });
}

function main() {
  setInterval(async () => {
    try {
      console.log("Meowing a meow...");
      const res = await sendMeowRequest();
      console.log(`[${res.status}] ${res.statusText}`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }, meowingInterval);
}

main();
