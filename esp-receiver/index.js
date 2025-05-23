const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/hello', (req, res) => {
  console.log('ESP32 says:', req.body);
  res.json({ msg: 'Hello from Arch' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on http://0.0.0.0:${port}`);
});

