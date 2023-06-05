const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Teste API</title>
      </head>
      <body>
        <h1>Teste API</h1>
        <button onclick="buscar()">Buscar</button>
        <div>
          <pre id="resultado"></pre>
        </div>
        <script>
          const resultado = document.getElementById('resultado');
          async function buscar() {
            try {
              resultado.textContent = 'Buscando...';
              const response = await fetch('/api/buscar');
              const data = await response.json();
              resultado.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
              resultado.textContent = 'Erro: ' + error.message;
            }
          }
        </script>
      </body>
    </html>
  `);
});

app.get('/api/buscar', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:8080/order/filter-order-get');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Servidor web iniciado em http://localhost:${port}`);
  });