import firebase from "firebase/app";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBcPz5WFiuHwSw9vKP1iupWr0LaoAxvNAQ",
  authDomain: "react-firebase-3afa4.firebaseapp.com",
  databaseURL: "https://react-firebase-3afa4.firebaseio.com",
  projectId: "react-firebase-3afa4",
  storageBucket: "react-firebase-3afa4.appspot.com",
  messagingSenderId: "51833365540",
  appId: "1:51833365540:web:de6fe9530d6e98682764b1",
  measurementId: "G-EJJQM0XM19",
});

const db = firebase.firestore();

export default db;
