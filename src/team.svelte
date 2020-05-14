<script>
  import { db } from "./firebase.js";
  let groups = [];
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
              console.log(doc.id, " => ", doc.data());
              groups.push(doc.data());
              groups = groups;
            });
            console.log(groups);
          })
          .catch(function(error) {
            console.log(error);
          });
        // db.collection("groups").onSnapshot(snapshot => {
        //   groups = snapshot.docs;
        // });
      }
    } else {
      // No user is signed in.
    }
  });
  function showID() {
    console.log(this.id);
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
    h2 {
      color: black;
      font-size: 3.5em;
      font-size: 400;
    }
    h3 {
      color: green;
      font-size: 2.75em;
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
    h2 {
      color: black;
      font-size: 2.5em;
      font-size: 400;
    }
    h3 {
      color: green;
      font-size: 1.75em;
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
    h2 {
      color: black;
      font-size: 2em;
      font-size: 400;
      text-align: center;
    }
    h3 {
      color: green;
      font-size: 1.5em;
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
<div id="">
  <a href="/home">
    <button id="back">Back</button>
  </a>
  <h1>Groups</h1>
  {#each groups as grp}
    <div>
      <a href="/team">
        <!-- id of button is the task name-->
        <button on:click={showID} id={grp.grpName} class="listItem">
          <span>{grp.grpName}</span>
          <br />
        </button>
      </a>
    </div>
  {/each}
  <div>
    <h4>{userid}</h4>
  </div>
  <div>
    <a href="/team">
      <button id="addTask">Create Group</button>
    </a>
    <a href="/team">
      <button id="deleteTask">Something</button>
    </a>
  </div>
</div>
