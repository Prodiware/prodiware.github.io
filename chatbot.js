document.addEventListener('DOMContentLoaded', () => {
  // Getting elements
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages');

  // Function to display messages
  function displayMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to handle sending a message
  function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') return; // Don't send if input is empty

    // Display user message
    displayMessage(`You: ${message}`, true);

    // Display bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      displayMessage(`Bot: ${botResponse}`);
    }, 1000);

    // Clear input field
    userInput.value = '';
  }

  // Basic bot response logic
  function generateBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    const responses = {
      'hello': 'Hi there! How can I assist you today?',
      'how are you': 'I am doing great, thank you for asking!',
      'bye': 'Goodbye! Have a great day!',
    };

    // Handle name introduction
    if (lowerCaseMessage.includes('my name is')) {
      const name = userMessage.split('my name is ')[1].trim();
      return `Nice to meet you, ${name}! How can I assist you today?`;
    }

    // Default response if message is not recognized
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

  // Initial greeting
  displayMessage("Bot: Hello! What can I call you?");
});
