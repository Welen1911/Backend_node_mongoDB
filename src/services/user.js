import dbConnection from "../utils/database.js";
import User from "../models/user.js";

export const all = async () => {
    await dbConnection();
    const user = await User.find();
    return user;
}

export const me = async (id) => {
    await dbConnection();
    const user = await User.find(id);
    return user;
}

export const login = async (user) => {
    await dbConnection();
    console.log(user);
    const userLogged = await User.findOne({email: user.email});
    if (userLogged) {
        if (userLogged.senha == user.senha) {
            return userLogged;
        }
    } else {
        return new Error("Usuário não encontrado!");
    }
}

export const create = async (user) => {
    await dbConnection();
    const createdUser = await User.create(user);

    return createdUser;
}
