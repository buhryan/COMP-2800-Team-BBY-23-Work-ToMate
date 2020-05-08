<script>
  import { db } from "./firebase.js";
  let taskList = [];
  db.collection("Users")
    .doc("username")
    .collection("Task-Lists")
    .onSnapshot(snapshot => {
      taskList = snapshot.docs;
    });
  function storeID() {
    localStorage.setItem("listName", this.id);
  }
</script>

<style>
  #list {
    border: 2px black solid;
    background-color: #ffa032;
  }
  @media (max-width: 400px) {
    .listItem {
      font-size: 15px;
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
  <h1>Task Lists</h1>
  {#each taskList as list}
    <div id="listItem">
      <a href="/tasks">
        <button on:click={storeID} id={list.data().listName} class="listItem">
          <span>{list.data().listName}</span>
          <br />
        </button>
      </a>
    </div>
  {/each}
  <a href="/add-List">
    <button id="addList">Add List</button>
  </a>
</div>
