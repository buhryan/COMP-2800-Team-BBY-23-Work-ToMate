<script>
  import { db } from "./firebase.js";
  let tasks = [];
  db.collection("Users")
    .doc("username")
    .collection("Task-Lists")
    .doc(localStorage.getItem("listName"))
    .collection("Tasks")
    .onSnapshot(snapshot => {
      tasks = snapshot.docs;
    });
  console.log(localStorage.getItem("listName"));
  function storeID() {
    localStorage.setItem("taskName", this.id);
    localStorage.setItem("progress", this.data().progress);
    localStorage.setItem("desc", this.data().desc);
    localStorage.setItem("complete", this.data().complete);
  }
  console;
</script>

<style>
  #list {
    border: 2px black solid;
    background-color: #ffa032;
  }
  @media (max-width: 400px) {
    .listItem {
      width: 80%;
      background-color: #ffc078;
      margin-right: 10%;
      margin-left: 10%;
      margin-bottom: 5%;
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
  }
  @media (max-width: 1024px) and (min-width: 400px) {
    .listItem {
      width: 80%;
      background-color: #ffc078;
      margin-right: 10%;
      margin-left: 10%;
      margin-bottom: 5%;
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
  }
  span {
    vertical-align: middle;
    font-size: 30px;
    text-align: left;
  }
</style>

<div id="list">
  <h1>Tasks</h1>
  {#each tasks as job}
    <div>
      <a href="/task-Details">
        <button on:click={storeID} id={job.data().task} class="listItem">
          <span>{job.data().task}</span>
          <br />
        </button>
      </a>
    </div>
  {/each}
</div>
