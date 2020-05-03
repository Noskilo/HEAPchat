import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3-61ebBZCEUNyEu6G5_Ma8kIqwJZg5cg",
  authDomain: "heapchat.firebaseapp.com",
  databaseURL: "https://heapchat.firebaseio.com",
  projectId: "heapchat",
  storageBucket: "heapchat.appspot.com",
  messagingSenderId: "294278178466",
  appId: "1:294278178466:web:19ce6fd89e5ac412e899fb",
  measurementId: "G-GW5Q1W0L20",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export default firebase;
export { auth, db };
