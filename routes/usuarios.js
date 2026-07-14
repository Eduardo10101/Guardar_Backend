const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../database/db');

const JWT_SECRET = process.env.JWT_SECRET;

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==========================
// CADASTRO
// ==========================

router.post('/cadastro', async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos.'
            });
        }

        if (!validarEmail(email)) {
            return res.status(400).json({
                mensagem: 'Email inválido.'
            });
        }

        if (senha.length < 8) {
            return res.status(400).json({
                mensagem: 'A senha deve ter no mínimo 8 caracteres.'
            });
        }

        const [existe] = await db.execute(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (existe.length > 0) {
            return res.status(400).json({
                mensagem: 'Email já cadastrado.'
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await db.execute(
            `
            INSERT INTO usuarios
            (
                nome,
                email,
                senha,
                email_verificado
            )
            VALUES (?,?,?,?)
            `,
            [
                nome,
                email,
                senhaHash,
                true
            ]
        );

        res.status(201).json({
            mensagem: 'Cadastro realizado com sucesso!'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensagem: 'Erro no servidor.'
        });

    }

});


// ==========================
// LOGIN
// ==========================

router.post('/login', async (req, res) => {

    console.log('LOGIN RECEBIDO');
    console.log(req.body);

    try {

        const {
            email,
            senha
        } = req.body;

        const [usuarios] = await db.execute(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensagem: 'Email ou senha inválidos.'
            });
        }

        const usuario = usuarios[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                mensagem: 'Email ou senha inválidos.'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensagem: 'Erro no servidor.'
        });

    }

});

module.exports = router;