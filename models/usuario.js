var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre necesario'] },
    email: { type: String, unique: true, required: [true, 'Correo necesario'] },
    password: { type: String, required: [true, 'Pass necesario'] },
    img: { type: String },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = mongoose.model('Usuario', usuarioSchema);