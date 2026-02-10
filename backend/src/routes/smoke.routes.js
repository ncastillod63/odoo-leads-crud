// backend/src/routes/smoke.routes.js
const express = require("express");
const router = express.Router();
const { odooAuthenticate } = require("../services/odooRpc");

router.get("/odoo-smoke", async (req, res) => {
  try {
    const result = await odooAuthenticate();
    res.json({
      ok: true,
      message: "Conexión JSON-RPC OK (authenticate)",
      uid: result?.uid,
      username: result?.username,
      db: result?.db,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
