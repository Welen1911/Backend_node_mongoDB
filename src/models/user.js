import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    data_criacao: {type: Date},
    data_atualizacao: {type: Date},
    ultimo_login: {type: Date},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);