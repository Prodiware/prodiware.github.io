document.addEventListener('DOMContentLoaded', () => {
  // Getting elements
  const sendButton = document.getElementById('send-button');
  const userInput = document.getElementById('user-input');
  const chatMessages = document.getElementById('chat-messages'); // This should now correctly point to the chat-messages div

  // Function to display messages
  function displayMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv); // Append message to chat-messages div
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
  }

  // Function to fetch response from OpenAI API
  async function fetchAIResponse(userMessage) {
    const apiKey = "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"; // Replace with your OpenAI API key
    const endpoint = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Or 'gpt-4' depending on your plan
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
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't get a response at the moment.";
    }
  }

  // Function to handle sending a message
  async function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') return; // Don't send if input is empty

    // Display user message
    displayMessage(`You: ${message}`, true);

    // Display bot response after a short delay
    setTimeout(async () => {
      const botResponse = await fetchAIResponse(message);
      displayMessage(`Bot: ${botResponse}`);
    }, 1000);

    // Clear input field
    userInput.value = '';
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
  displayMessage("Bot: Hello! What's your name?");
});
