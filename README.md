# 🥗 Chatbot Dieta

Un **chatbot inteligente de nutrición** que utiliza la API de **OpenAI** para responder preguntas sobre dietas, alimentación y hábitos saludables.

Este proyecto está desarrollado en **Node.js** y se ejecuta localmente con `npm start`.

---

## 🚀 Tecnologías
- Node.js  
- Express  
- OpenAI API  
- Dotenv  

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/Joaaan09/chatbot-dieta.git
cd chatbot-dieta
````

Instala las dependencias:

```bash
npm install
```

---

## 🔐 Configuración (.env)

Crea un archivo **`.env`** en la raíz del proyecto y añade tu API Key de OpenAI:

```env
OPENAI_API_KEY=tu_api_key_aqui
PORT=3000
```

⚠️ **Nunca subas este archivo a GitHub.**
Debe estar incluido en `.gitignore` para proteger tu clave privada.

---

## ▶️ Ejecución

Inicia la aplicación con:

```bash
npm start
```

La aplicación se ejecutará en:

```
http://localhost:3000
```

---

## 🧠 ¿Cómo funciona?

1. El usuario envía una pregunta relacionada con nutrición o dieta.
2. El servidor recibe la consulta.
3. La consulta se envía a la API de OpenAI usando la clave del `.env`.
4. OpenAI genera una respuesta.
5. El chatbot devuelve la respuesta al usuario en tiempo real.

---

## 📁 Variables de entorno

| Variable       | Descripción                         |
| -------------- | ----------------------------------- |
| OPENAI_API_KEY | Clave privada de OpenAI             |
| PORT           | Puerto donde se ejecuta el servidor |

## 🧑‍💻 Autor

**Joan Coll**
Desarrollador Web Junior

---


