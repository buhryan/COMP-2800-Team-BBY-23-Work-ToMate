<script>
  import { db } from "./firebase.js";
  import { Confirm } from "svelte-confirm";

  const ENTER_KEY = 13;
  let tasks = [];
  let userid;
  let name;
  let inputText = "+ New Task";
  let newTask = "";
  let tempid = 0;
  // Needs this for User login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        // Goes to collection users / unique user id doc / Task-Lists collection / doc of whatever the previous button id
        // was / collection Tasks / then taks all the Tasks in there.
        db.collection("groups")
          .doc(localStorage.getItem("grpID"))
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
    localStorage.setItem("teamTaskName", this.id);
  }
  console;

  const completeTask = task => {
    db.collection("groups")
      .doc(localStorage.getItem("grpID"))
      .collection("Tasks")
      .doc(task)
      .update({
        complete: true
      })
      .then(() => {
        console.log("Task successfully updated.");
      })
      .catch(() => {
        console.error("Error updating task: ", error);
      });
  };

  const deleteTask = task => {
    db.collection("groups")
      .doc(localStorage.getItem("grpID"))
      .collection("Tasks")
      .doc(task)
      .delete()
      .then(() => {
        console.log("Task successfully deleted.");
      })
      .catch(() => {
        console.error("Error deleting task: ", error);
      });
  };

  const addTask = e => {
    if (e.which === ENTER_KEY) {
      db.collection("groups")
        .doc(localStorage.getItem("grpID"))
        .collection("Tasks")
        .add({
          complete: false,
          desc: "none",
          task: newTask
        })
        .then(() => {
          console.log("New task added!");
          newTask = "";
        })
        .catch(() => {
          console.error("Error adding task: ", error);
        });
    }
  };

  const addTaskBlur = () => {
    if (newTask !== "") {
      db.collection("groups")
        .doc(localStorage.getItem("grpID"))
        .collection("Tasks")
        .add({
          complete: false,
          desc: "none",
          task: newTask
        })
        .then(() => {
          console.log("New task added!");
          newTask = "";
          inputText = "+ new task";
        })
        .catch(() => {
          console.error("Error adding task: ", error);
        });
    } else {
      replaceText();
    }
  };

  const removePlaceholder = () => {
    inputText = "";
  };

  const replaceText = () => {
    inputText = "+ new task";
  };
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
    .listItem {
      width: 65%;
      margin-left: 3%;
      margin-bottom: 5%;
      background-color: #ffc078;
      padding: 0px;
    }
    #navItem {
      font-size: 2vw;
      margin-right: 2%;
      width: 10%;
    }
    .delete {
      float: right;
      margin-right: 10%;
      margin-top: 2%;
      margin-bottom: 5%;
      height: 60px;
      width: 75px;
      font-size: 20px;
    }
    .complete {
      float: left;
      width: 50px;
      height: 50px;
      margin-left: 4%;
      margin-top: 2%;
    }
    h1{
      color: black;
      text-transform: uppercase;
      width:100%;
      font-size: 6vw;
      text-align: center;
    }
    span {
      vertical-align: middle;
      font-size: 60px;
      text-align: left;
    }
    #back {
      width: 20%;
      height: 10%;
      font-weight: 600;
      font-size: 45px;
      text-align: center;
    }
    .task-input {
      position: relative;
      width: 50%;
      height: 20%;
      font-size: 3vw;
      margin-bottom: 5%;
    }
    #aElement{
      margin-left:23%;
    }
  }
  @media (max-width: 1024px) and (min-width: 401px) {
    .listItem {
      width: 65%;
      margin-left: 3%;
      margin-bottom: 5%;
      background-color: #ffc078;
      padding: 0px;
    }
    #navItem {
      font-size: 3.5vw;
      margin-right: 1%;
      width: 10%;
    }
    .delete {
      float: right;
      margin-right: 10%;
      margin-top: 2%;
      margin-bottom: 5%;
      height: 8%;
      width: 10%;
      font-size: 3.5vw;
    }
    .complete {
      float: left;
      width: 25px;
      height: 25px;
      margin-left: 4%;
      margin-top: 2%;
    }
    h1{
      color: black;
      text-transform: uppercase;
      width:100%;
      font-size: 7vw;
      text-align: center;
    }
    span {
      vertical-align: middle;
      font-size: 6vw;
      text-align: left;
    }
    #back {
      width: 20%;
      height: 10%;
      font-weight: 600;
      font-size: 20px;
    }
    .task-input {
      position: relative;
      width: 50%;
      height: 25%;
      font-size: 3vw;
      margin-bottom: 5%;
    }
    #aElement{
      margin-left:23%;
    }
  }
  @media (max-width: 400px) {
    .listItem {
      width: 65%;
      margin-left: 3%;
      margin-bottom: 5%;
      background-color: #ffc078;
      padding: 0px;
    }
    #navItem {
      font-size: 3vw;
      margin-right: 1%;
      width: 10%;
    }
    .delete {
      float: right;
      margin-right: 5%;
      margin-top: 2.5%;
      margin-bottom: 5%;
      height: 8%;
      width: 10%;
      font-size: 10px;
    }
    .complete {
      float: left;
      width: 20px;
      height: 20px;
      margin-left: 4%;
      margin-top: 2%;
    }
    h1{
      color: black;
      text-transform: uppercase;
      width:100%;
      font-size: 6vw;
      text-align: center;
    }
    #back {
      width: 20%;
      height: 10%;
      font-size:5vw;
      font-weight:600;
    }
    span {
      vertical-align: middle;
      font-size: 5vw;
      text-align: left;
    }
    .task-input {
      position: relative;
      width: 50%;
      height: 25%;
      font-size: 3vw;
      margin-bottom: 5%;
    }
    #aElement{
      margin-left:23%;
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
  <a href="/team-info">
    <button id="back">Back</button>
  </a>

  <h1 id="name">Tasks</h1>
  {#each tasks as job}
    <input
      type="checkbox"
      on:change={() => completeTask(job.id)}
      bind:checked={job.complete}
      class="complete" />
    <div class="task-container">
      <a href="/team-tasks-details">
        <!-- id of button is the task name-->
        <button on:click={storeID} id={job.id} class="listItem">
          <span>{job.data().task}</span>
          <br />
        </button>
      </a>
      <Confirm let:confirm={confirmThis}>
        <button on:click={() => confirmThis(deleteTask, job.id)} class="delete">
          &times
        </button>
      </Confirm>
    </div>
    <br />
  {/each}
  <a href="/team-tasks" id="aElement">
    <input
      class="task-input"
      placeholder={inputText}
      on:focus={removePlaceholder}
      on:blur={addTaskBlur}
      bind:value={newTask}
      on:keydown={addTask} />
  </a>
</div>
