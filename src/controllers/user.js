import { Router } from "express";

const userRoute = Router();

userRoute.get('/me', (req, res) => {
    let message = {
        user: {
            name: "Welen",
            age: 22,
        },
    };
    res.status(200).send(message);
});

userRoute.post('/signup', (req, res) => {
    console.log(req.body.name);
    res.status(201).send(req.body);
})

export default userRoute;