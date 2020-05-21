<script>
  import { db } from "./firebase.js";
  let name;
  let userid;
  let users = [];
  // Needs this for User login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        db.collection("groups")
          .doc(localStorage.getItem("grpID"))
          .onSnapshot(function(snapshot) {
            name = snapshot.data().grpName;
            users = snapshot.data().members;
          });
      }
    } else {
      // No user is signed in.
    }
  });
  function storeID() {
    localStorage.setItem("taskName", this.id);
  }
  function leave() {
    let arrayIndex = users.indexOf(userid);
    console.log(arrayIndex);
    users.splice(arrayIndex, 1);
    console.log(users);
    db.collection("groups")
      .doc(localStorage.getItem("grpID"))
      .update({
        members: users
      });
  }
  function joinTeam() {
    let newUser = document.getElementById("invite").value;
    setTimeout(function() {
      if (users.length == 0) {
        users.push(newUser);
        console.log(users);
        db.collection("groups")
          .doc(localStorage.getItem("grpID"))
          .update({
            members: users
          });
      } else {
        for (let count = 0; count < users.length; count++) {
          if (users[count] === newUser && count == users.length - 1) {
            alert("Already in this group!");
            break;
          } else if (users[count] != newUser && count == users.length - 1) {
            users.push(newUser);
            console.log(users);
            db.collection("groups")
              .doc(localStorage.getItem("grpID"))
              .update({
                members: users
              });
            break;
          }
        }
      }
    }, 0);
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
  #invDiv {
    margin-bottom: 5%;
  }
  #aElement {
    margin-left: 20%;
    margin-right: 10%;
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
    #groupIden {
      color: white;
      font-size: 3em;
      font-weight: 400;
      text-align: center;
    }
    #invite {
      margin-left: 15%;
      font-size: 4.5vw;
      width: 55%;
    }
    #buttons {
      width: 60%;
      font-size: 50px;
      margin-bottom: 5%;
    }
    #invButton {
      width: 20%;
      height: 10%;
      font-size: 4vw;
    }
    #leave{
      font-size: 3.5vw;
      margin-bottom: 5%;
      margin-top: 5%;
      width: 50%;
    }
    #leaveAElement{
      margin-left:25%;
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
      width: 20%;
      height: 10%;
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
      margin-left: 5%;
      width: 60%;
      font-size: 4vw;
    }
    #invDiv {
      margin-bottom: 5%;
    }
    #buttons {
      width: 65%;
      font-size: 4.5vw;
      margin-bottom: 5%;
    }
    #invButton {
      width: 20%;
      height: 10%;
      font-size: 3vw;
    }
    #leave{
      font-size: 3.5vw;
      margin-bottom: 5%;
      margin-top: 5%;
      width: 50%;
    }
    #leaveAElement{
      margin-left:25%;
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
      font-size: 6vw;
      text-align: center;
      margin-bottom: 5%;
    }
    #groupIden {
      color: white;
      font-size: 5vw;
      font-weight: 400;
      text-align: center;
    }
    #invite {
      margin-left: 5%;
      width: 70%;
      font-size:4vw;
    }
    #invButton {
      width: 20%;
      height: 10%;
      font-size: 3.5vw;
    }
    #back {
      width: 20%;
      height: 10%;
      font-size: 5vw;
      font-weight: 600;
    }
    #buttons {
      width: 60%;
      font-size: 5vw;
      margin-bottom: 5%;
    }
    #leave {
      font-size: 4vw;
      margin-bottom: 5%;
      margin-top: 5%;
      width: 45%;
    }
    #leaveAElement{
      margin-left:28%;
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
    <a href="/team-tasks" id="aElement">
      <button id="buttons" href="/team-tasks">Tasks</button>
    </a>
    <br />
    <a href="/team-members" id="aElement">
      <button id="buttons">Members</button>
    </a>
    <p id="groupIden">Group ID</p>
    <p id="groupIden">{localStorage.getItem('grpID')}</p>
    <br />
    <div id="invDiv">
      <input type="text" placeholder="Enter User ID" id="invite" />
      <a href="/team-info">
        <button id="invButton" on:click={joinTeam}>Invite</button>
      </a>
    </div>
    <a href="/team" id="leaveAElement">
      <button id="leave" on:click={leave}>Leave Group</button>
    </a>
  </div>
</div>
