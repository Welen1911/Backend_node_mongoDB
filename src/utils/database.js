import mongoose from "mongoose";

const URI = 'mongodb+srv://Welen1911:tyPsfZKhvpsNZDXf@desafionode.naxullr.mongodb.net/?retryWrites=true&w=majority';


const dbConnection = async () => {
    if (!global.mongoose) {
        mongoose.set('strictQuery', false);
        global.mongoose = await mongoose.connect(URI);
    }
}

export default dbConnection;
