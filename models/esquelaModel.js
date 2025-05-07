const db = require('../database/db');

class EsquelaModel {
  async createEsquela(data) {
    const {
      fecha,
      nombre_partes,
      asunto,
      contenido,
      archivo_nombre
    } = data;

    const query = `
      INSERT INTO esquela (fecha, nombre_partes, asunto, contenido, archivo_nombre)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [results] = await db.execute(query, [
      fecha,
      nombre_partes,
      asunto,
      contenido,
      archivo_nombre,
    ]);

    return results;
  }
}

module.exports = EsquelaModel;
