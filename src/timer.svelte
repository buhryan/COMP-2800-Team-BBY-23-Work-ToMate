<script>
  //source: https://www.barbarianmeetscoding.com/blog/2020/01/04/discovering-svelte-creating-a-pomodoro-timer
  //learn svelte: create a pomodoro timer
  var workTimer;
  var breakTimer;
  let doneSet = {
    timeInput: false
  };
  var repeatTime;
  var workPeriod;
  const minutesToSeconds = minutes => minutes * 60;
  const secondsToMinutes = seconds => Math.floor(seconds / 60);
  const padWithZeroes = number => number.toString().padStart(2, "0");
  const State = {
    idle: "idle",
    inProgress: "in progress",
    resting: "resting"
  };
  let currentState = State.idle;
  let interval;
  let completed = 0;
  var SHORT_BREAK_S;
  let workMin;

  function setTimer() {
    workTimer = document.getElementById("workInput").value;
    breakTimer = document.getElementById("breakInput").value;
    repeatTime = document.getElementById("repeat").value;
    workMin = minutesToSeconds(workTimer);
    SHORT_BREAK_S = minutesToSeconds(breakTimer);
    console.log(workMin);

    workPeriod = workMin;
    console.log(workPeriod);

    doneSet.timeInput = !doneSet.timeInput;
  }

  function formatTime(timeInSeconds) {
    const minutes = secondsToMinutes(timeInSeconds);
    const remainingSeconds = timeInSeconds % 60;
    return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
  }

  function startTimer() {
    currentState !== State.idle;
    if (repeatTime == "null") {
      console.log("in no repeat");
      document.getElementById("noRepeat").style.display = "inline";
    } else {
      document.getElementById("noRepeat").style.display = "none";
      document.getElementById("afterWork").style.display = "none";
      document.getElementById("afterBreak").style.display = "none";
      currentState = State.inProgress;
      interval = setInterval(() => {
        if (workPeriod === 0) {
          document.getElementById("workDone").play();
          //let msg = document.getElementById("after").innerHTML= "Timer Done";
          document.getElementById("afterWork").style.display = "inline";
          // window.alert("done");
        }
        workPeriod -= 1;
      }, 1000);
    }
  }
  function workPause() {
    document.getElementById("workDone").pause();
    document.getElementById("afterWork").style.display = "none";
    completeTimer();
  }
  function breakPause() {
    console.log("hi");
    document.getElementById("breakDone").pause();
    document.getElementById("afterBreak").style.display = "none";
    console.log(completed);
    idle();
  }

  function completeTimer() {
    clearInterval(interval);
    completed++;
    if (completed == repeatTime) {
      document.getElementById("cycle").style.display = "inline";
      document.getElementById("allDone").style.display = "none";
      completed = 0;
    } else {
      rest(SHORT_BREAK_S);
    }
  }
  function rest(time) {
    currentState = State.resting;
    workPeriod = time;
    interval = setInterval(() => {
      if (workPeriod === 0) {
        document.getElementById("breakDone").play();
        document.getElementById("afterBreak").style.display = "inline";
      }
      workPeriod -= 1;
    }, 1000);
  }
  function cancelTimer() {
    if (document.getElementById("afterBreak").style.display == "inline") {
      document.getElementById("afterBreak").style.display = "none";
    }
    if ((document.getElementById("afterWork").style.display = "inline")) {
      document.getElementById("afterWork").style.display = "none";
    }

    document.getElementById("breakDone").pause();
    document.getElementById("workDone").pause();
    currentState = State.idle;
    clearInterval(interval);
    workPeriod = workMin;
  }
  function idle() {
    currentState = State.idle;
    clearInterval(interval);
    workPeriod = workMin;
    startTimer();
  }
</script>

<style>
  button {
    border: none;
  }
  #afterWork {
    display: none;
    margin: 20px;
  }

  #afterBreak {
    display: none;
    margin: 20px;
  }

  #startTime {
    background-color: #ee8152;
    color: #f7eac5;
    border-radius: 7px;
    margin: 20px;
  }

  #cancelTime {
    background-color: #af7089;
    color: #f7eac5;
    border-radius: 7px;
    margin: 20px;
  }

  #pauseWork {
    background-color: #ec6d6d;
    color: #f7eac5;
    border-radius: 7px;
    margin: 20px;
  }

  #pauseBreak {
    background-color: #ec6d6d;
    color: #f7eac5;
    border-radius: 7px;
    margin: 20px;
  }

  h1 {
    color: #900c3f;
    margin: 20px;
  }
  #cycle {
    display: none;
    margin: 20px;
  }

  #setBtn {
    background-color: #eeb089;
    border-radius: 7px;
    margin: 10px;
    width: 20%;
  }

  #noRepeat {
    display: none;
  }

  main {
    background-color: #f7eac5;
    text-align: center;
    padding: 50px;
    height: 100%;
  }

  input {
    width: 20%;
  }
  p {
    font-family: arial;
  }
  nav {
    background-color: rgb(247, 177, 27);
    border: 2px black solid;
    padding-top: 1%;
    padding-bottom: 1%;
    margin: 0;
  }
  @media (min-width: 1025px) {
    #navItem {
      font-size: 2vw;
      margin-right: 2%;
      width: 10%;
    }
  }
  @media (max-width: 1024px) and (min-width: 401px) {
    #navItem {
      font-size: 3.5vw;
      margin-right: 1%;
      width: 10%;
    }
  }
  @media (max-width: 400px) {
    #navItem {
      font-size: 3vw;
      margin-right: 1%;
      width: 10%;
    }
  }
</style>

<nav>
  <a href="/home" id="navItem">Home</a>
  <a href="/timer" id="navItem">Start a Timer</a>
  <a href="/task-Lists" id="navItem">Task Lists</a>
  <a href="/team" id="navItem">Team</a>
  <a href="/friends" id="navItem">Friends</a>
  <a href="/about-Us" id="navItem">About us</a>
</nav>

<main>

  <p>
    Work Time:
    <input id="workInput" type="number" pattern="[0-9]{2}" />
    Minutes
  </p>
  <p>
    Break Time:
    <input id="breakInput" type="number" pattern="[0-9{2}" />
    Minutes
  </p>
  <!-- <button on:click={setTimer}>Submit</button> -->
  <select id="repeat">
    <option value="null">Timer repeatition</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
  <br />
  <button id="setBtn" on:click={setTimer}>Set</button>
  {#if doneSet.timeInput}
    <footer>
      <div id="allDone">
        <button id="startTime" on:click={startTimer}>Start</button>
        <button id="cancelTime" on:click={cancelTimer}>Cancel</button>
      </div>
      <h1>{formatTime(workPeriod)}</h1>
      <div id="afterWork">
        <h2>Work Period Done.</h2>
        <button id="pauseWork" on:click={workPause}>
          Pause Sound and Take a Break
        </button>
      </div>
      <div id="afterBreak">
        <h2>Break time is over, time to get back to work.</h2>
        <button id="pauseBreak" on:click={breakPause}>
          Pause Sound and Start Working
        </button>
      </div>
      <div id="cycle">
        <h2>Cycle Done!</h2>
      </div>
      <div id="noRepeat">
        <h2>Please select repetition time.</h2>
      </div>
      <!--src: https://notificationsounds.com/notification-sounds-->
      <audio id="workDone" src={'lovingly.mp3'} />
      <audio
        id="breakDone"
        src="https://files4.mytinyphone.com/file.php?fileringID=3875238&type=ringt&rtype=play" />

    </footer>
  {/if}
</main>
