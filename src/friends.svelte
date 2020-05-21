<script>
  import { db } from "./firebase.js";
  import { Confirm } from "svelte-confirm";
  import { fly } from "svelte/transition";
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'

  let userid;
  let users = [];
  let friends = [];
  let searchTerm = "";
  let n;

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

  const clearText = () => {
    searchTerm = "";
  };

  const addFriend = userName => {
    if (friends.some(friend => friend.id === userName.id)) {
      console.log("Already friends!");
      notifier.info('Already friends!', 2000);
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
          notifier.success('Friend added!', 2000);
          clearText();
        })
        .catch(() => {
          console.error("Error adding user: ", error);
        });
    }
  };

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
    border-radius: 5px;
    display: inline-block;
  }
  h3 {
    margin: 0;
    display: inline-block;
  }
  .user,
  .friend {
    padding: 20px;
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

<main>
<NotificationDisplay bind:this={n} />
  <div class="searchbar-container">
    <label id="searchbarLabel">
      Find a user
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search"
        id="searchbar" />
    </label>
  </div>

  <div class="search-container">

    {#if visible}
      {#each filteredList as userName}
        <div transition:fly={{ y: -20, duration: 300 }} class="user">
          <h3>{userName.data().name}</h3>
          <div class="button-container">
            <button on:click={() => addFriend(userName)} class="add">+</button>
          </div>
        </div>
      {/each}
    {/if}

  </div>

  <div class="friend-container">

    <h1>Friends</h1>
    <hr />

    {#each friends as friend}
      <div class="friend">
        <h3>{friend.data().name}</h3>
        <Confirm let:confirm={confirmThis}>
          <button
            on:click={() => confirmThis(removeFriend, friend.id)}
            class="delete">
            -
          </button>
        </Confirm>
      </div>
    {/each}
  </div>

</main>
