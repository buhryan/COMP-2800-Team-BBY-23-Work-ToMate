<script>
  import { db } from "./firebase.js";
  let taskList = [];
  function storeID() {
    //Stores a listName variable as the id of the button which should be the name of the task to be used in other sveltes
    localStorage.setItem("listName", this.id);
  }
  let userid;
  //Needs this to work with User Login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        //Goes to collection users / unique user id doc / Task-Lists collection and gets all docs in that collection
        db.collection("users")
          .doc(userid)
          .collection("Task-Lists")
          .onSnapshot(snapshot => {
            taskList = snapshot.docs;
            console.log(snapshot.docs);
          });
        console.log(taskList);
      }
    } else {
      // No user is signed in.
    }
  });
</script>

<style>
  #list {
    border: 2px black solid;
    background-color: #ffa032;
  }
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
    .listItem {
      width: 80%;
      background-color: #ffc078;
      margin-right: 10%;
      margin-left: 10%;
      margin-bottom: 5%;
      padding: 0px;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 300;
      text-align: center;
    }
    #addList {
      position: relative;
      width: 30%;
      height: 25%;
      left: 0;
      font-weight: 600;
      font-size: 45px;
      margin: 10%;
    }
    #deleteList {
      position: relative;
      width: 30%;
      height: 25%;
      right: 0;
      font-weight: 600;
      font-size: 45px;
      margin: 8%;
    }
    span {
      vertical-align: middle;
      font-size: 60px;
      text-align: left;
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
      font-size: 2.5em;
      font-weight: 300;
      text-align: center;
    }
    #addList {
      position: relative;
      width: 30%;
      height: 25%;
      left: 0;
      margin: 10%;
      font-weight: 600;
      font-size: 20px;
    }
    #deleteList {
      position: relative;
      width: 30%;
      height: 15%;
      right: 0;
      margin: 8%;
      font-weight: 600;
      font-size: 20px;
    }
    span {
      vertical-align: middle;
      font-size: 35px;
      text-align: left;
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
      font-size: 2em;
      font-weight: 400;
      text-align: center;
    }
    #addList {
      position: relative;
      width: 100px;
      height: 50px;
      left: 0px;
      margin: 7%;
      font-weight: 500;
      font-size: 15px;
    }
    #deleteList {
      position: relative;
      width: 100px;
      height: 50px;
      right: 0px;
      margin: 7%;
      font-weight: 500;
      font-size: 15px;
    }
    span {
      vertical-align: middle;
      font-size: 30px;
      text-align: left;
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
<div id="list">
  <a href="/home">
    <button id="back">Back</button>
  </a>
  <h1>Task Lists</h1>
  {#each taskList as list}
    <div id="listItem">
      <a href="/tasks">
        <!-- Id of button is set to be the name of the task -->
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
  <a href="/task-Lists">
    <button id="deleteList">Delete List</button>
  </a>
</div>
