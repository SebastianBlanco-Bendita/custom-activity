const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve config.json for SFMC registration
app.get('/config.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'config.json'));
});

// Required endpoints for Journey Builder
app.post('/execute', (req, res) => {
  console.log('Execute called with:', req.body);
  res.status(200).send({ branchResult: 'next' });
});

app.post('/publish', (req, res) => {
  console.log('Publish called');
  res.status(200).send({});
});

app.post('/validate', (req, res) => {
  console.log('Validate called');
  res.status(200).send({});
});

app.post('/stop', (req, res) => {
  console.log('Stop called');
  res.status(200).send({});
});

app.listen(port, () => {
  console.log(`Custom Activity listening on port ${port}`);
});