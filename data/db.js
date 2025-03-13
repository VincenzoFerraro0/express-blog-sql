import mysql from 'mysql2'
import dotenv from 'dotenv';


// Carica le variabili d'ambiente dal file .env
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

export default connection