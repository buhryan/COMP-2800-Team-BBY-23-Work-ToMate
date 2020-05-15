<script>
    import {
        db
    } from "./firebase.js";
    let state = true;

    function login() {
        let userEmail = document.getElementById("email").value;
        let userPass = document.getElementById("pass").value;

        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
            state = false;
        })
        setTimeout(authen, 2000);
        function authen() {
            firebase.auth().onAuthStateChanged(function (user) {
                if (state) {
                    console.log(user.uid);
                    if (user) {
                        document.getElementById("loggedIn").style.display = "inline";
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
    }
</script>
<style>
     button {
        background-color: #EE8152;
        color: #F7EAC5;
        border-radius: 5px;
        border: none;
        display: flex;
        margin: 0px auto;
        padding: 10px;
        margin-top: 20px;
        font-size: 15pt;
        width: 50%;
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
        position: central;
        margin: 0px auto;
        margin-top: 20px;
        font-size: 18pt;
    }

    img {
        width: 120px;
        height: 120px;
    }

    h2 {
        width: 100%;
        height: 30px;
        font-size: 30pt;
        margin: 0px auto;
        font-family: arial;
        font-size: 20pt;
        padding:10px;
    }

    #loginButton {
        font-size: 20pt;
        display: flex;
        margin: 0px auto;
    }

    #loggedIn {
        display: none;
    }

    #loggedInBtn {
        font-size: 18pt;
        display: flex;
        margin: 0px auto;
    }
    main{
        text-align: center;
        background-color:#F7EAC5;
        height:100%;
        margin: 0px;
        }
        #loggedInfo{
            padding:10px;
        }
    /*@media (min-width: 1024px) {
        button {
            background-color: #EE8152;
            color: #F7EAC5;
            border-radius: 5px;
            border: none;
            display: flex;
            margin: 0px auto;
            padding: 10px;
            margin-top: 20px;
            font-size: 15pt;
            width: 20%;
        }

        #email {
            width: 30%;
            height: 40px;
            display: flex;
            position: central;
            margin: 0px auto;
            margin-top: 20px;
            font-size: 18pt;

        }

        #pass {
            width: 30%;
            height: 40px;
            display: flex;
            position: central;
            margin: 0px auto;
            margin-top: 20px;
            font-size: 18pt;
        }


        img {
            width: 120px;
            height: 120px;
        }

        h2 {
            width: 60%;
            height: 30px;
            display: flex;
            position: central;
            margin: 0px auto;
            margin-left: 430px;
            font-family: arial;
            margin-top: 10px;
            font-size: 30pt;
        }

        #loginButton {
            font-size: 20pt;
            display: flex;
            margin: 0px auto;
        }

        #loggedIn {
            display: none;
        }

        #loggedInBtn {
            font-size: 18pt;
            display: flex;
            margin-left: 10px;
        }
        } */

</style>
<main>
<h2> Login to WorkToMate</h2>
<input id="email" placeholder="Email Address" type="text">
<input id="pass" placeholder="Password" type="password">
<button on:click={login}>
    <div id="loginButton">Login</div>
</button>
<div id="loggedIn">
    <h3 id="loggedInfo">You are now logged in.</h3>
    <a href="/home"><button id="loggedInBtn"><div id="loginButton">Go To Home</div></button></a>
</div>
</main>