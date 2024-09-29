import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

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

const requestPermission = async () => {
  try {
    // Request notification permission from the user
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");

      // Get FCM token using your VAPID key
      const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY; // Replace this with your actual VAPID key from Firebase Console
      const currentToken = await getToken(messaging, { vapidKey });

      if (currentToken) {
        console.log("FCM Token:", currentToken);
        localStorage.setItem("fcm", currentToken);
        // You can send the token to your server or store it locally
      } else {
        console.error(
          "No registration token available. Request permission to generate one."
        );
      }
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving the token:", error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

if ("serviceWorker" in navigator) {
  console.log("zzx");
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
      requestPermission();
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
