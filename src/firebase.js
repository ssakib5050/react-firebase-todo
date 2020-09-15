import firebase from "firebase/app";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAUijHhLH_FC6q_u94GPRuq2UtcSOiXgPU",
  authDomain: "react-firebase-todo-25f3d.firebaseapp.com",
  databaseURL: "https://react-firebase-todo-25f3d.firebaseio.com",
  projectId: "react-firebase-todo-25f3d",
  storageBucket: "react-firebase-todo-25f3d.appspot.com",
  messagingSenderId: "996059819670",
  appId: "1:996059819670:web:210732a7fac389724f9cb7",
  measurementId: "G-40GWD9JP28",
});

const db = firebase.firestore();

export default db;
