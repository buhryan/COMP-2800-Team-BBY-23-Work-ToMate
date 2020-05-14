<nav>
  <a href="/home">Home</a>
  <a href="/timer">Start a Timer</a>
  <a href="/task-Lists">Task Lists</a>
  <a href="/team">Team</a>
  <a href="/friends">Friends</a>
  <a href="/about-Us">About us</a>
</nav>
<script>
  let workPeriod = 0;
  //  function notification(){
	// let time = document.getElementById("min").value;
  //   return time;
  //   }



  // var showTimer;
  // showTimer.outerHTML = "<p>Working period:{formatTime(workPeriod)}";
  // document.body.appendChild(showTimer);
  const minutesToSeconds = (minutes) => minutes * 60;
  const secondsToMinutes = (seconds) => Math.floor(seconds / 60);
  const padWithZeroes = (number) => number.toString().padStart(2, '0');

  const workMin = minutesToSeconds(.1);
  const LONG_BREAK_S = minutesToSeconds(20);
  const SHORT_BREAK_S = minutesToSeconds(5);

   workPeriod = workMin;
  let completedTimer = 0;
  let interval ;


  function formatTime(timeInSeconds) { 
    const minutes = secondsToMinutes(timeInSeconds);  
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }
 

  function startTimer() { 
    interval = setInterval(() => {
      if (workPeriod === 0) {
var x = document.getElementById("noti");
x.play();
        window.alert('Timer Done!');
        completeTimer();
      }
      workPeriod -= 1;
    },1000);
  }

  function pause(){
    x.pause();
  }

  function completeTimer(){
    clearInterval(interval);
    completedTimer++;
    if (completedTimer === 4) {
      rest(LONG_BREAK_S);
      completedTimer = 0;
    } else {
      rest(SHORT_BREAK_S);
    }
  }

  function rest(time){
    workPeriod = time;
    interval = setInterval(() => {
      if (workPeriod === 0) {
        idle();
      }
      workPeriod -= 1;
    },1000);
  }

  function idle(){
    clearInterval(interval);
    workPeriod = workMin;
  }
  // var showProgress = document.createElement("progress").setAttribute("value","{formatTime(workPeriod)}");
  //     document.body.append(showProgress);
  

</script>
<style>
  	progress {
		display: block;
		width: 100%;
	}
</style>



<section>
  <h1>Timer</h1>

<p>{formatTime(workPeriod)}</p>
<button on:click={startTimer}>Start</button>
<audio id="noti" src="https://notificationsounds.com/wake-up-tones/lovingly-618"></audio>
<button on:click={pause}>Pause Sound</button>


  <footer>
 
  </footer>
</section>