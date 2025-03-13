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
    const { id } = req.params;

    // Controllo preliminare: assicuriamoci che id sia un numero valido
    if (isNaN(id)) {
        return res.status(400).json({
            status: 400,
            error: 'Bad Request',
            message: 'ID non valido'
        });
    }

    // Query per ottenere il post
    const postSql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(postSql, [id], (err, postResults) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                error: 'Database error',
                message: 'Errore nel recupero del post'
            });
        }

        // Se il post non viene trovato
        if (postResults.length === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Not Found',
                message: 'Post non trovato'
            });
        }

        const post = postResults[0]; // Recuperiamo il post trovato

        // Query per ottenere i tag associati al post
        const tagSql = `
            SELECT tags.label 
            FROM tags
            JOIN post_tag ON tags.id = post_tag.tag_id
            WHERE post_tag.post_id = ?
        `;

        connection.query(tagSql, [id], (err, tagResults) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    error: 'Database error',
                    message: 'Errore nel recupero dei tag'
                });
            }

            // Estrarre i label dei tag come array
            const tags = tagResults.map(tag => tag.label);

            // Restituiamo il post con i tag
            res.status(200).json({
                message: 'Post trovato con successo',
                data: {
                    ...post,
                    tags
                }
            });
        });
    });
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
