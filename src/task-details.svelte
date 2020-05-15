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
          .doc(localStorage.getItem("listName"))
          .collection("Tasks")
          .doc(localStorage.getItem("taskName"))
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

  const editName = () => {
    taskName.editing = true;
    taskName = taskName;
  };

  const doneEditTaskName = () => {
    taskName.editing = false;
    db.collection("users")
      .doc(userid)
      .collection("Task-Lists")
      .doc(localStorage.getItem("listName"))
      .collection("Tasks")
      .doc(taskName.name)
      .set({
        task: taskName.name,
        desc: taskDesc.name,
        complete: false
      })
      .then(() => {
        console.log("Task name successfully updated.");
      })
      .catch(() => {
        console.error("Error updating name: ", error);
      });
    taskName = taskName;
  };

  const doneEditKeydownTaskName = e => {
    if (e.which === ENTER_KEY) {
      doneEditTaskName(taskName);
    }
  };

  const editDesc = () => {
    taskDesc.editing = true;
    taskDesc = taskDesc;
  };

  const doneEditTaskDesc = () => {
    taskDesc.editing = false;
    db.collection("users")
      .doc(userid)
      .collection("Task-Lists")
      .doc(localStorage.getItem("listName"))
      .collection("Tasks")
      .doc(localStorage.getItem("taskName"))
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

  const doneEditKeydownTaskDesc = e => {
    if (e.which === ENTER_KEY) {
      doneEditTaskDesc(taskDesc);
    }
  };
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }
  h2 {
    color: black;
  }
  .task-name-edit {
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }
  #details {
    border: black 2px solid;
    background-color: orange;
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
    <h3>{taskComplete}</h3>
  </div>

</div>
