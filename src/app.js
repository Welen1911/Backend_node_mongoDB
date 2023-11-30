import express from 'express';
import userRoute from './controllers/user.js';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    let message = {
        msg: "Olá, mundo!",
    };
    res.send(message);
})

app.use('/user', userRoute);

app.post('/signup', (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome) {
        res.status(422).json({msg: "Nome é obrigatório!"});
    }
    if (!email) {
        res.status(422).json({msg: "E-mail é obrigatório!"});
    }
    if (!senha) {
        res.status(422).json({msg: "Senha é obrigatório!"});
    }
    res.status(201).send(req.body);
})

export default app;
