//SERA EL ENCARGADO DE MANEJAR EL MODELO DE DATOS

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

//obtener el cascaron de esquemas de mongoose

let Schema = mongoose.Schema;

//ahora definimos nuestro esquema

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    password: {
        type: String,

        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password; //YA TENGO UN OBJETO QUE NO TIENE LA CONTRASEÑA

    return userObject;

}

//DECIRLE AL ESQUEMA QUE USE UN PLUGGIN EN PARTICULAR

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);