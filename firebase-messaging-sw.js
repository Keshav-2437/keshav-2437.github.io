// Import and configure Firebase
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaTd7-rsY-Ovu4byOSChu1hjA3FVkfnm0",
  authDomain: "hb-demo-168ee.firebaseapp.com",
  projectId: "hb-demo-168ee",
  storageBucket: "hb-demo-168ee.appspot.com",
  messagingSenderId: "1068008329021",
  appId: "1:1068008329021:web:9abee12cc2788a66b0ff54",
  measurementId: "G-3EHVV5N9NT"
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });


messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  // Get the service worker registration
  self.registration.pushManager.getSubscription().then(subscription => {
    if (subscription) {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
      };

      subscription.pushManager.getNotifications().then(notifications => {
        // Check if there are any existing notifications
        if (notifications.length > 0) {
          // Update an existing notification
          notifications[0].update(notificationOptions);
        } else {
          // Create a new notification
          subscription.pushManager.showNotification(notificationTitle, notificationOptions);
        }
      });
    }
  });
});
