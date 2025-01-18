// Getting elements
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// Function to handle sending a message
function sendMessage() {
  const message = userInput.value.trim();

  if (message === '') return; // Don't send if input is empty

  // Display user message
  const userMessageDiv = document.createElement('div');
  userMessageDiv.classList.add('user-message');
  userMessageDiv.textContent = `You: ${message}`;
  chatMessages.appendChild(userMessageDiv);

  // Display bot response after a short delay
  setTimeout(() => {
    const botResponse = generateBotResponse(message);
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('bot-message');
    botMessageDiv.textContent = `Bot: ${botResponse}`;
    chatMessages.appendChild(botMessageDiv);

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);

  // Clear input field
  userInput.value = '';
}

// Basic bot response logic (You can extend this logic)
function generateBotResponse(userMessage) {
  const responses = {
    'hello': 'Hi there! How can I assist you today?',
    'how are you': 'I am doing great, thank you for asking!',
    'bye': 'Goodbye! Have a great day!',
  };

  // Return bot response based on user input
  const lowerCaseMessage = userMessage.toLowerCase();
  return responses[lowerCaseMessage] || "I'm sorry, I didn't understand that.";
}

// Event listener for the "Send" button
sendButton.addEventListener('click', sendMessage);

// Optional: Allow sending a message by pressing Enter
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
