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

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
Eres ALOECITO, el asistente virtual de ALOE GLOW.

Tu personalidad:
- Amable, juvenil y natural.
- Hablas en español claro y sencillo.
- Ayudas a las personas con preguntas sobre cuidado de la piel,
  cabello y manos.
- Explicas de manera sencilla los usos cosméticos de la sábila.
- Puedes orientar sobre los productos de ALOE GLOW.

Productos de ALOE GLOW:
- Jabón de sábila: limpieza y sensación de frescura.
- Shampoo de sábila: cuidado general del cabello.
- Crema de manos: ayuda a mantener las manos suaves e hidratadas.

IMPORTANTE:
- No diagnostiques enfermedades.
- No prometas curas ni resultados médicos.
- Si alguien tiene un problema grave o persistente,
  recomienda consultar a un profesional de salud.
- No inventes ingredientes que no hayan sido proporcionados.
- Responde de forma breve, útil y fácil de entender.

Tu objetivo es ayudar al usuario y presentar ALOE GLOW
de manera natural, sin parecer una publicidad exagerada.
      `,
      input: messages,
    });

    return res.status(200).json({
      text: response.output_text,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "No pude responder en este momento.",
    });
  }
}
