const root = document.querySelector(":root");
//* Labels
const labelMain = document.getElementById("timer-label");
const labelTime = document.getElementById("time-left");
const labelSessionLength = document.getElementById("session-length");
const labelBreakLength = document.getElementById("break-length");

//* Buttons
const btnStartStop = document.getElementById("start_stop");
const btnReset = document.getElementById("reset");
const btnSessionIncrement = document.getElementById("session-increment");
const btnSessionDecrement = document.getElementById("session-decrement");

const btnBreakIncrement = document.getElementById("break-increment");
const btnBreakDecrement = document.getElementById("break-decrement");

//* Timer Variables
let timerOn = false;
let countdownInterval;

//* Default Timer Values
let orginalSessionTime = 0.15;
let currentSessionTime = 0.15;
let orginalBreakTime = 5;
let currentBreakTime = 5;

//* EventListeners
// Reset Timer
btnReset.addEventListener("click", () => resetTimer());

// Updating session length
[btnSessionIncrement, btnSessionDecrement].forEach((btn) =>
  btn.addEventListener("click", () => {
    const btnType = btn.classList.contains("btn--increment");
    adjustTime(btnType, labelSessionLength);
  })
);
[btnBreakIncrement, btnBreakDecrement].forEach((btn) =>
  btn.addEventListener("click", () => {
    const btnType = btn.classList.contains("btn--increment");
    adjustTime(btnType, labelBreakLength);
  })
);
// Starting/Stopping Timer
btnStartStop.addEventListener("click", function (e) {
  timerOn = !timerOn;
  if (timerOn) {
    this.innerText = "stop";
    root.style.setProperty("--barColor", "lightgreen");
    console.log(orginalSessionTime, currentSessionTime);
    return countdown(orginalSessionTime, currentSessionTime);
  }
  this.innerText = "start";
  root.style.setProperty("--barColor", "lightcoral");
  clearInterval(countdownInterval);
});

//TODO Main countdown functionality
function countdown(orginalTime, currentTime, countdownType = "typeSession") {
  let currentTimeSeconds = currentTime * 60;
  precentage(orginalTime, currentTime);
  currentTimeSeconds--;

  countdownInterval = setInterval(() => {
    console.log(currentTimeSeconds);
    if (currentTimeSeconds === 0) {
      if (countdownType === "typeSession") {
        labelMain.innerText = "Break";
      }
      if (countdownType === "typeBreak") {
        labelMain.innerText = "Session";
      }
      clearInterval(countdownInterval);
      labelTime.innerText = `${orginalBreakTime}:00`;
      return countdown(orginalBreakTime, currentBreakTime, "typeBreak");
    }
    let totalMinutes = currentTimeSeconds / 60;
    let outputMinutes = Math.floor(totalMinutes);
    let outputSeconds = Math.round((totalMinutes - outputMinutes) * 60);
    if (outputSeconds < 10) {
      outputSeconds = "0" + outputSeconds;
    }
    if (outputMinutes < 10) {
      outputMinutes = "0" + outputMinutes;
    }

    labelTime.innerText = `${outputMinutes}:${outputSeconds}`;
    currentTimeSeconds--;

    if ((countdownType = "typeSession")) {
      currentSessionTime = totalMinutes;
    }
    if ((countdownType = "typeBreak")) {
      currentBreakTime = totalMinutes;
    }
    precentage(orginalTime, totalMinutes);
  }, 1000);
}

// Calculates percentage of time left and updates UI
function precentage(original, current) {
  const orginalTime = original;
  let precentage = Math.floor((current / orginalTime) * 100);
  root.style.setProperty("--percent", precentage);
}
// Increase Or Decrease Session time functionality
function adjustTime(btnType, label) {
  if (btnType) {
    label.innerText = +label.innerText + 1;
  } else {
    label.innerText = +label.innerText - 1;
  }
  if (label.innerText <= 0) {
    label.innerText = 1;
  }
  if (label.innerText >= 60) {
    label.innerText = 60;
  }
  // Updating the timer values
  if (label === labelSessionLength) {
    orginalSessionTime = +label.innerText;
    currentSessionTime = +label.innerText;
    return (labelTime.innerText = `${label.innerText}:00`);
  }
  if (label === labelBreakLength) {
    orginalBreakTime = +label.innerText;
    currentBreakTime = +label.innerText;
    return;
  }
}

function resetTimer() {
  timerOn = false;
  btnStartStop.innerText = "start";
  clearInterval(countdownInterval);
  orginalTime = 25;
  currentTime = 25;
  orginalBreakTime = 5;
  currentBreakTime = 5;
  labelTime.innerText = `25:00`;
  labelSessionLength.innerText = "25";
  labelBreakLength.innerText = "5";
  labelMain.innerText = "Session";
  root.style.setProperty("--barColor", "rgb(233, 233, 233)");
}
