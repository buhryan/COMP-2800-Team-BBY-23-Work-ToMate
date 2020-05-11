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
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;
              // ...
            } else {
              // User is signed out.
              // ...
            }
          }
          });
    }
}