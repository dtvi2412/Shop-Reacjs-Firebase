// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDue_-RmkJ-Ew31UFIZIVElasFjJCZBuEg",
  authDomain: "shop-bae1a.firebaseapp.com",
  databaseURL: "https://shop-bae1a.firebaseio.com",
  projectId: "shop-bae1a",
  storageBucket: "shop-bae1a.appspot.com",
  messagingSenderId: "848254770947",
  appId: "1:848254770947:web:4faaefa61143ef70e71336",
  measurementId: "G-PW98T8TLST",
};

let dataFirebase = firebase.initializeApp(firebaseConfig);

export default dataFirebase;
