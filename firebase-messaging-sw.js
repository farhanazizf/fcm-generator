/* eslint-disable no-undef */
// Import Firebase scripts required for the service worker
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
// );

// // Initialize the Firebase app in the service worker with your Firebase configuration
// firebase.initializeApp({
//   apiKey: "AIzaSyAs2luvoFGmNIn0CvuT4oHmww-bQpo1kgo",
//   authDomain: "rabbitmq-notif.firebaseapp.com",
//   projectId: "rabbitmq-notif",
//   storageBucket: "rabbitmq-notif.appspot.com",
//   messagingSenderId: "486447015747",
//   appId: "1:486447015747:web:4b9159652b927cee1ef1f6",
// });

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

// Retrieve an instance of Firebase Messaging to handle background messages
// const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize the notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png", // Adjust this path to point to your notification icon
  };

  // Display the notification
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
