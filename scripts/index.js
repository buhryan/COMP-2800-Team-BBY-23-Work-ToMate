setTimeout(show(), 5000);
function show(){
    firebase.auth().onAuthStateChanged(function(user) {
            console.log(user.uid);
        if (user) {
            db.collection("users").doc(user.uid).set(
                {
                "name":user.displayName, 
                 "email":user.email,
                },{ merge: true });
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
function logout() {
    firebase.auth().signOut().then(() => {
      window.location.href = "login.html";
    });
  
  }