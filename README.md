🥗 Chatbot Dieta

Un chatbot de IA que usa la API de OpenAI para responder preguntas relacionadas con dietas y nutrición de forma inteligente. 🎯

Este proyecto está hecho con Node.js y se ejecuta localmente con npm start.

📋 Características

Chat interactivo para consultas de dieta y nutrición.

Integración con la API de OpenAI (GPT-3.5 / GPT-4).

Respuestas generadas dinámicamente según lo que el usuario pregunte.

Configuración sencilla con un archivo .env para tu API key.

🚀 Comenzando
1. Clona este repositorio
git clone https://github.com/Joaaan09/chatbot-dieta.git
cd chatbot-dieta

2. Instala dependencias
npm install

3. Configura tu archivo .env

Crea un archivo llamado .env en la raíz del proyecto con este contenido:

OPENAI_API_KEY=TU_OPENAI_API_KEY_AQUI
PORT=3000


🔑 IMPORTANTE: Sustituye TU_OPENAI_API_KEY_AQUI por tu propia API key de OpenAI. Esta clave es necesaria para que el chatbot pueda generar respuestas con la API de OpenAI.

💡 Si no tienes una API key de OpenAI, puedes crear una en https://platform.openai.com/
 y copiar tu key desde ahí.

4. Ejecuta la aplicación
npm start


Esto iniciará el servidor y podrás interactuar con el chatbot desde tu navegador o cliente HTTP en la dirección:

http://localhost:3000

🛠️ ¿Cómo funciona?

Este proyecto levanta un servidor Node.js que:

Recibe mensajes del usuario.

Los envía a la API de OpenAI usando tu API key.

Devuelve la respuesta generada por el modelo como respuesta al usuario.

La lógica principal está en el archivo de servidor (por ejemplo app.js), y usa la variable de entorno OPENAI_API_KEY para autenticarse con OpenAI.

📦 Scripts disponibles
Script	Acción
npm start	Inicia el servidor
