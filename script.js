const root = document.querySelector(":root");
//* Labels
const lableTime = document.getElementById("time-left");
const lableSessionLength = document.getElementById("session-length");

//* Buttons
const btnStartStop = document.getElementById("start_stop");
const btnSessionIncrement = document.getElementById("session-increment");
const btnSessionDecrement = document.getElementById("session-decrement");
const btnReset = document.getElementById("reset");

//* Timer Variables
let timerOn = false;
let countdownInterval;

//* Default Timer Values
let orginalTime = 25;
let currentTime = 25;

//* EventListeners
// Reset Timer
btnReset.addEventListener("click", () => resetTimer());

// Updating session length
[btnSessionIncrement, btnSessionDecrement].forEach((btn) =>
  btn.addEventListener("click", () => sessionAdjustment(btn))
);
// Starting/Stopping Timer
btnStartStop.addEventListener("click", function (e) {
  timerOn = !timerOn;
  if (timerOn) {
    this.innerText = "stop";
    root.style.setProperty("--barColor", "lightgreen");
    return countdown();
  }
  this.innerText = "start";
  root.style.setProperty("--barColor", "lightcoral");
  clearInterval(countdownInterval);
});

// Main countdown functionality
function countdown() {
  let currentTimeSeconds = currentTime * 60;
  precentage(orginalTime, currentTime);
  currentTimeSeconds--;

  countdownInterval = setInterval(() => {
    let totalMinutes = currentTimeSeconds / 60;
    let outputMinutes = Math.floor(totalMinutes);
    let outputSeconds = Math.round((totalMinutes - outputMinutes) * 60);

    if (outputSeconds < 10) {
      outputSeconds = "0" + outputSeconds;
    }
    if (outputMinutes < 10) {
      outputMinutes = "0" + outputMinutes;
    }

    lableTime.innerText = `${outputMinutes}:${outputSeconds}`;
    currentTimeSeconds--;
    currentTime = totalMinutes;
    precentage(orginalTime, currentTime);
  }, 1000);
}

// Calculates percentage of time left and updates UI
function precentage(original, current) {
  const orginalTime = original;
  let precentage = Math.floor((current / orginalTime) * 100);
  root.style.setProperty("--percent", precentage);
}
// Increase Or Decrease Session time functionality
function sessionAdjustment(adjustmentType) {
  if (adjustmentType.id === "session-increment") {
    lableSessionLength.innerText = +lableSessionLength.innerText + 1;
  } else {
    lableSessionLength.innerText = +lableSessionLength.innerText - 1;
  }
  if (lableSessionLength.innerText < 0) {
    lableSessionLength.innerText = 0;
  }
  // Updating the timer values
  orginalTime = +lableSessionLength.innerText;
  currentTime = +lableSessionLength.innerText;
  return (lableTime.innerText = `${lableSessionLength.innerText}:00`);
}

function resetTimer() {
  timerOn = false;
  btnStartStop.innerText = "start";
  clearInterval(countdownInterval);
  orginalTime = 25;
  currentTime = 25;
  lableTime.innerText = `25:00`;
  lableSessionLength.innerText = "25";
  root.style.setProperty("--barColor", "rgb(233, 233, 233)");
}
