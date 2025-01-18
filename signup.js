// Firebase Configuration
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
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements
const signupButton = document.getElementById('signup-button');
const emailField = document.getElementById('signup-email');
const passwordField = document.getElementById('signup-password');
const statusMessage = document.getElementById('status-message');

// Signup function
signupButton.addEventListener('click', () => {
  const email = emailField.value;
  const password = passwordField.value;

  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        statusMessage.textContent = 'Signup successful!';
        statusMessage.style.color = 'green';
        // Optionally, redirect to login page after signup
        // window.location.href = 'login.html';
      })
      .catch((error) => {
        statusMessage.textContent = `Error: ${error.message}`;
        statusMessage.style.color = 'red';
      });
  } else {
    statusMessage.textContent = 'Please fill in both fields.';
    statusMessage.style.color = 'orange';
  }
});
