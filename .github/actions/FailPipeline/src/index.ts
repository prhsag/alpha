import { setFailed } from "@actions/core";

const probabilityOfFailure = 0.9; // 90% failure rate

function getRandomResult() {
  const randomValue = Math.random();
  if (randomValue < probabilityOfFailure) {
    return "NOGO";
  } else {
    return "GO";
  }
}

const result = getRandomResult();

if (result === "NOGO") {
  setFailed("The result is NOGO. Failing Pipeline")
} else {
  console.log("Pipeline succeeded.");
}
