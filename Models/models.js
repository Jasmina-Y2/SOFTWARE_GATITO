// models.js
const db = require('../DataBase/database');

class ActaModel {
  /**
   * Inserta una nueva acta en la base de datos.
   * @param {Object} data - Datos del acta.
   * @param {Function} callback - Callback con error o resultados.
   */
  createActa(data, callback) {
    const sql = `
      INSERT INTO Actas (
        ID_Expediente, CentroNombre, CentroDireccion,
        ConciliadorNombre, ConciliadorRegistro,
        Fecha, Hora, Hechos, Acuerdos
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      data.ID_Expediente,
      data.CentroNombre,
      data.CentroDireccion,
      data.ConciliadorNombre,
      data.ConciliadorRegistro,
      data.Fecha,
      data.Hora,
      data.Hechos,
      data.Acuerdos,
    ];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error al insertar acta:", err);
        return callback(err);
      }
      callback(null, results);
    });
  }
}
 
class ExpedienteModel {
  /**
   * Obtiene un expediente específico por su ID.
   * @param {Number} id - ID del expediente.
   * @param {Function} callback - Callback con error o resultado.
   */
  getExpedienteById(id, callback) {
    const sql = 'SELECT * FROM solicitud WHERE ID_Expediente = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error("Error al obtener expediente:", err);
        return callback(err);
      }
      callback(null, results[0]);
    });
  }

  /**
   * Obtiene todos los expedientes disponibles.
   * @param {Function} callback - Callback con error o resultados.
   */
  getAllExpedientes(callback) {
    const sql = 'SELECT * FROM solicitud';
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error al obtener expedientes:", err);
        return callback(err);
      }
      callback(null, results);
    });
  }
}

module.exports = {
  ActaModel,
  ExpedienteModel,
};
