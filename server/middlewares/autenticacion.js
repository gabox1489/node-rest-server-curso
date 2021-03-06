const jwt = require('jsonwebtoken');


//VERIFICAR EL TOKEN

let verificacion = (req, res, next) => {

    let token = req.get('token');

    //UTILIZAMOS LA FUNCION QUE NOS PROVEE JSONWEBTOKEN PARA VALIDAR :
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//VERIFICAMOS ADMIN ROL

let verificaAdmin_role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};

module.exports = {
    verificacion,
    verificaAdmin_role
}