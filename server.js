const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 443;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, 'public')));

// Handle POST requests from the form
app.post('/submit', async (req, res) => {
  const formData = req.body;
  const json = JSON.stringify(formData);

  try {
    const fetch = require('node-fetch');
    const response = await fetch('https://script.google.com/macros/s/AKfycbza0SzCzHGkzdWAU2A3xQPo2y3IZIG-AMf-xWRN0Y2NBZ5pV2jJDXglSlIK2pEkRsDx/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.text();
    res.send('Data submitted successfully!');
  } catch (error) {
    console.error('There was an error!', error);
    res.status(500).send('Error submitting data', error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
