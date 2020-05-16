<svelte:head>
  <script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<script>
    import {
        db
    } from "./firebase.js";
    firebase.auth().onAuthStateChanged(function (user) {
        console.log(user.uid);
        if (user) {
            document.getElementById("loggedIn").style.display = "inline";
            document.getElementById("logout").style.display = "inline";
            document.getElementById("loginBtn").style.display = "none";
            document.getElementById("ggBtn").style.display = "inline";
            document.getElementById("signupBtn").style.display = "none";

        }
    })

    function logout() {
        firebase.auth().signOut().then(() => {
            document.getElementById("loginBtn").style.display = "inline";
            document.getElementById("signupBtn").style.display = "inline";
            document.getElementById("loggedIn").style.display = "none";
            document.getElementById("logout").style.display = "none";
        });

    }

   var userEmail
   var userPass
   var userName
   window.onSignIn = (googleUser) => {
     const profile = googleUser.getBasicProfile();
     console.log('ID: ' + profile.getId());
     console.log('Name: ' + profile.getName());
     console.log('Image URL: ' + profile.getImageUrl());
     console.log('Email: ' + profile.getEmail());
      userEmail = profile.getEmail();
      userPass = profile.getName();
      userName = profile.getName();

    
   }
    
   

      
</script>

<style>
    h1 {
        color: #ee8152;
    }

    button {
        background-color: #ee8152;
        color: #f7eac5;
    }

    div {
        height: 400px;
        width: 300px;
        background: #f7eac5;
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
</style>

<h1>Landing Page</h1>
<div class="g-signin2" data-longtitle="true" data-onsuccess="onSignIn" />
<span id="loginBtn"><a href="/login"><button>Login</button></a></span>
<span id="loginBtn"><a href="/googleSignIn"><button>Google Login</button></a></span>
<span id="signupBtn"><a href="/signup"><button>Signup</button></a></span>
<span id="loggedIn"><a href="/home"><button>Home</button></a></span>
<span id="logout"><button on:click={logout}>Logout</button></span>
<!-- 
    <button on:onclick={googleSignIn()}>Google Sign In</button>
   <button on:click={signOut()}>Sign Out</button>
    function googleSignOut(){
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
    
} 

<button on:onclick={googleSignOut()}>Google Sign Out</button>


firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
        });

        firebase.auth().onAuthStateChanged(function(user) {
                console.log(user.uid);

              if (user) {
                db.collection("users").doc(user.uid).set(
                    {
                    "name":userName, 
                     "email":userEmail,
                    });
            } else {
              // User is signed out.
              // ...
            }
        }
   
  };
 -->

<div class="Square shape">
    <h3>Core Features</h3>

</div>
<div class="Square shape">
    <h3>About Us</h3>

</div>