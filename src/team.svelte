<script>
  import { db } from "./firebase.js";
  let groups = [];
  let docIDS = [];
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
  }
  function joinTeam() {
    let teamID = document.getElementById("groupID").value;
    let dbRef = db.collection("groups").doc(teamID);
    dbRef.update({
      members: firebase.firestore.FieldValue.arrayUnion("levyOFtloEdo8Gc3tPhBQuKb1ZU2")
    });
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
  @media (min-width: 1025px) {
    #navItem {
      font-size: 2vw;
      margin-right: 2%;
      width: 10%;
    }
    h1 {
      color: black;
      font-size: 4.5em;
      font-weight: 500;
      text-align: center;
    }
    #details {
      border: black 2px solid;
      background-color: orange;
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
    h1 {
      color: black;
      font-size: 3.5em;
      font-weight: 500;
      text-align: center;
    }
    #details {
      border: black 2px solid;
      background-color: orange;
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
    h1 {
      color: black;
      font-size: 2.5em;
      font-weight: 500;
      text-align: center;
    }
    #details {
      border: black 2px solid;
      background-color: orange;
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
<a href="/home">
  <button id="back">Back</button>
</a>
<h1>Groups</h1>
{#each groups as grp, count}
  <div>
    <a href="/team-info">
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
    <h4>Your User ID</h4>
    <h4>{userid}</h4>
  </div>
  <a href="/team">
    <button id="createGroup">Create Group</button>
  </a>
  <br />
  <a href="/team">
    <button id="joinGroup" on:click={joinTeam}>Join Group</button>
  </a>
  <input type="text" placeholder="Enter Group ID" id="groupID" />
</div>
