import { MongooseError } from "mongoose";
import jwt from "jsonwebtoken";

import dbConnection from "../utils/database.js";
import User from "../models/user.js";
import { } from 'dotenv/config';

export const all = async () => {
    await dbConnection();
    const user = await User.find();
    return user;
}

export const me = async (id) => {
    await dbConnection();
    const user = await User.findById(id);

    return user;
}

export const login = async (user) => {
    await dbConnection();

    let userLogged = await User.findOne({ email: user.email });

    if (userLogged.nome != null) {

        if (userLogged.senha == user.senha) {
            try {
                userLogged = await User.findByIdAndUpdate(userLogged._id, { ultimo_login: Date.now() }, {
                    new: true
                });
            } catch (err) {
                console.log(err);
            }

            const secret = process.env.SECRET;

            try {
                const token = jwt.sign({
                    id: userLogged._id.toString()
                }, secret, {
                    expiresIn: "60s"
                });
                return {
                    id: userLogged._id, 
                    data_criacao: userLogged.data_criacao, 
                    data_atualizacao: userLogged.data_atualizacao,
                    ultimo_login: userLogged.ultimo_login, 
                    token: token
                };

            } catch (err) {
                console.log(err);
            }
        } else {
            return new MongooseError("Senha inválida!");
        }

    } else {
        return new MongooseError("Usuário não encontrado!");
    }
}

export const create = async (user) => {
    await dbConnection();
    const createdUser = await User.create(user);
    const secret = process.env.SECRET;

    try {
        const token = jwt.sign({
            id: createdUser._id.toString()
        }, secret, {
            expiresIn: "60s"
        });
        return {
            id: createdUser._id, 
            data_criacao: createdUser.data_criacao, 
            data_atualizacao: createdUser.data_atualizacao,
            ultimo_login: createdUser.ultimo_login, 
            token: token
        };

    } catch (err) {
        console.log(err);
    }
}
