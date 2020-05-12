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
  @media (min-width: 1025px) {
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
      font-weight: 25;
      text-align: center;
    }
    #addList {
      position: relative;
      width: 30%;
      height: 25%;
      left: 15%;
      font-size: 25px;
    }
    span {
      vertical-align: middle;
      font-size: 60px;
      text-align: left;
    }
    #back {
      width: 230px;
      height: 85px;
    }
  }
  @media (max-width: 1024px) and (min-width: 401px) {
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
    span {
      vertical-align: middle;
      font-size: 40px;
      text-align: left;
    }
    #back {
      width: 120px;
      height: 60px;
    }
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
    span {
      vertical-align: middle;
      font-size: 30px;
      text-align: left;
    }
    #back {
      width: 80px;
      height: 45px;
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
<p id="username" />
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
</div>
