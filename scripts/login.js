let state = true;
function login(){
    let userEmail = document.getElementById("email").value;
    let userPass = document.getElementById("pass").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
        state = false;
    })
    
    firebase.auth().onAuthStateChanged(function(user) {
        if(state){
            
            console.log(user.uid);
          }
        if (user) {
            window.location.href = "index.html";
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
      });

}