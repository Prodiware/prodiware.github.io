// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiz-65LelRGFWdgl8hHVNb5zzvkY2CGDA",
    authDomain: "cyclone-world-e5120.firebaseapp.com",
    databaseURL: "https://cyclone-world-e5120-default-rtdb.firebaseio.com",
    projectId: "cyclone-world-e5120",
    storageBucket: "cyclone-world-e5120.firebasestorage.app",
    messagingSenderId: "671830912000",
    appId: "1:671830912000:web:2b2ad2a9f17746f9e5fce5",
    measurementId: "G-YPHXKY73MP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Get the Auth service

// Get references to HTML elements
const signinForm = document.getElementById('signin-form');
const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signinError = document.getElementById('signin-error');

const signupForm = document.getElementById('signup-form');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupError = document.getElementById('signup-error');

// --- Sign In Logic ---
signinForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = signinEmail.value;
    const password = signinPassword.value;
    signinError.textContent = ''; // Clear previous errors

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log('User signed in:', user.email);
            alert('Signed in successfully! Welcome ' + user.email);
            // Redirect to game page or update UI
            window.location.href = '/game.html'; // Example: redirect to your game page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign in error:', errorCode, errorMessage);
            signinError.textContent = errorMessage; // Display error to user
        });
});

// --- Sign Up Logic ---
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = signupEmail.value;
    const password = signupPassword.value;
    signupError.textContent = ''; // Clear previous errors

    // Basic password validation
    if (password.length < 6) {
        signupError.textContent = 'Password should be at least 6 characters long.';
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            console.log('User signed up:', user.email);
            alert('Signed up successfully! Welcome ' + user.email);
            // Optionally, you can automatically sign them in after signup
            // or redirect them to a profile setup page
            window.location.href = '/game.html'; // Example: redirect to your game page
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign up error:', errorCode, errorMessage);
            signupError.textContent = errorMessage; // Display error to user
        });
});

// --- Authentication State Observer (Optional but Recommended) ---
// This listens for changes in the user's sign-in state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is currently logged in:', user.email);
        // You might want to redirect them if they land on the login page while already logged in
        // window.location.href = '/game.html';
    } else {
        // User is signed out
        console.log('No user is currently logged in.');
    }
});
