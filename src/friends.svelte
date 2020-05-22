<script>
  import { db } from "./firebase.js";
  import { Confirm } from "svelte-confirm";
  import { fly } from "svelte/transition";
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";

  let userid;
  let users = [];
  let friends = [];
  let searchTerm = "";
  let n;

  // Ensures a user is signed in.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user = firebase.auth().currentUser;
      if (user != null) {
        userid = user.uid;
        // Gets all users and puts into an array.
        db.collection("users").onSnapshot(querySnapshot => {
          users = querySnapshot.docs;
        });
        // Get all friends and puts into an array.
        db.collection("users")
          .doc(userid)
          .collection("Friends")
          .onSnapshot(snapshot => {
            friends = snapshot.docs;
          });
      }
    }
  });

  // Clears the text in the search bar.
  const clearText = () => {
    searchTerm = "";
  };

  // Adds a friend to the database for the user.
  const addFriend = userName => {
    // If the user is already friends, a notification alerts them.
    if (friends.some(friend => friend.id === userName.id)) {
      console.log("Already friends!");
      notifier.info("Already friends!", 2000);
      clearText();
    } else {
      db.collection("users")
        .doc(userid)
        .collection("Friends")
        .doc(userName.id)
        .set({
          name: userName.data().name
        })
        .then(() => {
          console.log("Successfully added");
          console.log(userName.data());
          // Notification of successful adding of friend.
          notifier.success("Friend added!", 2000);
          clearText();
        })
        .catch(() => {
          console.error("Error adding user: ", error);
        });
    }
  };

  // Removes the friend from the database for the user.
  const removeFriend = friendId => {
    db.collection("users")
      .doc(userid)
      .collection("Friends")
      .doc(friendId)
      .delete()
      .then(() => {
        console.log("Succesfully deleted");
      })
      .catch(() => {
        console.error("Error deleting friend: ", error);
      });
  };

  $: filteredList = users.filter(
    person => person.data().name.indexOf(searchTerm) !== -1
  );

  $: visible = searchTerm !== "" ? true : false;
</script>

<style>
  main {
    text-align: center;
    border: solid black 2px;
    background-color: #ffa032;
  }
  #searchbar {
    border-radius: 8px;
  }
  .searchbar-container {
    text-align: center;
  }
  .search-container {
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightgrey;
    position: absolute;
    z-index: 1;
    left: 50%;
  }
  .delete,
  .add {
    height: 100%;
    padding: 0px;
    border-radius: 5px;
    display: inline-block;
  }
  h3 {
    margin: 0;
    color: black;
    display: inline-block;
  }
  .user,
  .friend {
    padding: 20px;
  }
  nav {
    background-color: rgb(247, 177, 27);
    border: 2px black solid;
    padding-top: 1%;
    padding-bottom: 1%;
    margin: 0;
  }
  #findUserText {
    color: black;
    font-size: 4vw;
  }
  @media (min-width: 1025px) {
    #navItem {
      font-size: 2vw;
      margin-right: 2%;
      width: 10%;
    }
    #addFriendName {
      font-size: 5vw;
      width: 70%;
      color: black;
    }
    .add {
      font-size: 3vw;
      width: 20%;
    }
    .delete {
      width: 10%;
    }
    #deleteButton {
      font-size: 3vw;
    }
    h1 {
      color: black;
      font-size: 8vw;
    }
    #friendName {
      font-size: 5.5vw;
    }
  }
  @media (max-width: 1024px) and (min-width: 401px) {
    #navItem {
      font-size: 3.5vw;
      margin-right: 1%;
      width: 10%;
    }
    #addFriendName {
      font-size: 5vw;
      width: 70%;
    }
    .add {
      font-size: 3vw;
      width: 20%;
    }
    .delete {
      width: 12%;
      height: 8%;
    }
    #findUserText {
      font-size: 6vw;
    }
    h1 {
      color: black;
      font-size: 10vw;
    }
    #friendName {
      font-size: 5.5vw;
    }
    #deleteButton {
      font-size: 4vw;
    }
  }
  @media (max-width: 400px) {
    #navItem {
      font-size: 3vw;
      margin-right: 1%;
      width: 10%;
    }
    #addFriendName {
      font-size: 5vw;
      width: 70%;
    }
    .add {
      font-size: 3vw;
      width: 20%;
    }
    .delete {
      width: 12%;
    }
    #findUserText {
      font-size: 8vw;
    }
    #friendName {
      font-size: 8vw;
    }
    h1 {
      color: black;
      font-size: 10vw;
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

<main>

  <div class="friend-container">

    <h1>Friends</h1>
    <hr />

    <NotificationDisplay bind:this={n} />

    <div class="searchbar-container">
      <label id="searchbarLabel">
        <span id="findUserText">Find a user</span>
        <input
          type="text"
          bind:value={searchTerm}
          placeholder="Search"
          id="searchbar" />
      </label>
    </div>

    <!-- Displays all matching search results, updating dynamically. -->
    {#if visible}
      <div class="search-container">
        {#each filteredList as userName}
          <div transition:fly={{ y: -20, duration: 300 }} class="user">
            <div class="button-container">
              <h3 id="addFriendName">{userName.data().name}</h3>
              <button on:click={() => addFriend(userName)} class="add">
                +
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Displays each friend on the page. -->
    {#each friends as friend}
      <div class="friend">
        <h3 id="friendName">{friend.data().name}</h3>
        <Confirm let:confirm={confirmThis}>
          <button
            on:click={() => confirmThis(removeFriend, friend.id)}
            class="delete"
            id="deleteButton">
            -
          </button>
        </Confirm>
      </div>
    {/each}
  </div>

</main>
