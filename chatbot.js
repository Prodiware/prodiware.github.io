document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages');

  // Check if elements are found
  console.log("Send Button:", sendButton);
  console.log("User Input:", userInput);
  console.log("Chat Messages Container:", chatMessages);

  function displayMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    console.log("Message displayed:", message);
  }

  function sendMessage() {
    const message = userInput.value.trim();
    console.log("User typed:", message);

    if (message === '') return; // Don't send if input is empty

    displayMessage(`You: ${message}`, true);

    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      displayMessage(`Bot: ${botResponse}`);
    }, 1000);

    userInput.value = '';
  }

  function generateBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    const responses = {
      'hello': 'Hi there! How can I assist you today?',
      'how are you': 'I am doing great, thank you for asking!',
      'bye': 'Goodbye! Have a great day!',
    };

    if (lowerCaseMessage.includes('my name is')) {
      const name = userMessage.split('my name is ')[1].trim();
      return `Nice to meet you, ${name}! How can I assist you today?`;
    }

    return responses[lowerCaseMessage] || "I'm sorry, I didn't understand that.";
  }

  sendButton.addEventListener('click', sendMessage);

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  displayMessage("Bot: Hello! What can I call you?");
});
