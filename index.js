const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/execute', (req, res) => {
  console.log('Execute called with:', req.body);
  res.status(200).send({ branchResult: 'next' });
});

app.listen(port, () => {
  console.log(`Custom Activity listening on port ${port}`);
});