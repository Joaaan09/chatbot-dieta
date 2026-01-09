// Importar dependencias
import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Cargar configuración (de api key)    
dotenv.config();

// Cargar express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir frontend
app.use("/", express.static("public"));

// Middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Instancia openai y pasar api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//Metodo para hacer petición a la IA
const generateDiet = async (userResponses) => {
    // Crear el prompt (sistema, indicaciones para la ia)
    const promptSystem = {
        role: "system",
        content: `Eres un nutricionista profesional y un asistente que ayuda a generar una dieta semanal,
        El usuario solo puede hacer preguntas relacionadas con la dieta, con su peso, altura, objetivo, alergias,
        alimentos que no le gustan y número de comidas diarias.
        
        El sistema no responderá a ningún otro tipo de solicitud que no esté relacionada con la dieta.

        Si el usuario no te manda alguno de los datos, interpretalo tu msimo (por ejemplo si el usuario no me pasa el peso,
        pero si me pasa la altuira, usa un peso que sea más o menos probable).
        `
    }

    // Crear el prompt del usuario
    const promptUser = {
        role: "user",
        content: `
            Crear una dieta semanal para una personal que pesa ${userResponses.peso}kg, 
            mide ${userResponses.altura}cm, y cuyo objetivo es ${userResponses.objetivo}.
            La persona tiene las siguientes alergias: ${userResponses.alergias} por lo que no pongas alimentos que puedan contener eso.
            Evitar los siguientes alimentos: ${userResponses.no_gusta}.
            La persona quiere hacer ${userResponses.comidas_diarias} comidas diarias.
            Devuelve la dieta en formato tabla markdown con las siguientes columnas:
            Día, Comida, Alimentos, Nombre del plato o receta, Calorias.
            Y no digas nada más, solo devuelve la tabla. 
        `
    }

    // Hacer peticion a LLM de opneai
    try {

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                promptSystem,
                promptUser
            ],
            max_completion_tokens: 1000,
            temperature: 0.75
        });

        // Devolver el resultado generado
        const response = completion.choices[0].message.content.trim();

        return response;

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error : "Error al generar la dieta"
        });
    }

}


// Objeto de almacenamiento temporal de respuesta del usuario
let userData = {};

// Ruta /endpoint /url
app.post("/api/nutri-chat", async (req, res) => {

    // Primero por defecto se pregunta el peso (frontend)

    // Recibir la respuesta del peso del usuario
    const userId = req.body.id;
    const userMessage = req.body.message;

    // Generar objeto del usuario
    if (!userData[userId]) {
        userData[userId] = {};

    };

    if (!userData[userId].peso) {
        userData[userId].peso = userMessage;

        return res.json({ reply: "¿Cuanto mides (cm)?" })
    }

    if (!userData[userId].altura) {
        userData[userId].altura = userMessage;

        return res.json({ reply: "¿Cuál es tu objetivo? (adelgazar, manterme o subir de peso)" });

    }

    if (!userData[userId].objetivo) {
        userData[userId].objetivo = userMessage;

        return res.json({ reply: "¿Tienes alguna alergia?" });

    }

    if (!userData[userId].alergias) {
        userData[userId].alergias = userMessage;

        return res.json({ reply: "¿Que alimentos no te gustan?" });

    }

    if (!userData[userId].no_gusta) {
        userData[userId].no_gusta = userMessage;

        return res.json({ reply: "¿Cuántas comidas quieres hacer cada día?" });

    }

    if (!userData[userId].comidas_diarias) {
        userData[userId].comidas_diarias = userMessage;

        // Ejecutar petición a la IA con un prompt
        const diet = await generateDiet(userData[userId]);

        //  Recoger respuesta y darle la dieta al usuario
        return res.json({ reply: `¡Aquí tienes tu dieta! \n ${diet}` })

    }

    if (userData[userId].peso && userData[userId].altura && userData[userId].objetivo && userData[userId].alergias && userData[userId].no_gusta && userData[userId].comidas_diarias) {
        userData[userId] = {};
    }

    return res.json({ reply: "¡Gracias por tus respuestas! Ya tienes tu dieta creada, usa los ingredientes para hacer una receta" })


})

// Servir el backend
app.listen(PORT, () => {
    console.log("Servidor corriendo correctamnte en el puerto " + PORT)
})