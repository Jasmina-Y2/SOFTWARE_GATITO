const db = require("../database/database");

class SolicitudModel {
  // Obtener el último expediente
  async obtenerUltimoExpediente() {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT ID_Expediente FROM solicitud ORDER BY ID_Expediente DESC LIMIT 1";
      db.query(query, (error, results) => {
        if (error) {
          console.error("Error al obtener el último expediente:", error);
          return reject("Error en la consulta");
        }
        if (results.length > 0) {
          const ultimoID = results[0].ID_Expediente;
          resolve(ultimoID);
        } else {
          resolve(null); // No hay registros
        }
      });
    });
  }
  // Crear una nueva solicitud
  async createSolicitud(data) {
    return new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO solicitud 
            (ID_Expediente, fecha, nom_solicitante, dni_solicitante, dom_solicitante, 
             nom_apoderado, dom_apoderado, nom_invitado, dom_invitado, des_hechos, 
             detalles_adic, pretensiones)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
      const values = [
        data.ID_Expediente,
        data.fecha,
        data.nom_solicitante,
        data.dni_solicitante,
        data.dom_solicitante,
        data.nom_apoderado,
        data.dom_apoderado,
        data.nom_invitado,
        data.dom_invitado,
        data.des_hechos,
        data.detalles_adic,
        data.pretensiones,
      ];

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("Error al crear solicitud:", err);
          return reject("Error en la consulta");
        }

        // ✅ Esta línea es necesaria para que la promesa se resuelva
        resolve(results);
      });
    });
  }
  async obtenerExpediente() {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT ID_Expediente FROM solicitud ORDER BY ID_Expediente";
      db.query(query, (error, results) => {
        if (error) {
          console.error("Error al obtener el último expediente:", error);
          return reject("Error en la consulta");
        }
        if (results.length > 0) {
          const ultimoID = results[0].ID_Expediente;
          resolve(ultimoID);
        } else {
          resolve(null); // No hay registros
        }
      });
    });
  }
}

class User {
  constructor() {}
  async ValidarUsuario(email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM usuario WHERE email = ? AND contraseña = ?",
        [email, password],
        (err, result) => {
          let usuariosRoles = [];
          if (err) {
            console.log("Ha ocurrido un error", err);
            reject("Error en la consulta");
            return;
          }
          if (result.length === 0) {
            reject("Correo electrónico o contraseña incorrectos.");
            return;
          }
          for (let i = 0; i < result.length; i++) {
            let usuarioRol = result[i].rol;
            usuariosRoles.push(usuarioRol);
            console.log("USUARIO ROL: " + usuariosRoles);
          }
          let data = {
            user: result[0],
            roles: usuariosRoles,
          };
          //console.log(data);
          resolve(data);
        }
      );
    });
  }
  async obtenerDatosPorDni(dni) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM usuario WHERE dni = ?", [dni], (err, result) => {
        if (err) {
          console.log("Ha ocurrido un error", err);
          reject("Error en la consulta");
        }

        if (result.length === 0) {
          reject("No se encontraron usuarios con el DNI proporcionado.");
        }
        const roles = result.map((usuario) => usuario.rol);
        let data = {
          user: result[0],
          roles: roles,
        };
        console.log(data);
        resolve(data);
      });
    });
  }

  // 
}

module.exports = { User, SolicitudModel };
