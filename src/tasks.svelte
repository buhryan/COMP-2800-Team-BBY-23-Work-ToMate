<script>
  import { db } from "./firebase.js";
  import { Confirm } from "svelte-confirm";

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

  const completeTask = task => {
    db.collection("users")
      .doc(userid)
      .collection("Task-Lists")
      .doc(localStorage.getItem("listName"))
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
    db.collection("users")
      .doc(userid)
      .collection("Task-Lists")
      .doc(localStorage.getItem("listName"))
      .collection("Tasks")
      .doc(task)
      .delete()
      .then(() => {
        console.log("Task successfully updated.");
      })
      .catch(() => {
        console.error("Error updating task: ", error);
      });
  };
</script>

<style>
  #list {
    border: 2px black solid;
    background-color: #ffa032;
  }
  @media (min-width: 1025px) {
    .listItem {
      width: 65%;
      margin-left: 3%;
      margin-bottom: 5%;
      background-color: #ffc078;
      padding: 0px;
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
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 25;
      text-align: center;
    }
    #addList {
      position: relative;
      width: 30%;
      height: 25%;
      left: 15%;
      font-size: 25px;
    }
    span {
      vertical-align: middle;
      font-size: 60px;
      text-align: left;
    }
    #back {
      width: 230px;
      height: 85px;
    }
    #addTask {
      position: relative;
      width: 30%;
      height: 25%;
      margin-left: 35%;
      font-size: 25px;
      margin-bottom: 5%;
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
    .delete {
      float: right;
      margin-right: 10%;
      margin-top: 2%;
      margin-bottom: 5%;
      height: 40px;
      width: 50px;
      font-size: 14px;
    }
    .complete {
      float: left;
      width: 25px;
      height: 25px;
      margin-left: 4%;
      margin-top: 2%;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 3em;
      font-weight: 25;
      text-align: center;
    }
    #addList {
      position: relative;
      width: 30%;
      height: 25%;
      left: 15%;
    }
    span {
      vertical-align: middle;
      font-size: 40px;
      text-align: left;
    }
    #back {
      width: 120px;
      height: 60px;
    }
    #addTask {
      position: relative;
      width: 30%;
      height: 25%;
      margin-left: 30%;
      font-size: 17px;
      margin-bottom: 5%;
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
    .delete {
      float: right;
      margin-right: 5%;
      margin-top: 2.5%;
      margin-bottom: 5%;
      height: 25px;
      width: 35px;
      font-size: 10px;
    }
    .complete {
      float: left;
      width: 20px;
      height: 20px;
      margin-left: 4%;
      margin-top: 2%;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 3em;
      font-weight: 25;
      text-align: center;
    }
    #addList {
      position: relative;
      width: 25%;
      height: 15%;
      left: 15%;
      margin: 10%;
    }
    #back {
      width: 80px;
      height: 45px;
    }
    span {
      vertical-align: middle;
      font-size: 30px;
      text-align: left;
    }
    #addTask {
      position: relative;
      width: 30%;
      height: 25%;
      margin-left: 35%;
      font-size: 14px;
      margin-bottom: 5%;
    }
  }
</style>

<nav>
  <a href="/home">Home</a>
  <a href="/timer">Start a Timer</a>
  <a href="/task-Lists">Task Lists</a>
  <a href="/team">Team</a>
  <a href="/friends">Friends</a>
  <a href="/about-Us">About us</a>
</nav>
<div id="list">
  <a href="/task-Lists">
    <button id="back">Back</button>
  </a>
  <h1>Tasks</h1>
  {#each tasks as job}
    <input
      type="checkbox"
      on:change={() => completeTask(job.data().task)}
      class="complete" />
    <div class="task-container">
      <a href="/task-Details">
        <!-- id of button is the task name-->
        <button on:click={storeID} id={job.data().task} class="listItem">
          <span>{job.data().task}</span>
          <br />
        </button>
      </a>
      <Confirm let:confirm={confirmThis}>
        <button
          on:click={() => confirmThis(deleteTask, job.data().task)}
          class="delete">
          &times
        </button>
      </Confirm>
    </div>
    <br>
  {/each}
  <a href="/tasks">
    <button id="addTask">Add Task</button>
  </a>
</div>
