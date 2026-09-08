import mongoose from "../db/conn.js";
const {Schema} = mongoose;
const usuarioSchema = new Schema({
    nome:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true
    },
    senha:{
        type:String,
        required:true,
        select:false
    },
    resetToken:{
        type:String,
        select:false,
    },
    resetTokenExpiry:{
        type:Date,
        select:false,
    }
},{timestamps:true});
const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;