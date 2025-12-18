'use strict';

const express = require('express');
const orchestratorRoutes = require('./routes/orchestratorRoutes');

const PORT = process.env.ORCHESTRATOR_PORT || 8080;

const app = express();

app.use(express.json());
app.use('/', orchestratorRoutes);

async function startServer() {
  try {
    console.log('[ENV] ORCHESTRATOR_PORT:', process.env.ORCHESTRATOR_PORT);
    console.log('[ENV] ACQUIRE_URL:', process.env.ACQUIRE_URL);
    console.log('[ENV] PREDICT_URL:', process.env.PREDICT_URL);

    app.listen(PORT, () => {
      console.log(`[ORCHESTRATOR] Servicio escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[ORCHESTRATOR] Error al iniciar:', err);
    process.exit(1);
  }
}

startServer();