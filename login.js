// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Your Firebase configuration object (replace with your project's settings)
const firebaseConfig = {
  apiKey: "AIzaSyA4TdcrxXfBkT-Tv-X7vGhsSu85F5BKT6U",
  authDomain: "prodiware.firebaseapp.com",
  databaseURL: "https://prodiware-default-rtdb.firebaseio.com",
  projectId: "prodiware",
  storageBucket: "prodiware.firebasestorage.app",
  messagingSenderId: "349679639612",
  appId: "1:349679639612:web:a928441b9831e9c3b2b739",
  measurementId: "G-WFW5RB1Y86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements from the login page
const loginButton = document.getElementById("login-button");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const statusMessage = document.getElementById("status-message");

// Login button event listener
loginButton.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    statusMessage.textContent = "Please fill in all fields.";
    statusMessage.style.color = "red";
    return;
  }

  try {
    // Sign in the user with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store login state in localStorage
    localStorage.setItem("userLoggedIn", true);

    // Redirect to the homepage or dashboard
    statusMessage.textContent = "Login successful! Redirecting...";
    statusMessage.style.color = "green";
    setTimeout(() => {
      window.location.href = "index.html"; // Redirect after successful login
    }, 1500);
  } catch (error) {
    // Display error messages
    console.error("Login failed:", error);
    statusMessage.textContent = "Login failed. Please check your credentials.";
    statusMessage.style.color = "red";
  }
});

// Check login state on page load
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    localStorage.setItem("userLoggedIn", true);
  } else {
    // User is signed out
    localStorage.removeItem("userLoggedIn");
  }
});
