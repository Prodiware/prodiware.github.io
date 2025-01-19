document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.getElementById("greeting");

  if (greetingElement) {
    // Retrieve username from localStorage
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    const username = localStorage.getItem("username");

    if (isLoggedIn && username) {
      // Update the greeting with the username
      greetingElement.textContent = `Hello, ${username}!`;
    } else {
      // Default greeting if not logged in
      greetingElement.textContent = "Hello!";
    }
  } else {
    console.error("Greeting element not found in the DOM.");
  }
});
