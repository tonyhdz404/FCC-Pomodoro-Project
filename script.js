const lableTime = document.getElementById("time-left");

let sessionTimeMinutes = 25;
// 1) Convert to secouds
let time = sessionTimeMinutes * 60;
time--;
setInterval(() => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor((time / 60 - Math.floor(time / 60)) * 60);
  //   console.log(`${minutes}:${seconds}`);
  lableTime.innerText = `${minutes}:${seconds}`;
  time--;
}, 1000);
