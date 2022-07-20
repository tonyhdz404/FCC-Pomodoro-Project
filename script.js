const root = document.querySelector(":root");
const audio = document.getElementById("beep");
const defaultColor = "#fdfce5";
const breakColor = "#82DBD8";
const breakBarColor = "#3BACB6";
const pauseColor = "lightcoral";
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

//* Default Timer Values
let timerOn = false;
let countdownInterval;
let orginalSessionTime = 25;
let currentSessionTime = 25;
let orginalBreakTime = 5;
let currentBreakTime = 5;
let sessionType = "typeSession";

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

    if (sessionType === "typeSession") {
      labelMain.innerText = "session";
      root.style.setProperty("--barColor", "lightgreen");
      root.style.setProperty("--mainBGC", "#D9F8C4");
      return countdown(orginalSessionTime, currentSessionTime, "typeSession");
    } else {
      labelMain.innerText = "break";
      root.style.setProperty("--barColor", breakBarColor);
      root.style.setProperty("--mainBGC", breakColor);
      return countdown(orginalBreakTime, currentBreakTime, "typeBreak");
    }
  }

  this.innerText = "start";
  root.style.setProperty("--barColor", pauseColor);
  root.style.setProperty("--mainBGC", pauseColor);
  clearInterval(countdownInterval);
  if (sessionType === "typeSession") {
    labelMain.innerText = "Session Paused";
  } else {
    labelMain.innerText = "Break Paused";
  }
});

//TODO Main countdown functionality
function countdown(orginalTime, currentTime, countdownType = "typeSession") {
  sessionType = countdownType;
  let currentTimeSeconds = currentTime * 60;
  precentage(orginalTime, currentTime);
  currentTimeSeconds--;

  countdownInterval = setInterval(() => {
    if (currentTimeSeconds < 0) {
      audio.play();
      // Stopping the current countdown timer
      clearInterval(countdownInterval);
      // Checking what session type we are CURRENTLY on and Reset current time
      if (countdownType === "typeSession") {
        labelMain.innerText = "break";
        currentBreakTime = orginalBreakTime;
        labelTime.innerText = `${
          orginalBreakTime < 10 ? "0" : ""
        }${orginalBreakTime}:00`;
        root.style.setProperty("--barColor", breakBarColor);
        root.style.setProperty("--mainBGC", breakColor);
        return countdown(orginalBreakTime, currentBreakTime, "typeBreak");
      }
      if (countdownType === "typeBreak") {
        labelMain.innerText = "session";
        currentSessionTime = orginalSessionTime;
        labelTime.innerText = `${
          orginalSessionTime < 10 ? "0" : ""
        }${orginalSessionTime}:00`;
        root.style.setProperty("--barColor", "lightgreen");
        root.style.setProperty("--mainBGC", "#D9F8C4");
        return countdown(orginalSessionTime, currentSessionTime, "typeSession");
      }
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

    if (countdownType === "typeSession") {
      currentSessionTime = totalMinutes;
    }
    if (countdownType === "typeBreak") {
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
    return (labelTime.innerText = `${label.innerText < 10 ? "0" : ""}${
      label.innerText
    }:00`);
  }
  if (label === labelBreakLength) {
    orginalBreakTime = +label.innerText;
    currentBreakTime = +label.innerText;
    return;
  }
}

function resetTimer() {
  audio.pause();
  audio.currentTime = 0;
  timerOn = false;
  btnStartStop.innerText = "start";
  clearInterval(countdownInterval);
  orginalSessionTime = 25;
  currentSessionTime = 25;
  orginalBreakTime = 5;
  currentBreakTime = 5;
  sessionType = "typeSession";
  labelTime.innerText = `25:00`;
  labelSessionLength.innerText = "25";
  labelBreakLength.innerText = "5";
  labelMain.innerText = "session";
  root.style.setProperty("--barColor", "rgb(233, 233, 233)");
  root.style.setProperty("--mainBGC", defaultColor);
}
