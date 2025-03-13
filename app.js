import express from 'express'; // Importa il modulo Express
import postsRouter from './routers/postsRouter.js'; // Importa il router per la gestione dei post
import errorsHandler from './middlewares/errorsHandler.js';
import notFound from './middlewares/notFound.js';


const app = express(); // Crea un'istanza dell'applicazione Express
const port = 3000; // Definisce la porta su cui il server ascolterà

// Middleware per gestire gli errori globali
app.use(errorsHandler);


// Configura Express per servire file statici dalla cartella 'public'
app.use(express.static('public'));

// Middleware per abilitare il parsing del JSON nelle richieste
app.use(express.json());



// Usa il router dei post per gestire le richieste relative ai post
app.use("/api/posts", postsRouter);


// Middleware per gestire le rotte non trovate (404)
app.use(notFound);

// Avvia il server e lo fa ascoltare sulla porta specificata
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Messaggio di conferma
});