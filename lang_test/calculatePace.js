// soll die pace für eine beliebige Streckenlänge und Dauer ausgeben

/*
  params:
    distance (float) : distance
    time (String) : Time in Format "hh:mm:ss"

  returns:
    pace (String) : pace in "mm:ss"
*/
const calcPace = ((distance,time) => {
  //time = time.toString();
  let timeArray = time.split(":");
  let hours = parseInt(timeArray[0]);
  let minutes = parseInt(timeArray[1]);
  let seconds = parseInt(timeArray[2]);
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  let paceInSeconds = totalSeconds / distance;
  let paceMinutes = Math.floor((paceInSeconds / 60));
  let paceSeconds = Math.round(paceInSeconds % 60);
  //let paceSeconds = paceInSeconds % 60;
  let pace = paceMinutes+":"+paceSeconds
  //let minutes = Math.floor(time);
  //let seconds = time % 1 * 100;
  //return {length, hours, minutes, seconds, totalSeconds, paceInSeconds, paceMinutes, paceSeconds, pace}
  return pace;
});

const distance = 5.75
const time = "00:20:29"
console.log(calcPace(distance,time));
