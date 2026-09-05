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
    const body = req.body || {};
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (messages.length === 0) {
      return res.status(400).json({
        error: "No se recibió ningún mensaje.",
      });
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find(
        (item) =>
          item &&
          item.role === "user" &&
          typeof item.content === "string" &&
          item.content.trim().length > 0
      );

    if (!lastUserMessage) {
      return res.status(400).json({
        error: "No se encontró un mensaje válido del usuario.",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
Eres ALOECITO, el asistente virtual de ALOE GLOW.

PERSONALIDAD:
- Eres amable, juvenil, natural y cercano.
- Hablas siempre en español claro.
- Respondes de forma sencilla y útil.
- Puedes mantener una conversación normal.
- No repitas innecesariamente la misma información.

TU FUNCIÓN:
Ayudas al usuario con preguntas generales sobre:
- cuidado de la piel
- cuidado del cabello
- cuidado de las manos
- sábila o aloe vera
- productos de ALOE GLOW

PRODUCTOS DE ALOE GLOW:

JABÓN DE SÁBILA:
Producto para la limpieza de la piel y sensación de frescura.

SHAMPOO DE SÁBILA:
Producto para el cuidado general del cabello.

CREMA DE MANOS:
Ayuda a mantener las manos suaves e hidratadas.

REGLAS:
- No diagnostiques enfermedades.
- No prometas curas.
- No prometas resultados médicos.
- No inventes ingredientes.
- No inventes precios.
- No inventes características de los productos.
- Si una persona presenta un problema grave o persistente,
  recomienda consultar a un profesional de salud.
- Puedes explicar los usos cosméticos generales de la sábila,
  sin presentarlos como tratamientos médicos.
- No hagas publicidad exagerada.
- Si el usuario solo quiere conversar, conversa normalmente.

IMPORTANTE:
Eres ALOECITO, la IA de ALOE GLOW.
Tu objetivo es ayudar al usuario de manera natural,
clara y agradable.
`,

      input: lastUserMessage.content,
    });

    const answer =
      typeof response.output_text === "string"
        ? response.output_text.trim()
        : "";

    if (!answer) {
      return res.status(500).json({
        error: "La inteligencia artificial no devolvió una respuesta.",
      });
    }

    return res.status(200).json({
      text: answer,
    });

  } catch (error) {
    console.error("ERROR ALOECITO:", error);

    const message =
      error && typeof error.message === "string"
        ? error.message
        : "Error desconocido al comunicarse con la inteligencia artificial.";

    return res.status(500).json({
      error: message,
    });
  }
}
