const endpoint = 'http://localhost:5000/chat'; // Replace with your hosted API URL

// Function to display messages in the chat area
function displayMessage(message, isUser = false) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Fetch AI response from your custom API
async function fetchBotResponse(userMessage) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.response; // Bot response from the custom API
  } catch (error) {
    console.error('Error fetching bot response:', error);
    return "Sorry, I couldn't process your request. Try again later.";
  }
}

// Function to handle sending a message
async function sendMessage() {
  const userMessage = document.getElementById('user-input').value.trim();

  if (userMessage === '') return; // Don't send if input is empty

  // Display user message
  displayMessage(`You: ${userMessage}`, true);

  // Fetch bot response asynchronously
  const botResponse = await fetchBotResponse(userMessage);

  // Display bot response
  displayMessage(`Bot: ${botResponse}`);

  // Clear the input field after sending the message
  document.getElementById('user-input').value = '';
}

// Event listener for the "Send" button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Optional: Allow sending a message by pressing Enter
document.getElementById('user-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Optional: Initial greeting when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayMessage("Bot: Hello! I'm your assistant. What can I help you with?");
});
