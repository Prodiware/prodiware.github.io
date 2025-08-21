// This file contains all the client-side JavaScript for handling user authentication
// and UI updates. It is meant to be loaded by the index.html file.

// Firebase configuration from the user's prompt.
const firebaseConfig = {
    apiKey: "AIzaSyDHJV0vPmqRip2sgvowY-0NBzolewBo7hs",
    authDomain: "prodipaint.firebaseapp.com",
    projectId: "prodipaint",
    storageBucket: "prodipaint.firebasestorage.app",
    messagingSenderId: "998749701351",
    appId: "1:998749701351:web:ec0bf1918b94b7081f8e42",
    measurementId: "G-QSPKEK9DC9",
};

// Import necessary Firebase functions.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile 
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- DOM Elements ---
const authButton = document.getElementById('auth-button');
const greetingMessage = document.getElementById('greeting-message');
const navLinks = document.querySelectorAll('.nav-link');
const pageContainers = document.querySelectorAll('.page-container');
const homePage = document.getElementById('home-page');
const authModal = document.getElementById('auth-modal');
const closeBtn = document.getElementById('close-modal-btn');
const authTitle = document.getElementById('auth-title');
const authForm = document.getElementById('auth-form');
const usernameField = document.getElementById('username-field');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const toggleAuthBtn = document.getElementById('toggle-auth-btn');
const googleLoginBtn = document.getElementById('google-login-btn');
const authError = document.getElementById('auth-error');

// --- State ---
let isSigningUp = false;

// --- Functions ---

/**
 * Renders the specified page and hides all others.
 * @param {string} pageId The ID of the page to show.
 */
const showPage = (pageId) => {
    pageContainers.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove('hidden');
            page.style.transform = 'translateY(0)';
            page.style.opacity = '1';
        } else {
            page.classList.add('hidden');
            page.style.transform = 'translateY(20px)';
            page.style.opacity = '0';
        }
    });
    if (pageId === 'home-page') {
        homePage.style.transform = 'translateY(0)';
        homePage.style.opacity = '1';
    }
};

/**
 * Shows the login/signup modal.
 */
const showAuthModal = () => {
    console.log("Showing auth modal.");
    authModal.classList.add('is-active');
};

/**
 * Hides the login/signup modal.
 */
const hideAuthModal = () => {
    console.log("Hiding auth modal.");
    authModal.classList.remove('is-active');
    authError.classList.add('hidden');
    authForm.reset();
};

/**
 * Toggles between login and signup forms.
 */
const toggleAuthMode = () => {
    isSigningUp = !isSigningUp;
    authTitle.textContent = isSigningUp ? 'Sign Up' : 'Login';
    authSubmitBtn.textContent = isSigningUp ? 'Sign Up' : 'Login';
    toggleAuthBtn.textContent = isSigningUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up';
    authError.classList.add('hidden');

    if (isSigningUp) {
        usernameField.classList.remove('hidden');
    } else {
        usernameField.classList.add('hidden');
    }
};

/**
 * Handles user login with Google.
 */
const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        console.log("Google sign-in successful. Hiding modal.");
        hideAuthModal();
    } catch (error) {
        console.error("Google Login failed:", error);
        authError.textContent = `Google login failed: ${error.message}`;
        authError.classList.remove('hidden');
    }
};

/**
 * Handles user logout.
 */
const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

/**
 * Listens for authentication state changes and updates the UI.
 */
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Auth state changed: User is signed in.");
        const displayName = user.displayName || user.email.split('@')[0];
        greetingMessage.textContent = `Hello, ${displayName}!`;
        authButton.textContent = 'Logout';
        authButton.onclick = logout;
        
        // Hide modal on successful login
        hideAuthModal();

        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: new Date()
            }, { merge: true });
        } catch (error) {
            // Log any database errors but don't prevent the UI from updating
            console.error("Error setting user document:", error);
        }

    } else {
        console.log("Auth state changed: User is signed out.");
        greetingMessage.textContent = 'Hello guest!';
        authButton.textContent = 'Login';
        authButton.onclick = showAuthModal;
    }
    showPage('home-page');
});

// --- Event Listeners ---

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.dataset.page + '-page';
        showPage(pageId);
    });
});

// Close modal button
if (closeBtn) {
    closeBtn.addEventListener('click', hideAuthModal);
}


// Toggle between login and signup
toggleAuthBtn.addEventListener('click', toggleAuthMode);

// Google login button
googleLoginBtn.addEventListener('click', googleLogin);

// Email/Password form submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const username = usernameInput.value;
    
    if (!email || !password || (isSigningUp && !username)) {
        authError.textContent = 'Please enter all fields.';
        authError.classList.remove('hidden');
        return;
    }
    
    authError.classList.add('hidden');
    
    try {
        if (isSigningUp) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            });
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        console.log("Email/Password sign-in successful. Hiding modal.");
        hideAuthModal();
    } catch (error) {
        console.error("Authentication failed:", error);
        let errorMessage = 'An unknown error occurred.';
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Email already in use. Please login or use a different email.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password must be at least 6 characters long.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address.';
                break;
            default:
                errorMessage = `Error: ${error.message}`;
        }
        authError.textContent = errorMessage;
        authError.classList.remove('hidden');
    }
});
