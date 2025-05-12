const express = require('express');
const router = express.Router();
const { ActaModel, ExpedienteModel } = require('../models/modelslis');
const docx = require('docx');
const fs = require('fs');
const path = require('path');

// Instancias de los modelos
const actaModel = new ActaModel();
const expedienteModel = new ExpedienteModel();

// Muestra el formulario para generar acta
router.get('/acta', (req, res) => {
  res.render('formulario');
});

// Genera el acta y la guarda en la base de datos
router.post('/generar-acta', (req, res) => {
  const {
    centroNombre,
    centroDireccion,
    conciliadorNombre,
    conciliadorRegistro,
    fecha,
    hora,
    hechos,
    acuerdos
  } = req.body;

  // Validación básica
  if (!centroNombre || !conciliadorNombre || !fecha || !hora) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  const data = {
    ID_Expediente: 11, // Puedes hacerlo dinámico si es necesario
    CentroNombre: centroNombre,
    CentroDireccion: centroDireccion,
    ConciliadorNombre: conciliadorNombre,
    ConciliadorRegistro: conciliadorRegistro,
    Fecha: fecha,
    Hora: hora,
    Hechos: hechos,
    Acuerdos: acuerdos,
  };

  actaModel.createActa(data, (err, result) => {
    if (err) {
      console.error('Error al guardar el acta:', err);
      return res.status(500).send('Error al guardar el acta');
    }

    // Generación del documento Word con el formato del PDF
    const doc = new docx.Document({
      sections: [
        {
          children: [
            new docx.Paragraph({
              text: "FORMATO TIPO DE ACTA DE CONCILIACIÓN POR INASISTENCIA DE AMBAS PARTES A TRAVÉS DE MEDIOS ELECTRÓNICOS U OTROS SIMILARES",
              heading: docx.HeadingLevel.HEADING_1,
              alignment: docx.AlignmentType.CENTER,
              spacing: { after: 300 },
            }),
            new docx.Paragraph({
              text: "(PERSONAS NATURALES)",
              alignment: docx.AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new docx.Paragraph({
              text: `CENTRO DE CONCILIACIÓN: ${centroNombre}`,
            }),
            new docx.Paragraph({
              text: `Dirección: ${centroDireccion}`,
              spacing: { after: 200 },
            }),
            new docx.Paragraph({
              text: `EXP. N° ${data.ID_Expediente}`,
              alignment: docx.AlignmentType.RIGHT,
            }),
            new docx.Paragraph({
              text: `ACTA DE CONCILIACIÓN N° _____ - 20__ - AUDIENCIA REALIZADA A TRAVÉS DE MEDIOS ELECTRÓNICOS`,
              spacing: { after: 200 },
            }),
            new docx.Paragraph({
              text: `En la ciudad de ____________, distrito de ____________, siendo las ${hora} horas del día ${fecha}, ante mí, ${conciliadorNombre}, identificado con Documento Nacional de Identidad Nº ____________, en mi calidad de Conciliador Extrajudicial debidamente autorizado por el Ministerio de Justicia con Registro Nº ${conciliadorRegistro}, se presentaron con el objeto que les asista en la solución de su conflicto las partes solicitante e invitada.`,
              spacing: { after: 200 },
            }),
            new docx.Paragraph({
              text: `INASISTENCIA DE LAS PARTES:`,
              bold: true,
              spacing: { after: 100 },
            }),
            new docx.Paragraph({
              text: `No habiendo asistido ninguna de las partes a la Audiencia de Conciliación realizada a través de medios electrónicos u otros similares convocada, se da por concluida la misma y el procedimiento de conciliación.`,
            }),
            new docx.Paragraph({
              text: `Por esta razón se extiende la presente Acta, dejando expresa constancia que la conciliación no puede realizarse por este hecho.`,
              spacing: { after: 200 },
            }),
            new docx.Paragraph({
              text: `HECHOS EXPUESTOS EN LA SOLICITUD:`,
              bold: true,
            }),
            new docx.Paragraph({
              text: hechos || "No especificado",
              spacing: { after: 200 },
            }),
            new docx.Paragraph({
              text: `DESCRIPCIÓN DE LA(S) CONTROVERSIA(S):`,
              bold: true,
            }),
            new docx.Paragraph({
              text: acuerdos || "No especificado",
              spacing: { after: 300 },
            }),
            new docx.Paragraph({
              text: "________________________",
              spacing: { before: 100 },
            }),
            new docx.Paragraph({
              text: "Firma digital de Conciliador",
            }),
          ],
        },
      ],
    });

    const filename = `acta_${Date.now()}.docx`;
    const filePath = path.join(__dirname, '..', 'Public', filename);

    docx.Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync(filePath, buffer);
      res.download(filePath, filename, (err) => {
        if (err) {
          console.error('Error al descargar el archivo:', err);
        } else {
          fs.unlinkSync(filePath);
        }
      });
    });
  });
});

// Lista todos los expedientes
router.get('/listado', (req, res) => {
  expedienteModel.getAllExpedientes((err, expedientes) => {
    if (err) {
      console.error('Error al obtener los expedientes:', err);
      return res.status(500).send('Error al obtener los expedientes');
    }
    res.render('listado', { expedientes });
  });
});

// Muestra el detalle de un expediente específico
router.get('/expediente/:id', (req, res) => {
  const expedienteId = req.params.id;

  expedienteModel.getExpedienteById(expedienteId, (err, expediente) => {
    if (err) {
      console.error('Error al obtener el expediente:', err);
      return res.status(500).send('Error al obtener el expediente');
    }
    res.render('detallexpediente', { expediente });
  });
});

module.exports = router;
