<script>
  import { db } from "./firebase.js";
  import { writable } from "svelte/store";
  import { fly } from "svelte/transition";

  let userid;
  let taskName;
  let taskDesc;
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
            taskName = snapshot.data().task;
            taskDesc = snapshot.data().desc;
            taskComplete = snapshot.data().complete;
          });
      }
    } else {
      // No user is signed in.
    }
  });
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
    h1 {
      color: black;
      font-size: 4.5em;
      font-weight: 500;
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
    h1 {
      color: black;
      font-size: 3.5em;
      font-weight: 500;
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
      width: 100px;
      height: 50px;
      font-weight: 600;
    }
  }
  @media (max-width: 400px) {
    #navItem {
      font-size: 3.5vw;
      margin-right: 1%;
      width: 10%;
    }
    h1 {
      color: black;
      font-size: 2.5em;
      font-weight: 500;
      text-align: center;
    }
    h2 {
      color: black;
      font-size: 2em;
      font-size: 400;
      text-align: center;
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
      width: 90px;
      height: 40px;
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
  <a href="/tasks">
    <button id="back">Back</button>
  </a>
  <h1 id="name">{localStorage.getItem('taskName')}</h1>
  <br />
  <div id="description">
    <h2>Description</h2>
    <h3>{taskDesc}</h3>
  </div>
  <br />
  <br />
  <div id="complete">
    <h3>{taskComplete}</h3>
  </div>
</div>
