import express from 'express';
import userRoute from './controllers/user.js';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    let message = {
        msg: "Olá, mundo!",
    };
    res.send(message);
});

app.use('/user', userRoute);

export default app;
