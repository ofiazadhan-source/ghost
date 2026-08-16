const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Siomai Bot Proxy is Live!');
});

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/ofiazadhan-source/ghost',
        'X-Title': 'Siomai Bot'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
