// api/ask-ai.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { prompt } = req.body;
  
    // compute today's date dynamically
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year:    "numeric",
      month:   "long",
      day:     "numeric",
    });
  
    try {
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          Authorization:   `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model:    "gpt-4-turbo",
          messages: [
            {
              role:    "system",
              content: `You are a helpful assistant for caregivers. Today is ${today}. Use the provided patient context to answer accurately.`,
            },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
        }),
      });
  
      const data  = await openaiRes.json();
      if (!openaiRes.ok) {
        console.error("OpenAI error:", data);
        return res.status(500).json({ error: "OpenAI API error", details: data });
      }
  
      const reply = data.choices?.[0]?.message?.content ?? "No response from AI";
      return res.status(200).json({ reply });
    } catch (err) {
      console.error("ask-ai handler error:", err);
      return res.status(500).json({ error: "Internal server error", details: err.message });
    }
  }