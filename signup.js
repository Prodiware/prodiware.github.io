// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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
const usernameField = document.getElementById('signup-username');
const emailField = document.getElementById('signup-email');
const passwordField = document.getElementById('signup-password');
const signupButton = document.getElementById('signup-button');
const statusMessage = document.getElementById('status-message');

// Event listener for the signup button
signupButton.addEventListener('click', () => {
  const username = usernameField.value;
  const email = emailField.value;
  const password = passwordField.value;

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User created successfully
      const user = userCredential.user;
      
      // Update the user's profile with the entered username
      updateProfile(user, {
        displayName: username
      }).then(() => {
        statusMessage.textContent = 'Signup successful!';
        statusMessage.style.color = 'green';
        console.log("User profile updated with username:", username);
      }).catch((error) => {
        console.error("Error updating profile:", error);
        statusMessage.textContent = `Error: ${error.message}`;
        statusMessage.style.color = 'red';
      });
    })
    .catch((error) => {
      // Handle error during user creation
      console.error("Error during signup:", error);
      statusMessage.textContent = `Error: ${error.message}`;
      statusMessage.style.color = 'red';
    });
});
