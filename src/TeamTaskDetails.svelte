<script>
  import { db } from "./firebase.js";
  import { writable } from "svelte/store";
  import { fly } from "svelte/transition";
  const ENTER_KEY = 13;
  let userid;
  let taskName = {
    name: "",
    editing: false
  };
  let taskDesc = {
    name: "",
    editing: false
  };
  let taskComplete;

  // Checks if user is signed in.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        db.collection("groups")
          .doc(localStorage.getItem("grpID"))
          .collection("Tasks")
          .doc(localStorage.getItem("teamTaskName"))
          .onSnapshot(function(snapshot) {
            taskName.name = snapshot.data().task;
            taskDesc.name = snapshot.data().desc;
            taskComplete = snapshot.data().complete;
          });
      }
    } else {
      // No user is signed in.
    }
  });
  // Edits task name.
  const editName = () => {
    taskName.editing = true;
    taskName = taskName;
  };
  // Run this when finished editing name.
  const doneEditTaskName = () => {
    taskName.editing = false;
    db.collection("groups")
      .doc(localStorage.getItem("grpID"))
      .collection("Tasks")
      .doc(localStorage.getItem("teamTaskName"))
      .update({
        task: taskName.name
      })
      .then(() => {
        console.log("Task name successfully updated.");
      })
      .catch(() => {
        console.error("Error updating name: ", error);
      });
    taskName = taskName;
  };
  // Run doneEditTaskName when hitting enter.
  const doneEditKeydownTaskName = e => {
    if (e.which === ENTER_KEY) {
      doneEditTaskName();
    }
  };
  // Edits description
  const editDesc = () => {
    taskDesc.editing = true;
    taskDesc = taskDesc;
  };
  // Run this when finished editing.
  const doneEditTaskDesc = () => {
    taskDesc.editing = false;
    db.collection("users")
      .doc(userid)
      .collection("Task-Lists")
      .doc(localStorage.getItem("listId"))
      .collection("Tasks")
      .doc(localStorage.getItem("taskId"))
      .update({
        desc: taskDesc.name
      })
      .then(() => {
        console.log("Task successfully updated.");
      })
      .catch(() => {
        console.error("Error updating task: ", error);
      });
    taskDesc = taskDesc;
  };
  // Run doneEditTaskDesc if enter is hit.
  const doneEditKeydownTaskDesc = e => {
    if (e.which === ENTER_KEY) {
      doneEditTaskDesc(taskDesc);
    }
  };
</script>

<style>
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
    h1,
    .task-name-edit {
      color: black;
      width: 100%;
      font-size: 6vw;
      font-weight: 25;
      text-align: center;
    }
    h2 {
      color: black;
      font-size: 3.5em;
      font-size: 400;
    }
    h3 {
      color: green;
      font-size: 2.75em;
    }
    #details {
      border: black 2px solid;
      background-color: orange;
    }
    #back {
      width: 20%;
      height: 10%;
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
    h1,
    .task-name-edit {
      color: black;
      width: 100%;
      font-size: 7vw;
      font-weight: 25;
      text-align: center;
    }
    h2 {
      color: black;
      font-size: 2.5em;
      font-size: 400;
    }
    h3 {
      color: green;
      font-size: 1.75em;
    }
    #details {
      border: black 2px solid;
      background-color: orange;
    }
    #back {
      width: 20%;
      height: 10%;
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
    h1,
    .task-name-edit {
      color: black;
      width: 100%;
      font-size: 6vw;
      font-weight: 25;
      text-align: center;
    }
    h2 {
      color: black;
      font-size: 2em;
      font-size: 400;
    }
    h3 {
      color: green;
      font-size: 1.5em;
    }
    #details {
      border: black 2px solid;
      background-color: orange;
    }
    #back {
      width: 20%;
      height: 10%;
      font-size: 5vw;
      font-weight: 600;
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
<div id="details">

  <a href="/team-tasks">
    <button id="back">Back</button>
  </a>

  {#if !taskName.editing}
    <h1 id="name" on:dblclick={() => editName(taskName)}>{taskName.name}</h1>
  {:else}
    <input
      class="task-name-edit"
      bind:value={taskName.name}
      type="text"
      on:blur={doneEditTaskName}
      on:keydown={doneEditKeydownTaskName} />
  {/if}

  <div id="description">
    <h2>Description</h2>
    {#if !taskDesc.editing}
      <h3 on:dblclick={() => editDesc(taskDesc)}>{taskDesc.name}</h3>
    {:else}
      <input
        class="task-desc-edit"
        bind:value={taskDesc.name}
        type="text"
        on:blur={doneEditTaskDesc}
        on:keydown={doneEditKeydownTaskDesc} />
    {/if}
  </div>

  <div id="complete">
    <h3>Completed: {taskComplete}</h3>
  </div>

</div>
