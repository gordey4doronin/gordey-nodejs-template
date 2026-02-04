const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// GET endpoint to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route for shortened URLs - redirect to API
app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  
  // Check if it looks like a short ID (7 characters alphanumeric)
  if (shortId.length === 7 && /^[a-zA-Z0-9]+$/.test(shortId)) {
    // Redirect to the API endpoint for this short ID
    res.redirect(302, `/api/${shortId}`);
  } else {
    // If it doesn't look like a short ID, serve the main page
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Frontend Env: ${process.env.NODE_ENV}`);
  console.log(`Frontend server running on http://localhost:${PORT}`);
});
