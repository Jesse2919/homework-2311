const router = require('express').Router();
const store = require('../db/store')
router.get("/notes", (req, res) => {
    store.getNotes().then((notes) => res.json(notes));
});

router.post('/notes', (req, res) => {
    store.addNotes(req.body).then((notes) => res.json(notes));
});

router.delete('/notes/:id', (req, res) => {
    store.removeNote(req.params.id).then(() => res.json({ ok: true }));
});

module.exports = router