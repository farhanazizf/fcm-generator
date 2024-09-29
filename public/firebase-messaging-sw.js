/* eslint-disable no-undef */
// Import Firebase scripts required for the service worker
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker with your Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyAs2luvoFGmNIn0CvuT4oHmww-bQpo1kgo",
  authDomain: "rabbitmq-notif.firebaseapp.com",
  projectId: "rabbitmq-notif",
  storageBucket: "rabbitmq-notif.appspot.com",
  messagingSenderId: "486447015747",
  appId: "1:486447015747:web:4b9159652b927cee1ef1f6",
});

// Retrieve an instance of Firebase Messaging to handle background messages
const messaging = firebase.messaging();

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
    icon: "/firebase-logo.png", // Adjust this path to point to your notification icon
  };

  // Display the notification
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
