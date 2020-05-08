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
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }
  h2{
    color:black;
  }
</style>

<div id="details">
  <a href="/tasks"><button id="back">Back</button></a>
  <h1 id="name">{localStorage.getItem('taskName')}</h1>
  <div id="description">
    <h2>Description</h2>
  </div>
  <div id="progress">
    <h2>Progress</h2>
  </div>
  <div id="complete">
    <h2>Complete / Inprogress / Or not</h2>
  </div>
</div>
