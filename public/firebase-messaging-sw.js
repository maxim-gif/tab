/* eslint-disable no-restricted-globals */
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCqv9KvlyVN94mXloU1OzlMyvAgOBWUvWk",
    authDomain: "table-d13fe.firebaseapp.com",
    projectId: "table-d13fe",
    storageBucket: "table-d13fe.appspot.com",
    messagingSenderId: "251923195524",
    appId: "1:251923195524:web:65422f17335eaab459c4d1",
    measurementId: "G-6EQEBZBJXQ"
  };

  firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});