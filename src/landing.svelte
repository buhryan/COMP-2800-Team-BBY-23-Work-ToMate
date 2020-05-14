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
<span id="loginBtn"><a href="/login"><button>Login</button></a></span>
<span id="signupBtn"><a href="/signup"><button>Signup</button></a></span>
<span id="loggedIn"><a href="/home"><button>Home</button></a></span>
<span id="logout"><button on:click={logout}>Logout</button></span>


<div class="Square shape">
    <h3>Core Features</h3>

</div>
<div class="Square shape">
    <h3>About Us</h3>

</div>