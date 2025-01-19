const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Define a route to handle chatbot interactions
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;

  // Add custom logic for bot responses
  let botResponse = '';
  if (userMessage.toLowerCase().includes('hello')) {
    botResponse = 'Hi there! How can I help you today?';
  } else if (userMessage.toLowerCase().includes('help')) {
    botResponse = 'I’m here to assist you. What do you need help with?';
  } else {
    botResponse = "I'm sorry, I didn't quite understand that. Could you rephrase?";
  }

  // Respond back to the client
  res.json({ response: botResponse });
});

app.listen(port, () => {
  console.log(`Chatbot API is running at http://localhost:${port}`);
});
