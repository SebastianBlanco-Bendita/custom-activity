const express = require('express');
const app = express();
const path = require('path');

// Sirve archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Ruta explícita para index.html
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(10000, () => {
  console.log('Custom Activity listening on port 10000');
});