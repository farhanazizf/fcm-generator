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
      // const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY; // Replace this with your actual VAPID key from Firebase Console
      const vapidKey =
        "BKyDjfNuiWdeRFKO1aZUQ1__g1HjO2DZ_gZ6_vBczmEmfp8S4FL03iByoW5AhtmldvdZ0cqyzDN_I7G8tWK9sCo"; // Replace this with your actual VAPID key from Firebase Console
      const currentToken = await getToken(messaging, { vapidKey });

      if (currentToken) {
        console.log("FCM Token:", currentToken);
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

// Call the function to request permission and generate the FCM token
requestPermission();

// Request permission to show notifications
// Notification.requestPermission().then((permission) => {
//   if (permission === "granted") {
//     console.log("Notification permission granted.");

//     // Get the FCM registration token
//     getToken(messaging, {
//       vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
//     })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log("FCM Registration Token:", currentToken);
//           // setFCM(currentToken);
//         } else {
//           console.log(
//             "No registration token available. Request permission to generate one."
//           );
//         }
//       })
//       .catch((err) => {
//         console.error("2. An error occurred while retrieving token. ", err);
//       });
//   } else {
//     console.log("Unable to get permission to notify.");
//   }
// });

// console.log("x");
if ("serviceWorker" in navigator) {
  console.log("zzx");
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
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
