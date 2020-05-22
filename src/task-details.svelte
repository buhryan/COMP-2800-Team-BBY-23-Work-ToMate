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

  //Needs to be added for user login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        //Goes to collection users/ userid doc / collection Task-List / gets doc of whatever button id was clicked on task-Lists page
        // then tasks collection / then doc of whatever the button id was in tasks.svelte / Then grabs all doc details and puts them in
        // variables.
        db.collection("users")
          .doc(userid)
          .collection("Task-Lists")
          .doc(localStorage.getItem("listId"))
          .collection("Tasks")
          .doc(localStorage.getItem("taskId"))
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

  // Allows for editing of the task name.
  const editName = () => {
    taskName.editing = true;
    taskName = taskName;
  };

  // Finishes editing the task name and updates the value in the database.
  const doneEditTaskName = () => {
    taskName.editing = false;
    db.collection("users")
      .doc(userid)
      .collection("Task-Lists")
      .doc(localStorage.getItem("listId"))
      .collection("Tasks")
      .doc(localStorage.getItem("taskId"))
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

  // Runs doneEditTaskName when the enter key is pressed.
  const doneEditKeydownTaskName = e => {
    if (e.which === ENTER_KEY) {
      doneEditTaskName();
    }
  };

  // Allows editing of the description.
  const editDesc = () => {
    taskDesc.editing = true;
    taskDesc = taskDesc;
  };

  // Finishes editing the description and updates the database with the values.
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

  // Runs doneEditTaskDesc when the enter key is pressed.
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
      width:100%;
      font-size: 6vw;
      text-align: center;
    }
    h2 {
      color: black;
      font-size: 5vw;
      font-size: 400;
    }
    #dbField {
      color: green;
      font-size: 4.5vw;
    }
    span {
      color: green;
      font-size: 4vw;
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
      width:100%;
      font-size: 6vw;
      text-align: center;
    }
    #dbField {
      color: green;
      font-size: 4.5vw;
    }
    h2 {
      color: black;
      font-size: 5vw;
      font-size: 400;
    }
    span {
      color: green;
      font-size: 4vw;
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
      font-size: 3vw;
      margin-right: 1%;
      width: 10%;
    }
    h1,
    .task-name-edit {
      color: black;
      width:100%;
      font-size: 6vw;
      text-align: center;
    }
    h2 {
      color: black;
      font-size: 5vw;
      font-size: 400;
    }
    #dbField {
      color: green;
      font-size: 4.5vw;
    }
    
    #details {
      border: black 2px solid;
      background-color: orange;
    }
    #back {
      width: 20%;
      height: 10%;
      font-size:5vw;
      font-weight:600;
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

  <a href="/tasks">
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
      <h3 id="dbField" on:dblclick={() => editDesc(taskDesc)}>{taskDesc.name}</h3>
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
    <h2>Completed: <span id="dbField">{taskComplete}</span></h2>
  </div>

</div>
