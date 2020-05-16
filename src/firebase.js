import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEUpDxYBhdjXRN6oNdOnr-rInIYh96Q8E",
  authDomain: "worktomate.firebaseapp.com",
  databaseURL: "https://worktomate.firebaseio.com",
  projectId: "worktomate",
  storageBucket: "worktomate.appspot.com",
  messagingSenderId: "771611111041",
  appId: "1:771611111041:web:aa8ec2a081bf37ac336780"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();