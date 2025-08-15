const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware para servir archivos estáticos (HTML, JS, CSS)
app.use(express.static(__dirname));

// Middleware para parsear el JSON que envía Journey Builder
app.use(bodyParser.json());

// Ruta para servir la interfaz de usuario de la actividad
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- RUTAS DEL CICLO DE VIDA DE LA ACTIVIDAD ---

/**
 * RUTA DE EJECUCIÓN: Se llama para cada contacto que llega a la actividad.
 */
app.post('/execute', (req, res) => {
  console.log('--- RECEIVED EXECUTE REQUEST ---');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));

  // Extraemos los argumentos que configuramos en la UI y los datos del contacto
  const args = req.body.inArguments[0];
  
  const contactKey = args.contactKey;
  const firstName = args.firstName;
  const city = args.city;
  const interest = args.interestCategory;
  const email = args.email;
  const messageTemplate = args.message;

  console.log(`Processing contact: ${firstName} (Key: ${contactKey}) from ${city}`);
  console.log(`Interest Category: ${interest}, Email: ${email}`);
  
  // En este punto, Journey Builder ya ha reemplazado las variables de personalización.
  console.log(`Simulating SMS send with personalized message: "${messageTemplate}"`);
  
  // AQUÍ IRÍA LA LÓGICA REAL PARA LLAMAR A UNA API DE SMS (Twilio, Vonage, etc.)
  // Ejemplo: sendSmsApi(contactInfo.phoneNumber, messageTemplate);

  // Respondemos a Journey Builder que todo ha ido bien
  res.status(200).send({ success: true });
});

/**
 * RUTA DE GUARDADO: Se llama cuando el usuario guarda la actividad.
 */
app.post('/save', (req, res) => {
  console.log('--- RECEIVED SAVE REQUEST ---');
  res.status(200).send({ success: true });
});

/**
 * RUTA DE PUBLICACIÓN: Se llama cuando el Journey se activa/publica.
 */
app.post('/publish', (req, res) => {
  console.log('--- RECEIVED PUBLISH REQUEST ---');
  res.status(200).send({ success: true });
});

/**
 * RUTA DE VALIDACIÓN: Se llama para validar la configuración antes de guardar.
 */
app.post('/validate', (req, res) => {
  console.log('--- RECEIVED VALIDATE REQUEST ---');
  // Aquí podrías agregar lógica para asegurar que el mensaje no esté vacío
  // if (req.body.message) { res.status(200).send({ success: true }); }
  // else { res.status(400).send({ error: 'Message cannot be empty.' }); }
  res.status(200).send({ success: true });
});

/**
 * RUTA DE DETENCIÓN: Se llama cuando el Journey se detiene.
 */
app.post('/stop', (req, res) => {
  console.log('--- RECEIVED STOP REQUEST ---');
  res.status(200).send({ success: true });
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Custom Activity server listening on port ${PORT}`);
});
