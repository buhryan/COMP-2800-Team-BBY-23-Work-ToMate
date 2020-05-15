<script>
  import { db } from "./firebase.js";
  let name;
  let userid;
  // Needs this for User login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        // Goes to collection users / unique user id doc / Task-Lists collection / doc of whatever the previous button id
        // was / collection Tasks / then taks all the Tasks in there.
        db.collection("groups")
          .doc(localStorage.getItem("grpID"))
          .onSnapshot(function(snapshot) {
            name = snapshot.data().grpName;
          });
      }
    } else {
      // No user is signed in.
    }
  });
  function storeID() {
    localStorage.setItem("taskName", this.id);
  }
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
  #invDiv{
    margin-bottom:5%;
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
      width: 230px;
      height: 85px;
      font-weight: 600;
      font-size: 45px;
      text-align: center;
    }
    #groupIden {
      color: white;
      font-size: 3em;
      font-weight: 400;
      text-align: center;
    }
    #invite {
      margin-left: 15%;
      font-size:4.5vw;
      width:55%;
    }
    #buttons {
      margin-right: 10%;
      margin-left: 20%;
      width: 60%;
      font-size: 50px;
      margin-bottom: 5%;
    }
    #invButton{
      width:20%;
      height:10%;
      font-size:4vw;
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
      font-size: 2.5em;
      font-weight: 400;
      text-align: center;
      margin-bottom: 5%;
    }
    #back {
      width: 100px;
      height: 50px;
      font-weight: 600;
      font-size: 20px;
    }
    #groupIden {
      color: white;
      font-size: 1.5em;
      font-weight: 400;
      text-align: center;
    }
    #invite {
      margin-left: 10%;
      width:60%;
      font-size:4vw;
    }
    #invDiv {
      margin-bottom:5%;
    }
    #buttons {
      margin-right: 10%;
      margin-left: 20%;
      width: 55%;
      font-size: 4.5vw;
      margin-bottom: 5%;
    }
    #invButton{
      width:20%;
      height:10%;
      font-size:3vw;
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
      font-size: 2em;
      font-weight: 400;
      text-align: center;
      margin-bottom: 5%;
    }
    #groupIden {
      color: white;
      font-size: 1.5em;
      font-weight: 400;
      text-align: center;
    }
    #invite {
      margin-left: 10%;
    }
    #back {
      width: 90px;
      height: 40px;
      font-weight: 600;
    }
    #buttons {
      margin-right: 10%;
      margin-left: 20%;
      width: 60%;
      font-size:25px;
      margin-bottom: 5%;
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
  <a href="/team">
    <button id="back">Back</button>
  </a>
  <h1>{name}</h1>
  <div>
    <a href="/team-tasks">
      <button id="buttons">Tasks</button>
    </a>
    <br />
    <a href="/team-members">
      <button id="buttons">Members</button>
    </a>
    <p id="groupIden">Group ID</p>
    <p id="groupIden">{localStorage.getItem('grpID')}</p>
    <br />
    <div id="invDiv">
      <input type="text" placeholder="Enter User ID" id="invite" />
      <a href="/team-info">
        <button id="invButton">Invite</button>
      </a>
    </div>
  </div>
</div>
