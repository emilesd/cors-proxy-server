const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// CORS Proxy endpoint
app.get('/proxy/:url(*)', async (req, res) => {
  try {
    const apiUrl = req.params.url;
    const response = await axios.get(apiUrl, {
      headers: {
        // Include any headers required by the target API
      },
    });

    // Forward the response from the API to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`CORS proxy server listening at http://localhost:${port}`);
});
