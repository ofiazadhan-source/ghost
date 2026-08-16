async function sendMessageToAI(userMessage) {
  try {
    const response = await fetch('https://openrouter-proxy-tumy.onrender.com/chat', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "openai/gpt-4o-mini",
        "messages": [
          { "role": "system", "content": "Ikaw si Siomai Bot. Magalang at matulungin ka." },
          { "role": "user", "content": userMessage }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error("Error:", error);
    return "Pasensya na, nagka-error si Siomai Bot 😅";
  }
}
