<svelte:head>
  
   <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-firestore.js"></script>
</svelte:head>
<script>
  import { db } from "./firebase.js";
  //signup
let state = true;
function signup() {
    if (document.getElementById("pass").value != document.getElementById("pass2").value) {
        window.alert("Password does not match!");
    } else {
        var userName = document.getElementById("fName").value;
        var userEmail = document.getElementById("email").value;
        var userPass = document.getElementById("pass").value;

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
            state = false;
        });

        firebase.auth().onAuthStateChanged(function(user) {
            if(state){
                console.log(user.uid);

              if (user) {
                db.collection("users").doc(user.uid).set(
                    {
                    "name":userName, 
                     "email":user.email,
                    },{ merge: true });
              //window.location.href = "index.html";
              // User is signed in.
              
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
  @media (min-width: 200px){
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
    
        #fName {
            width: 50%;
            height: 40px;
            display: flex;
            position: central;
            margin: 0px auto;
            margin-top: 50px;
            font-size: 18pt;
    
        }
        #email {
            width: 50%;
            height: 40px;
            display: flex;
            position: central;
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

        #pass2 {
            width: 50%;
            height: 40px;
            display: flex;
            position: central;
            margin: 0px auto;
            margin-top: 20px;
            font-size: 15pt;
        }
    
        img {
            width: 120px;
            height: 120px;
        }
    
        h2 {
            width: 100%;
            height: 30px;
            display: flex;
            position: central;
            margin: 0px auto;
            margin-left:50px;
            font-family: arial;
            margin-top: 10px;
            font-size: 20pt;
        }
    
        #loginButton {
            font-size: 20pt;
            display: flex;
            margin: 0px auto;
        }
    }
    @media (min-width: 1024px) {
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
    
        #fName {
            width: 30%;
            height: 40px;
            display: flex;
            position: central;
            margin: 0px auto;
            margin-top: 50px;
            font-size: 18pt;
    
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

        #pass2 {
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
    }
    
    
  </style>

      <h2> Signup with WorkToMate</h2>
        <input id="fName" placeholder="Full Name" type="text">
        <input id="email" placeholder="Email Address" type="text">
        <input id="pass" placeholder="Password" type="password">
        <input id="pass2" placeholder="Confirm Password" type="password">
        <button on:click={signup}>
            <div id="loginButton">Signup</div>
        </button>


