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
    console.log(req.body.name);
    res.status(201).send(req.body);
})

export default app;
