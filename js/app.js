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
const auth = firebase.auth();
const db = firebase.database(); // Get the Realtime Database service

// Get references to HTML elements
const signinForm = document.getElementById('signin-form');
const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signinError = document.getElementById('signin-error');

const signupForm = document.getElementById('signup-form');
const signupUsername = document.getElementById('signup-username');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupError = document.getElementById('signup-error');

// --- Sign In Logic ---
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signinEmail.value;
    const password = signinPassword.value;
    signinError.textContent = '';

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed in:', user.email);

            // Fetch the username from the database
            db.ref('users/' + user.uid).once('value')
                .then(snapshot => {
                    const userData = snapshot.val();
                    const username = userData && userData.username ? userData.username : user.email;
                    alert('Signed in successfully! Welcome ' + username);
                    window.location.href = '/game.html'; // Redirect to game page
                })
                .catch(error => {
                    console.error('Error fetching username:', error);
                    alert('Signed in successfully, but could not retrieve username.');
                    window.location.href = '/game.html';
                });
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Sign in error:', errorMessage);
            signinError.textContent = errorMessage;
        });
});

// --- Sign Up Logic ---
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = signupUsername.value;
    const email = signupEmail.value;
    const password = signupPassword.value;
    signupError.textContent = '';

    if (password.length < 6) {
        signupError.textContent = 'Password should be at least 6 characters long.';
        return;
    }

    // Check if username already exists
    db.ref('usernames/' + username.toLowerCase()).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                signupError.textContent = 'This username is already taken. Please choose another.';
            } else {
                // Username is available, proceed with account creation
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('User signed up:', user.email);

                        // Save the username and email to the database
                        const updates = {};
                        updates['/users/' + user.uid] = { username: username, email: email };
                        updates['/usernames/' + username.toLowerCase()] = user.uid; // Create a lookup table for uniqueness

                        db.ref().update(updates)
                            .then(() => {
                                alert('Signed up successfully! Welcome ' + username);
                                window.location.href = '/game.html'; // Redirect to game page
                            })
                            .catch((error) => {
                                console.error('Error saving user data:', error);
                                // This is a critical error, you might need to handle user deletion
                                alert('Sign up failed: ' + error.message);
                            });
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        console.error('Sign up error:', errorMessage);
                        signupError.textContent = errorMessage;
                    });
            }
        })
        .catch(error => {
            console.error('Error checking username:', error);
            signupError.textContent = 'An error occurred. Please try again.';
        });
});

// --- Authentication State Observer (Optional but Recommended) ---
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is currently logged in:', user.email);
    } else {
        console.log('No user is currently logged in.');
    }
});
