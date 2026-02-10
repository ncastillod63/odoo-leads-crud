require('dotenv').config();

const express = require('express');
const app = express();

const PORT = 3000;

// Permite recibir JSON en las peticiones
app.use(express.json());

// Verificar que .env está funcionando
console.log("Odoo URL:", process.env.ODOO_URL);

// Ruta base (la que ya tenías)
app.get('/', (req, res) => {
  res.send('API Odoo funcionando 🚀');
});

// ===== RUTA SMOKE TEST ODOO RPC =====
const smokeRoutes = require('./routes/smoke.routes');
app.use('/api', smokeRoutes);

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


