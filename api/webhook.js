// Vercel Serverless Function — /api/webhook.js
// Proxy para Make.com webhook (evita CORS desde el browser)
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const MAKE_WEBHOOK = "https://hook.us2.make.com/8ttjnzrlwbq6e0u2nsyfghqc0vhm6tn6";

  try {
    const response = await fetch(MAKE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
