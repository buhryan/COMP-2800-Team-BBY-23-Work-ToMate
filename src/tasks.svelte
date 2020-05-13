<script>
  import { db } from "./firebase.js";
  let tasks = [];
  let userid;
  // Needs this for User login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        // Goes to collection users / unique user id doc / Task-Lists collection / doc of whatever the previous button id
        // was / collection Tasks / then taks all the Tasks in there.
        db.collection("users")
          .doc(userid)
          .collection("Task-Lists")
          .doc(localStorage.getItem("listName"))
          .collection("Tasks")
          .onSnapshot(snapshot => {
            tasks = snapshot.docs;
          });
        console.log(tasks);
      }
    } else {
      // No user is signed in.
    }
  });
  function storeID() {
    localStorage.setItem("taskName", this.id);
  }
  console;
</script>

<style>
  #list {
    border: 2px black solid;
    background-color: #ffa032;
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
    .listItem {
      width: 80%;
      background-color: #ffc078;
      margin-right: 10%;
      margin-left: 10%;
      margin-bottom: 5%;
      padding: 0px;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 300;
      text-align: center;
    }
    #addTask {
      position: relative;
      width: 30%;
      height: 25%;
      left: 0;
      font-weight: 600;
      font-size: 45px;
      margin: 10%;
    }
    #deleteTask {
      position: relative;
      width: 30%;
      height: 25%;
      right: 0;
      font-weight: 600;
      font-size: 45px;
      margin: 8%;
    }
    span {
      vertical-align: middle;
      font-size: 60px;
      text-align: left;
    }
    #back {
      width: 230px;
      height: 85px;
      font-weight: 600;
      font-size: 45px;
      text-align: center;
    }
  }
  @media (max-width: 1024px) and (min-width: 401px) {
    #navItem {
      font-size: 3.5vw;
      margin-right: 1%;
      width: 10%;
    }
    .listItem {
      width: 80%;
      background-color: #ffc078;
      margin-right: 10%;
      margin-left: 10%;
      margin-bottom: 5%;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 2.5em;
      font-weight: 300;
      text-align: center;
    }
    #addTask {
      position: relative;
      width: 30%;
      height: 25%;
      left: 0;
      margin: 10%;
      font-weight: 600;
      font-size: 20px;
    }
    #deleteTask {
      position: relative;
      width: 30%;
      height: 15%;
      right: 0;
      margin: 8%;
      font-weight: 600;
      font-size: 20px;
    }
    span {
      vertical-align: middle;
      font-size: 35px;
      text-align: left;
    }
    #back {
      width: 100px;
      height: 50px;
      font-weight: 600;
      font-size: 20px;
    }
  }
  @media (max-width: 400px) {
    #navItem {
      font-size: 3.5vw;
      margin-right: 1%;
      width: 10%;
    }
    .listItem {
      font-size: 15px;
      width: 80%;
      background-color: #ffc078;
      margin-right: 10%;
      margin-left: 8%;
      margin-bottom: 5%;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 2em;
      font-weight: 400;
      text-align: center;
    }
    #addTask {
      position: relative;
      width: 100px;
      height: 50px;
      left: 0px;
      margin: 7%;
      font-weight: 600;
      font-size: 15px;
    }
    #deleteTask {
      position: relative;
      width: 100px;
      height: 50px;
      right: 0px;
      margin: 7%;
      font-weight: 600;
      font-size: 15px;
    }
    span {
      vertical-align: middle;
      font-size: 30px;
      text-align: left;
    }
    #back {
      width: 90px;
      height: 40px;
      font-weight: 600;
      font-size: 15px;
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
<div id="list">
  <a href="/task-Lists">
    <button id="back">Back</button>
  </a>
  <h1>Tasks</h1>
  {#each tasks as job}
    <div>
      <a href="/task-Details">
        <!-- id of button is the task name-->
        <button on:click={storeID} id={job.data().task} class="listItem">
          <span>{job.data().task}</span>
          <br />
        </button>
      </a>
    </div>
  {/each}
  <div>
    <a href="/tasks">
      <button id="addTask">Add Task</button>
    </a>
    <a href="/tasks">
      <button id="deleteTask">Delete Task</button>
    </a>
  </div>
</div>
