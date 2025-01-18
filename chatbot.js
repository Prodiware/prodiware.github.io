// Replace with your actual OpenAI API key
const apiKey = "sk-opHSYKei7HpBE5-ZAjK37pVtWPp2LMFJgQ_yZooL1kxSSyKDf16VJrCwjxjflRr6uWWz8K32DAT3BlbkFJGkHHkduhvrZeLAfMnlizof02687UotdO5IFxErhju_PQZol_nXYb9tvADkgpt59eAp8ogAW1YA"; // Replace with your OpenAI API key
const endpoint = "https://api.openai.com/v1/chat/completions";

// Function to display messages in the chat area
function displayMessage(message, isUser = false) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Fetch AI response from OpenAI API
async function fetchAIResponse(userMessage) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // Ensure correct API key is passed here
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or 'gpt-4' if you're using GPT-4
        messages: [{ role: 'user', content: userMessage }]
      }),
    });

    if (!response.ok) {
      // Error handling for API issues
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(`Failed to fetch response: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.choices[0].message.content; // The AI's response
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't get a response at the moment.";
  }
}

// Function to handle sending a message
async function sendMessage() {
  const userMessage = document.getElementById('user-input').value.trim();

  if (userMessage === '') return; // Don't send if input is empty

  // Display user message
  displayMessage(`You: ${userMessage}`, true);

  // Fetch bot response asynchronously
  const botResponse = await fetchAIResponse(userMessage);

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
  displayMessage("Bot: Hello! What can I call you?");
});
