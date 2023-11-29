import { Router } from "express";
import { me, create, all, login} from "../services/user.js";

const userRoute = Router();

userRoute.get('/', async (req, res) => {
    res.send(await all());
});

userRoute.get('/me/:id', async (req, res) => {
    let user;
    console.log(req.params.id);
    if (user = await me(req.params.id)) {
        res.status(200).send(user);
    } else {
        res.status(200).send({ erro: "Usuário não encontrado!" });
    }
});

userRoute.post('/signin', async (req, res) => {
    try {

        let user;
        user = await login(req.body);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ err });
    }

});

userRoute.post('/signup', async (req, res) => {
    try {
        let user = await create(req.body);
        res.status(201).send(user);

    } catch (err) {
        if (err.code == 11000) {
            res.status(400).send({ msg: "E-mail já cadastrado!" });
        }
        res.status(400).send({ err });
    }
})

export default userRoute;