import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "No se recibió ningún mensaje",
      });
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find(
        (m) =>
          m &&
          m.role === "user" &&
          typeof m.content === "string" &&
          m.content.trim()
      );

    if (!lastUserMessage) {
      return res.status(400).json({
        error: "No se encontró el mensaje del usuario",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
Eres ALOECITO, el asistente virtual de ALOE GLOW.

Tu personalidad:
- Amable, juvenil y natural.
- Hablas en español claro y sencillo.
- Respondes de manera breve, útil y fácil de entender.
- Ayudas con preguntas sobre cuidado general de la piel,
  cabello y manos.
- Explicas de manera sencilla los usos cosméticos de la sábila.

Productos de ALOE GLOW:

1. JABÓN DE SÁBILA
Ayuda con la limpieza de la piel y proporciona una
sensación de frescura.

2. SHAMPOO DE SÁBILA
Producto para el cuidado general del cabello.

3. CREMA DE MANOS
Ayuda a mantener las manos suaves e hidratadas.

IMPORTANTE:
- No diagnostiques enfermedades.
- No prometas curas.
- No prometas resultados médicos.
- No inventes ingredientes.
- Si una persona tiene un problema grave o persistente,
  recomienda consultar con un profesional de salud.
- No exageres los beneficios de los productos.
- No inventes información sobre ALOE GLOW.

Tu objetivo es ayudar al usuario de forma natural y
presentar ALOE GLOW sin parecer una publicidad exagerada.
`,

      input: lastUserMessage.content,
    });

    return res.status(200).json({
      text: response.output_text,
    });

  } catch (error) {
    console.error("ERROR ALOECITO:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "Ocurrió un error al conectar con la inteligencia artificial.",
    });
  }
}
