# 🌿 ALOECITO IA — versión web pública

Esta carpeta está preparada para publicarse en Vercel.

## 1. Sube la carpeta a un repositorio de GitHub
Crea un repositorio, por ejemplo:
`aloecito-ia`

Sube:
- index.html
- aloecito.png
- package.json
- vercel.json
- carpeta `api`
- .env.example

NO subas un archivo `.env` con tu clave.

## 2. Publica en Vercel
En Vercel crea un proyecto nuevo e importa el repositorio de GitHub.
Vercel detectará la función `/api/chat`.

## 3. Añade la clave de OpenAI
En la configuración del proyecto, agrega estas variables de entorno:
OPENAI_API_KEY = TU_CLAVE
OPENAI_MODEL = gpt-5.6-luna

Después vuelve a desplegar.

## 4. Obtendrás un enlace público
Vercel te dará una dirección similar a:
https://aloecito-ia.vercel.app

Ese será el enlace que después podremos convertir en código QR.

## Seguridad
La clave de OpenAI está en una variable de entorno del servidor. Nunca la pongas dentro de index.html.

## Nota
La página pública necesita un servicio de hosting. GitHub Pages sirve para archivos estáticos, pero no ejecuta el endpoint privado de la API; por eso esta versión está preparada para Vercel.
