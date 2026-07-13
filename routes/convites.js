const express = require('express');
const router = express.Router();

const db = require('../database/db');

const verificarToken = require('../middlewares/auth');



// Criar convite
router.post('/', verificarToken, async (req, res) => {

    try {


        const usuario_id = req.usuario.id;


        const {
            lugar,
            dia,
            horario,
            observacao
        } = req.body;



        if (!lugar || !dia || !horario) {

            return res.status(400).json({

                mensagem: 'Preencha data, horário e lugar.'

            });

        }




        const sql = `

            INSERT INTO convites

            (usuario_id, lugar, dia, horario, observacao)

            VALUES (?, ?, ?, ?, ?)

        `;



        await db.execute(sql, [

            usuario_id,

            lugar,

            dia,

            horario,

            observacao || null

        ]);





        res.status(201).json({

            mensagem: 'Convite enviado com sucesso!'

        });





    } catch (erro) {


        console.log(erro);


        res.status(500).json({

            mensagem: 'Erro ao salvar convite.'

        });


    }


});









// Buscar convites do usuário logado

router.get('/', verificarToken, async (req, res) => {


    try {


        const usuario_id = req.usuario.id;




        const [convites] = await db.execute(`


            SELECT

                convites.id,

                convites.lugar,

                convites.dia,

                convites.horario,

                convites.observacao,

                convites.status,

                convites.criado_em


            FROM convites


            WHERE convites.usuario_id = ?


            ORDER BY convites.criado_em DESC


        `,[usuario_id]);





        res.json(convites);





    } catch (erro) {


        console.log(erro);



        res.status(500).json({

            mensagem:'Erro ao buscar convites.'

        });



    }


});






module.exports = router;