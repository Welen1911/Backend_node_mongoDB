import mongoose from "mongoose";
import {} from 'dotenv/config';

const DBUser = process.env.DB_USER;
const DBPass = process.env.DB_PASS;

const URI = `mongodb+srv://${DBUser}:${DBPass}@desafionode.naxullr.mongodb.net/?retryWrites=true&w=majority`;


const dbConnection = async () => {
    if (!global.mongoose) {
        mongoose.set('strictQuery', false);
        global.mongoose = await mongoose.connect(URI);
    }
}

export default dbConnection;
