<script>
  import { db } from "./firebase.js";
  import { writable } from "svelte/store";
  import { fly } from "svelte/transition";

  const progress = writable(0);
  let userid;
  let taskName;
  let taskDesc;
  let taskComplete;
  let taskProgress;
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
            taskName = snapshot.data().task;
            taskDesc = snapshot.data().desc;
            taskProgress = snapshot.data().progress;
            progress.set(taskProgress / 100);
            taskComplete = snapshot.data().complete;
          });
      }
    } else {
      // No user is signed in.
    }
  });
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
  #details {
    border: black 2px solid;
    background-color:orange;
  }
  progress {
    display: block;
    width: 100%;
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
  <h1 id="name">{localStorage.getItem('taskName')}</h1>
  <div id="description">
    <h2>Description</h2>
    <h3>{taskDesc}</h3>
  </div>
  <div id="progress">
    <h2>Progress</h2>
    <progress value={$progress} />
  </div>
  <div id="complete">
  <h3>{taskComplete}</h3>
  </div>
</div>
