const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Sirve estáticamente solo los archivos dentro de la carpeta 'public'
app.use(express.static('public'));
app.use(bodyParser.json());

// --- RUTAS DEL CICLO DE VIDA DE LA ACTIVIDAD ---

app.post('/execute', (req, res) => {
  console.log('--- RECEIVED EXECUTE REQUEST ---');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));

  const args = req.body.inArguments[0];
  const contactKey = args.contactKey;
  const firstName = args.firstName;
  const city = args.city;
  const interest = args.interestCategory;
  const email = args.email;
  const messageTemplate = args.message;

  console.log(`Processing contact: ${firstName} (Key: ${contactKey}) from ${city}`);
  console.log(`Simulating SMS send with personalized message: "${messageTemplate}"`);
  
  res.status(200).send({ success: true });
});

app.post('/save', (req, res) => {
  console.log('--- RECEIVED SAVE REQUEST ---');
  res.status(200).send({ success: true });
});

app.post('/publish', (req, res) => {
  console.log('--- RECEIVED PUBLISH REQUEST ---');
  res.status(200).send({ success: true });
});

app.post('/validate', (req, res) => {
  console.log('--- RECEIVED VALIDATE REQUEST ---');
  res.status(200).send({ success: true });
});

app.post('/stop', (req, res) => {
  console.log('--- RECEIVED STOP REQUEST ---');
  res.status(200).send({ success: true });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Custom Activity server listening on port ${PORT}`);
});
