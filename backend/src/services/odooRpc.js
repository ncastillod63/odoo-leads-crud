// backend/src/services/odooRpc.js
async function odooAuthenticate() {
  const baseUrl = process.env.ODOO_URL;
  const db = process.env.ODOO_DB;
  const login = process.env.ODOO_USER;
  const password = process.env.ODOO_PASSWORD;

  if (!baseUrl || !db || !login || !password) {
    throw new Error("Faltan variables en .env (ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASSWORD)");
  }

  const url = `${baseUrl}/web/session/authenticate`;

  const payload = {
    jsonrpc: "2.0",
    method: "call",
    params: { db, login, password },
    id: Date.now(),
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} al autenticar en Odoo`);
  }
  if (data.error) {
    const msg = data.error?.data?.message || data.error?.message || "Error desconocido";
    throw new Error(`Odoo JSON-RPC error: ${msg}`);
  }

  // Si todo bien, data.result tiene info de usuario y contexto.
  return data.result;
}

module.exports = { odooAuthenticate };
