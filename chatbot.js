document.addEventListener('DOMContentLoaded', () => {
  // Getting elements
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-area');

  // Function to display messages
  function displayMessage(message, isUser = false) {
    const messageDiv = document.createElement('p');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to handle sending a message
  async function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') return; // Don't send if input is empty

    // Display user message
    displayMessage(`You: ${message}`, true);

    // Clear input field
    userInput.value = '';

    // Fetch AI response
    try {
      const botResponse = await generateBotResponse(message);
      displayMessage(`Bot: ${botResponse}`);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      displayMessage('Bot: Oops! Something went wrong.');
    }
  }

  // Function to fetch AI response
  async function generateBotResponse(userMessage) {
    const apiKey = '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'; // Replace with your OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
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
  displayMessage('Bot: Hello! What can I assist you with today?');
});
