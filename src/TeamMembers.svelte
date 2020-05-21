<script>
  import { db } from "./firebase.js";
  let memberIDs = [];
  let memberNames = [];
  let userid;
  let count = 0;
  // Checks if user is signed in.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        db.collection("groups")
          .doc(localStorage.getItem("grpID"))
          .onSnapshot(function(snapshot) {
            memberIDs = snapshot.data().members;
            memberIDs = memberIDs;
            for (let count = 0; count < memberIDs.length; count++) {
              db.collection("users")
                .doc(memberIDs[count])
                .onSnapshot(function(snapshot) {
                  memberNames.push(snapshot.data().name);
                  memberNames = memberNames;
                });
            }
          });
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
  h2 {
    color: darkred;
    text-align: center;
  }
  @media (min-width: 1025px) {
    #navItem {
      font-size: 2vw;
      margin-right: 2%;
      width: 10%;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 300;
      text-align: center;
    }
    #back {
      width: 20%;
      height: 10%;
      font-weight: 600;
      font-size: 45px;
      text-align: center;
    }
    h2 {
      font-size: 7vw;
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
      text-transform: uppercase;
      font-size: 2.5em;
      font-weight: 300;
      text-align: center;
    }
    #back {
      width: 20%;
      height: 10%;
      font-weight: 600;
      font-size: 20px;
    }
    h2 {
      font-size: 7vw;
    }
  }
  @media (max-width: 400px) {
    #navItem {
      font-size: 3vw;
      margin-right: 1%;
      width: 10%;
    }
    h1 {
      color: black;
      text-transform: uppercase;
      font-size: 2em;
      font-weight: 400;
      text-align: center;
    }
    #back {
      width: 20%;
      height: 10%;
      font-size: 5vw;
      font-weight: 600;
    }
    h2 {
      font-size: 7vw;
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
  <a href="/team-info">
    <button id="back">Back</button>
  </a>
  <h1>Users</h1>
  {#each memberNames as name, count}
    <div>
      <h2>{memberNames[count]}</h2>
      <br />
    </div>
  {/each}
</div>
