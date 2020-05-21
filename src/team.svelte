<script>
  import { db } from "./firebase.js";
  let groups = [];
  let docIDS = [];
  let users = [];
  let count = 0;
  let userid;
  // Needs this for User login
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        db.collection("groups")
          .where("members", "array-contains", userid)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              groups.push(doc.data());
              groups = groups;
              docIDS.push(doc.id);
              docIDS = docIDS;
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    } else {
      // No user is signed in.
    }
  });
  function setID() {
    localStorage.setItem("grpID", this.id);
    console.log(localStorage.getItem("grpID"));
  }
  function joinTeam() {
    let teamID = document.getElementById("groupIden").value;
    localStorage.setItem("grpID", teamID);
    setTimeout(function() {
      if (users.length == 0) {
        users.push(userid);
        db.collection("groups")
          .doc(teamID)
          .update({
            members: users
          });
      } else {
        for (let count = 0; count < users.length; count++) {
          if (users[count] === userid && count == users.length - 1) {
            alert("Already in this group!");
            break;
          } else if (users[count] != userid && count == users.length - 1) {
            users.push(userid);
            db.collection("groups")
              .doc(teamID)
              .update({
                members: users
              });
          }
        }
      }
    }, 400);
  }
</script>

<style>
  nav {
    background-color: rgb(247, 177, 27);
    border: 2px black solid;
    padding-top: 1%;
    padding-bottom: 1%;
    margin: 0;
  }
  #bodyBlock {
    border: black 2px solid;
    background-color: #ffa032;
  }
  #joinDiv {
    margin: 5%;
  }
  @media (min-width: 1025px) {
    #navItem {
      font-size: 2vw;
      margin-right: 2%;
      width: 10%;
    }
    .listItem {
      width: 80%;
      margin-bottom: 5%;
    }
    #aElement{
      margin-right:10%;
      margin-left:10%;
    }
    h1 {
      color: black;
      font-size: 4.5em;
      font-weight: 500;
      text-align: center;
      margin-bottom: 5%;
    }
    #back {
      width: 20%;
      height: 10%;
      font-weight: 600;
      font-size: 45px;
      text-align: center;
    }
    span {
      vertical-align: middle;
      font-size: 60px;
      text-align: left;
    }
    #join {
      margin-left: 15%;
      font-size: 4.5vw;
      width: 55%;
    }
    #createGroup {
      width: 50%;
      font-size: 4vw;
      margin-bottom: 5%;
    }
    #createAElement{
      margin-right:10%;
      margin-left:25%;
    }
    h3 {
      text-align: center;
      color: white;
      font-size: 4.5vw;
    }
    h4 {
      text-align: center;
      color: white;
      font-size: 5vw;
    }
    #joinButton {
      width: 25%;
      height: 10%;
      font-size: 2.5vw;
    }
    #groupIden {
      margin-left: 15%;
      font-size: 3.5vw;
      width: 55%;
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
      margin-bottom: 5%;
    }
    #aElement{
      margin-left:10%;
      margin-right:10%;
    }
    h1 {
      color: black;
      font-size: 3.5em;
      font-weight: 500;
      text-align: center;
      margin-bottom: 5%;
    }
    #back {
      width: 100px;
      height: 50px;
      font-weight: 600;
    }
    span {
      vertical-align: middle;
      font-size: 8vw;
      text-align: left;
    }
    #groupIden {
      margin-left: 10%;
      width: 50%;
      font-size: 4vw;
    }
    h3 {
      text-align: center;
      color: white;
      font-size: 3.5vw;
    }
    h4 {
      text-align: center;
      color: white;
      font-size: 5vw;
    }
    #createGroup {
      width: 50%;
      font-size: 3.5vw;
      margin-bottom: 5%;
    }
    #createAElement{
      margin-right:10%;
      margin-left:25%;
    }
    #joinButton {
      width: 25%;
      height: 10%;
      font-size: 3vw;
    }
  }
  @media (max-width: 400px) {
    #navItem {
      font-size: 3vw;
      margin-right: 1%;
      width: 10%;
    }
    .listItem {
      width: 80%;
      margin-right: 10%;
      margin-left: 10%;
      margin-bottom: 5%;
    }
    #joinButton {
      width: 25%;
      height: 10%;
      font-size: 3.25vw;
    }
    h1 {
      color: black;
      font-size: 10vw;
      font-weight: 400;
      text-align: center;
      margin-bottom: 5%;
    }
    h3 {
      text-align: center;
      color: white;
      font-size: 4vw;
    }
    h4 {
      text-align: center;
      color: white;
      font-size: 5vw;
    }
    #createGroup {
      width: 50%;
      font-size: 15px;
      margin-bottom: 5%;
    }
    #createAElement{
      margin-right:15%;
      margin-left:25%;
    }
    #groupIden {
      margin-left: 5%;
      width: 60%;
      font-size:4vw;
    }
    #back {
      width: 20%;
      height: 10%;
      font-size: 5vw;
      font-weight: 600;
    }
    span {
      vertical-align: middle;
      font-size: 5vw;
      text-align: left;
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
<div id="bodyBlock">
  <a href="/home">
    <button id="back">Back</button>
  </a>
  <h1>Groups</h1>
  {#each groups as grp, count}
    <div id="">
      <a href="/team-info" id="aElement">
        <!-- id of button is the task name-->
        <button on:click={setID} id={docIDS[count]} class="listItem">
          <span>{grp.grpName}</span>
          <br />
        </button>
      </a>
    </div>
  {/each}
  <div>
    <div>
      <h3>Your User ID</h3>
      <h4>{userid}</h4>
    </div>
    <br />
    <a href="/team-create" id="createAElement">
      <button id="createGroup">Create Group</button>
    </a>
    <br />
    <div id="joinDiv">
      <input type="text" placeholder="Enter Group ID" id="groupIden" />
      <a href="/team-info">
        <button id="joinButton" on:click={joinTeam}>Join Group</button>
      </a>
    </div>
  </div>
</div>
