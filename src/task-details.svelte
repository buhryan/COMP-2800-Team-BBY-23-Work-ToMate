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
    .doc(localStorage.getItem("taskName"))
    .onSnapshot(snapshot => {
      taskDetails = snapshot.docs;
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
</style>

<div id="details">
  <h1>{localStorage.getItem('taskName')}</h1>
  <div id="description">
    <h1>Description</h1>
  </div>
  <div id="progress">
    <h1>Progress</h1>
  </div>
  <div id="complete">
    <h1>Complete / Inprogress / Or not</h1>
  </div>
</div>
