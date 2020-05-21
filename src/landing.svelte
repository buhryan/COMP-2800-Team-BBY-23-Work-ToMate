<script>
  import { db } from "./firebase.js";
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user.uid);
    if (user) {
      document.getElementById("loggedIn").style.display = "inline";
      document.getElementById("logout").style.display = "inline";
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("signupBtn").style.display = "none";
    }
  });

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        document.getElementById("loginBtn").style.display = "inline";
        document.getElementById("signupBtn").style.display = "inline";
        document.getElementById("loggedIn").style.display = "none";
        document.getElementById("logout").style.display = "none";
      });
  }
</script>

<style>
  h1 {
    color: #ee8152;
  }

  button {
    background-color: #ee8152;
    color: #f7eac5;
    border-radius: 7px;
    border: none;
  }

  div {
    height: 400px;
    width: 100%;
    background: #f7eac5;
    text-align: center;
    margin: 10px;
  }

  #loggedIn {
    background-color: #ee8152;
    color: #f7eac5;
    width: 10px;
    display: none;
  }

  #logout {
    display: none;
    background-color: #ee8152;
    color: #f7eac5;
    width: 10px;
  }
  main {
    text-align: center;
  }
  ul {
    font-size: 5vw;
    text-align: center;
    margin-left: 0px;
    padding: 0px;
  }
  #box {
    border: 1px solid black;
    background-color: #f7eac5;
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    height: 60%;
  }
  #featuresTitle {
    color:black;
    font-size:6vw;
  }
  @media (min-width: 1025px) {
    ul {
      font-size: 3vw;
    }
    #featuresTitle {
      font-size: 4vw;
    }
  }
  @media (min-width: 401px) and (max-width: 1024px) {
    ul {
      font-size: 4vw;
    }
    #featuresTitle {
      font-size:5vw;
    }
  }
</style>

<main>
  <h1>Landing Page</h1>
  <span id="loginBtn">
    <a href="/login">
      <button>Login</button>
    </a>
  </span>
  <span id="signupBtn">
    <a href="/signup">
      <button>Signup</button>
    </a>
  </span>
  <span id="loggedIn">
    <a href="/home">
      <button>Home</button>
    </a>
  </span>
  <span id="logout">
    <button on:click={logout}>Logout</button>
  </span>

  <div id="box">
    <ul><span id="featuresTitle">Core Features</span></ul>
    <ul>Task Lists</ul>
    <ul>Create Team</ul>
    <ul>Timer</ul>
    <ul>Connect Friends</ul>
  </div>
  <div id="box">
    <h3>
      <a href="/about-Us">About Us</a>
    </h3>

  </div>

</main>
