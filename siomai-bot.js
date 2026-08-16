export async function handler(event) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY; // NAKATAGO TO DITO

  if (!GROQ_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "Walang API Key" }) };
  }

  const { userText, menu } = JSON.parse(event.body);

  const prompt = `Ikaw si SiomaiBot. ROBOT KA. Walang kwento. MENU: ${menu} UTOS: Kung "pabili 5 pork 65s" = i-reply: addToCartFromChat("Pork65's",5) Kung "checkout" = i-reply: aiCheckout() Kung iba = "Ano pa boss?" BAWAL ENGLISH. FUNCTION CALL LANG. User: ${userText}`;

  try {
    const res = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100
      }),
    });
    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
