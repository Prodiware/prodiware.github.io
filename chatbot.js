document.addEventListener('DOMContentLoaded', () => {
  // Getting elements
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-area');

  // Function to display messages in the chat
  function displayMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll to bottom
  }

  // Function to handle sending a message
  async function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') return; // Don't send if input is empty

    // Display user message
    displayMessage(`You: ${message}`, true);

    // Display a loading message from bot while waiting for AI response
    displayMessage('Bot: Thinking...', false);

    try {
      // Fetch AI response
      const botResponse = await fetchAIResponse(message);
      // Update the last message with actual bot response
      updateBotResponse(botResponse);
    } catch (error) {
      // Display error message if AI response fails
      updateBotResponse("Sorry, I couldn't fetch a response right now.");
      console.error("Error fetching AI response:", error);
    }

    // Clear input field
    userInput.value = '';
  }

  // Function to fetch response from OpenAI API
  async function fetchAIResponse(userMessage) {
    const apiKey = "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"; // Replace with your OpenAI API key
    const endpoint = "https://api.openai.com/v1/chat/completions";

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use the appropriate model (gpt-3.5-turbo or gpt-4)
        messages: [
          { role: 'user', content: userMessage }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  // Function to update the bot message after response is received
  function updateBotResponse(botResponse) {
    const botMessages = document.querySelectorAll('.bot-message');
    const lastBotMessage = botMessages[botMessages.length - 1];
    lastBotMessage.textContent = `Bot: ${botResponse}`;
  }

  // Event listener for the "Send" button
  sendButton.addEventListener('click', sendMessage);

  // Allow sending a message by pressing Enter key
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Initial greeting when the page loads
  displayMessage("Bot: Hello! What can I call you?");
});
