import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { } from 'dotenv/config';

import { me, create, all, login } from "../services/user.js";

const userRoute = Router();

userRoute.get('/', checkToken, async (req, res) => {
    res.status(200).send(await all());
});

userRoute.get('/:id', checkToken, async (req, res) => {
    let user;
    console.log(req.params.id);
    if (user = await me(req.params.id)) {
        res.status(200).send(user);
    } else {
        res.status(200).send({ messagem: "Usuário não encontrado!" });
    }
});

function checkToken(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Não autorizado!" });
    }

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);

        next();
    } catch (err) {
        return res.status(401).json({ message: "Sessão inválida!" });
    }
}

userRoute.post('/signin', async (req, res) => {
    try {
        const { email, senha } = req.body;

        let token = await login({ email, senha });
        res.status(200).json(token);
    } catch (err) {
        res.status(401).send({ messagem: "E-mail e/ou senha inválidos!" });
    }

});

userRoute.post('/signup', async (req, res) => {

    const { nome, email, senha, telefones } = req.body;

    try {
        
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        let user = await create({ nome, email, senha: senhaHash, telefones });
        res.status(201).send(user);
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ messagem: "E-mail já existente" });
        }
        return res.status(400).json(err);

    }


})

export default userRoute;