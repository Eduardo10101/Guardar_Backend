const express = require('express');
const router = express.Router();

const db = require('../database/db');

router.get('/', async (req, res) => {

    try {

        const [lugares] = await db.execute(
            'SELECT * FROM lugares WHERE ativo = true'
        );

        res.json(lugares);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar lugares.'
        });

    }

});

module.exports = router;