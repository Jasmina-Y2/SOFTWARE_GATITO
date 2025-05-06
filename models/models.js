const db = require("../database/database")

class User {

    constructor() {
    } 
    async ValidarUsuario(email, password) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM usuario WHERE email = ? AND contraseña = ?", [email, password], (err, result) => {
                let usuariosRoles = [];
                if (err) {
                    console.log("Ha ocurrido un error", err);
                    reject('Error en la consulta');
                    return;
                }    
                if (result.length === 0) {
                    reject('Correo electrónico o contraseña incorrectos.');
                    return;
                }
                for (let i = 0; i < result.length; i++) {
                    let usuarioRol = result[i].rol;
                    usuariosRoles.push(usuarioRol);
                    console.log("USUARIO ROL: "+usuariosRoles);
                }
                let data = {
                    user: result[0],
                    roles: usuariosRoles
                }
                //console.log(data);
                resolve(data);
            });
        });
    }
    async obtenerDatosPorDni(dni) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM usuario WHERE dni = ?", [dni], (err, result) => {
                if (err) {
                    console.log("Ha ocurrido un error", err);
                    reject('Error en la consulta');
                }
            
                if (result.length === 0) {
                    reject('No se encontraron usuarios con el DNI proporcionado.');
                }
                const roles = result.map(usuario => usuario.rol);
                let data = {
                    user: result[0],
                    roles: roles
                }
                console.log(data);
                resolve(data);    
            });
        });
    }
  }

module.exports = User;