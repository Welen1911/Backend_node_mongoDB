import { Router } from "express";
import bcrypt from 'bcrypt';
import { me, create, all, login } from "../services/user.js";

const userRoute = Router();

userRoute.get('/', async (req, res) => {
    res.status(200).send(await all());
});

userRoute.get('/me/:id', async (req, res) => {
    let user;
    console.log(req.params.id);
    if (user = await me(req.params.id)) {
        res.status(200).send(user);
    } else {
        res.status(200).send({ messagem: "Usuário não encontrado!" });
    }
});

userRoute.post('/signin', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email) {
            res.status(422).json({ msg: "E-mail é obrigatório!" });
        }
        if (!senha) {
            res.status(422).json({ msg: "Senha é obrigatório!" });
        }

        let token = await login({email, senha});
        res.status(200).json(token);
    } catch (err) {
        res.status(401).send({ messagem: "E-mail e/ou senha inválidos!" });
    }

});

userRoute.post('/signup', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome) {
            res.status(422).json({ msg: "Nome é obrigatório!" });
        }
        if (!email) {
            res.status(422).json({ msg: "E-mail é obrigatório!" });
        }
        if (!senha) {
            res.status(422).json({ msg: "Senha é obrigatório!" });
        }

        // const salt = await bcrypt.genSalt(12);
        // const senhaHash = await bcrypt.hash(senha, salt);

        let user = await create({ nome, email, senha });
        res.status(201).send(user);

    } catch (err) {
        if (err.code == 11000) {
            res.status(400).send({ messagem: "E-mail já existente" });
        }
        res.status(400).send({ err });
    }
})

export default userRoute;