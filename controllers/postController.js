//importiamo il file di connessione al database
import connection from '../data/db.js'


function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if(err) return res.status(500).json({error: 'errore database'});
        res.json(results)
    })
}


function show(req, res) {

    
    
}

function store(req, res) {


}

function update(req, res) {



}


function patch(req, res) {
    
}


function destroy(req, res) {

    
}

// Esporta le funzioni per essere utilizzate in altri moduli dell'applicazione.
export default { index, show, store, update, patch, destroy };
