//importiamo il file di connessione al database
import connection from '../data/db.js'


function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if(err) return res.status(500).json({
            error: 'Database error'
        });

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
    // Recuperiamo l'id dall'URL
    const { id } = req.params;

    const sql = 'DELETE FROM posts WHERE id = ?';

    // Eliminiamo il post dal blog
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Database error'
            });
        }

        // Se nessuna riga è stata eliminata, significa che il post non esiste già o è stato già cancellato
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Not Found',
                message: 'Post non trovato o già eliminato'
            });
        }

        res.json({
            status: 200,
            message: 'Post eliminato con successo'
        });
    });
}


// Esporta le funzioni per essere utilizzate in altri moduli dell'applicazione.
export default { index, show, store, update, patch, destroy };
