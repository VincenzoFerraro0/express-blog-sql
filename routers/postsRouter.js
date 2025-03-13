/**
 * Modulo per la gestione delle rotte relative ai post.
 * 
 * Utilizza Express Router per definire le varie operazioni CRUD sui post,
 * mappandole ai metodi del controller `postController`.
 */

import express from 'express';
import postController from '../controllers/postController.js';

// Crea un'istanza di Express Router
const router = express.Router();

// Estrazione delle funzioni dal controller per una sintassi più pulita
const { index, show, store, update, patch, destroy } = postController;

/**
 * Rotta GET '/'
 * Recupera la lista di tutti i post.
 * Se viene passato un parametro di filtro (es. tag), restituisce solo i post corrispondenti.
 */
router.get('/', index);

/**
 * Rotta GET '/:id'
 * Recupera un singolo post in base all'ID specificato nella richiesta.
 */
router.get('/:id', show);

/**
 * Rotta POST '/'
 * Crea un nuovo post.
 */
router.post('/', store);

/**
 * Rotta PUT '/:id'
 * Esegue una modifica completa del post con l'ID specificato.
 */
router.put('/:id', update);

/**
 * Rotta PATCH '/:id'
 * Esegue una modifica parziale del post con l'ID specificato.
 */
router.patch('/:id', patch);

/**
 * Rotta DELETE '/:id'
 * Elimina il post con l'ID specificato.
 */
router.delete('/:id', destroy);

// Esporta il router per essere utilizzato nel resto dell'applicazione
export default router;
