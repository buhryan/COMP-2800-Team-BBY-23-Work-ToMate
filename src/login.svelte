<script>
  import {
    db
  } from "./firebase.js";
  let state = true;

  function login() {
    let userEmail = document.getElementById("email").value;
    let userPass = document.getElementById("pass").value;

    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPass)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
        state = false;
      });

    firebase.auth().onAuthStateChanged(function (user) {
      if (state) {
        console.log(user.uid);
        if (user) {
          document.getElementById("loggedIn").style.display = "block";
          //location = "/home";
          // User is signed in.

          // ...
        } else {
          // User is signed out.
          // ...
        }
      }
    });
  }
</script>

<style>
  main {
    text-align: center;
    background-color: #F7EAC5;
    height: 100%;
    margin: 0px;
  }

  button {
    background-color: #EE8152;
    color: #F7EAC5;
    border-radius: 7px;
    border: none;
    padding: 10px;
    margin-top: 20px;
    font-size: 15pt;
    width: 50%;
  }

  #loginButton {
    font-size: 20pt;

  }

  h2 {
    width: 100%;
    height: 30px;
    font-family: arial;
    padding-top: 10px;
    font-size: 20pt;
  }

  #fName {
    width: 50%;
    height: 40px;
    display: flex;
    margin: 0px auto;
    margin-top: 50px;
    font-size: 18pt;
  }

  #email {
    width: 50%;
    height: 40px;
    display: flex;
    margin: 0px auto;
    margin-top: 20px;
    font-size: 18pt;

  }

  #pass {
    width: 50%;
    height: 40px;
    display: flex;
    margin: 0px auto;
    margin-top: 20px;
    font-size: 18pt;
  }

  #pass2 {
    width: 50%;
    height: 40px;
    display: flex;
    margin: 0px auto;
    margin-top: 20px;
    font-size: 15pt;
  }

  #loggedIn {
    margin-top: 40px;
    padding: -2px;
    display: none;
  }

  #loggedInfo {
    font-size: 15pt;
    font-family: arial;
    color: #900c3f;
  }
</style>
<main>
  <h2>Login to WorkToMate</h2>
  <input id="email" placeholder="Email Address" type="text" />
  <input id="pass" placeholder="Password" type="password" />
  <button on:click={login}>
    <div id="loginButton">Login</div>
  </button>
  <div id="loggedIn">
    <p id="loggedInfo">You are now logged in.</p>
    <a href="/home">
      <button id="loggedInBtn">Go To Home</button>
    </a>
  </div>
</main>