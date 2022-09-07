import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { App } from "./App.jsx";
import {} from "../assets/scss/main.scss";
import {} from "../assets/css/reset.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

export const Context = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyAC0mQ5MKkBEQh72qPaElZxalMinrbD0yg",
  authDomain: "live-chat-f3a6c.firebaseapp.com",
  projectId: "live-chat-f3a6c",
  storageBucket: "live-chat-f3a6c.appspot.com",
  messagingSenderId: "149078657125",
  appId: "1:149078657125:web:d298ce7d47e0c1e03b5e8c",
  measurementId: "G-6EGR7NKSSH",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", (e) => {
  ReactDOM.render(
    <Context.Provider
      value={{
        firebase,
        auth,
        firestore,
        db,
      }}
    >
      <App />
    </Context.Provider>,
    document.querySelector("#root")
  );
});
