const MEOW_API_URL = "http://localhost:3000";

const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 10000;

const cats = ["fluffy", "mittens", "whiskers"];

function getRandomInterval() {
  return (
    Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL
  );
}

function sendMeowRequest(catId: string) {
  return fetch(`${MEOW_API_URL}/meow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      catId,
      timestamp: new Date().toISOString(),
    }),
  });
}

function startMeowing(catId: string) {
  async function meow() {
    try {
      const res = await sendMeowRequest(catId);
      console.log(`${catId}: [${res.status}] Successfully meowed`);
    } catch (err: any) {
      console.log(`${catId} error: ${err.message}`);
    }
    scheduleNextMeow();
  }

  function scheduleNextMeow() {
    setTimeout(meow, getRandomInterval());
  }

  scheduleNextMeow();
}

function main() {
  cats.forEach(startMeowing);
}

main();
