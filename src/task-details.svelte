<script>
  import { db } from "./firebase.js";
  let taskDetails = [];
  let description;
  let taskName;
  let completion;
  let prog;
  db.collection("Users")
    .doc("username")
    .collection("Task-Lists")
    .doc(localStorage.getItem("listName"))
    .collection("Tasks")
    .onSnapshot(snapshot => {
      taskDetails = snapshot.docs;
    });
  console.log(taskDetails);
</script>

<style>
  #details{
    margin-right:5%;
    margin-left:5%;
    background-color:#FDC030;
    border:black solid 2px;
  }
  @media (min-width: 1025px) {
    h1 {
      text-align: center;
      color:orangered;
    }
    h2 {
      text-align: center;
    }
  }
  @media (min-width: 401px) and (max-width: 1024px) {
    h1 {
      text-align: center;
      color:orangered;
    }
    h2 {
      text-align: center;
    }
  }
  @media (max-width: 400px) {
    h1 {
      text-align: center;
      color:orangered;
    }
    h2 {
      text-align: center;
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
<div id="details">
  <a href="/tasks">
    <button id="back">Back</button>
  </a>
  <h1 id="name">{localStorage.getItem('taskName')}</h1>
  <div id="description">
    <h2>
      Description
      <br />
      <br />
      <br />
      <br />
    </h2>
  </div>
  <div id="progress">
    <h2>
      Progress
      <br />
      <br />
    </h2>
  </div>
  <div id="complete">
    <h2>
      Completion
      <br />
      <br />
    </h2>
  </div>
</div>
