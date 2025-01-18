// profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4TdcrxXfBkT-Tv-X7vGhsSu85F5BKT6U",
  authDomain: "prodiware.firebaseapp.com",
  projectId: "prodiware",
  storageBucket: "prodiware.firebasestorage.app",
  messagingSenderId: "349679639612",
  appId: "1:349679639612:web:a928441b9831e9c3b2b739",
  measurementId: "G-WFW5RB1Y86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get references to HTML elements
const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const logoutButton = document.getElementById('logout-button');

// Debugging: Log the process of loading and checking auth state
console.log("Initializing profile.js and checking auth state...");

// Monitor the user's authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, display their info
    console.log("User is signed in:", user);

    // Set username and email in the HTML
    usernameElement.textContent = user.displayName || "User"; // Display name is optional
    emailElement.textContent = user.email;

    // Debugging: Log the user data
    console.log("User Data:", user);
  } else {
    // No user is signed in, redirect to login page
    console.log("No user is signed in. Redirecting to login...");
    window.location.href = 'login.html'; // Redirect to login page
  }
});

// Logout functionality
logoutButton.addEventListener('click', () => {
  console.log("Logging out...");
  signOut(auth).then(() => {
    // Successfully logged out, redirect to login page
    console.log("Successfully logged out.");
    window.location.href = 'login.html'; // Redirect to login page
  }).catch((error) => {
    console.error("Error logging out:", error);
  });
});
