import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useState } from "react";

function App() {
  const [fcm, setFCM] = useState("");
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Retrieve the messaging instance
  const messaging = getMessaging(app);

  getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("FCM Registration Token:", currentToken);
        setFCM(currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.error("An error occurred while retrieving token. ", err);
    });

  // Request permission to show notifications
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      // Get the FCM registration token
      // getToken(messaging, {
      //   vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      // })
      //   .then((currentToken) => {
      //     if (currentToken) {
      //       console.log("FCM Registration Token:", currentToken);
      //       setFCM(currentToken);
      //     } else {
      //       console.log(
      //         "No registration token available. Request permission to generate one."
      //       );
      //     }
      //   })
      //   .catch((err) => {
      //     console.error("An error occurred while retrieving token. ", err);
      //   });
    } else {
      console.log("Unable to get permission to notify.");
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>FCM Generator - Farhan Aziz F</p>
        <p style={{ maxWidth: "100%", fontSize: 19, marginBottom: 0 }}>
          Here the FCM you need to copy
        </p>
        <p style={{ maxWidth: "100%", fontSize: 13 }}>{fcm}</p>
      </header>
    </div>
  );
}

export default App;
