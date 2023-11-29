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

export const create = async (user) => {
    await dbConnection();
    const createdUser = await User.create(user);
    
    return createdUser;
}
