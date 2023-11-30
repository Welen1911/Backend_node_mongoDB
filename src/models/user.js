import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    telefones: {type: Object},
    data_criacao: {type: Date, required: true, default: Date.now()},
    data_atualizacao: {type: Date, required: true, default: Date.now()},
    ultimo_login: {type: Date},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);