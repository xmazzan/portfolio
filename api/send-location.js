export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Só POST é permitido' });
  }
  const { latitude, longitude } = request.body;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return response.status(400).json({ error: 'Lat e Lng devem ser números' });
  }

  const text = `📍 Novo acesso:\nLat: ${latitude}\nLng: ${longitude}`;
  const telegramUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text
      })
    });
    const data = await telegramRes.json();
    return response.status(200).json({ ok: true, data });
  } catch (err) {
    return response.status(500).json({ error: 'Falha na API do Telegram' });
  }
}