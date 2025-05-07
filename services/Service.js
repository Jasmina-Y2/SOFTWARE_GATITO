// services/DocumentGenerator.js
const fs = require("fs");
const path = require("path");

const {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
} = require("docx");

class DocumentGenerator {
  static async generarDocumento(solicitudData) {
    console.log(solicitudData.ID_Expediente);

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "FORMATO TIPO DE SOLICITUD DE CONCILIACION",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              underline: {},
            }),
            new Paragraph({
              text: "CENTRO DE CONCILIACION GILMER",
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: "Autorizado su funcionamiento por Resolución 042022 Nº 124-123",
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: "Dirección y teléfono: Av. Huancavelica - 987654321",
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `EXP. N°: ${solicitudData.ID_Expediente}`,
              alignment: AlignmentType.RIGHT,
              font: { size: 12 },
            }),
            new Paragraph({
              text: "I. DATOS GENERALES:",
              heading: HeadingLevel.HEADING_1,
              bold: true,
            }),
            new Paragraph({
              text: `1. Fecha: ${solicitudData.fecha}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `2. Nombre o razón social del (los) solicitante(s): ${solicitudData.nom_solicitante}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `3. Documento de identidad o RUC del (los) solicitante(s): ${solicitudData.dni_solicitante}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `4. Domicilio de l (los) solicitante(s): ${solicitudData.dom_solicitante}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `5. Nombre del apoderado o representante: ${solicitudData.nom_apoderado}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `6. Domicilio del apoderado o representante: ${solicitudData.dom_apoderado}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `7. Nombre o razón social del (los) invitado(s): ${solicitudData.nom_invitado}`,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: `8. Domicilio (s) del (los) invitado(s): _${solicitudData.dom_invitado}`,
              spacing: { after: 200 },
            }),

            new Paragraph({
              text: "II. HECHOS QUE DIERON LUGAR AL CONFLICTO:",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 200 },
              bold: true,
            }),
            new Paragraph({
              text: `${solicitudData.des_hechos}`,
            }),
            new Paragraph({
              text: "________________________________________________________________________________________",
            }),

            new Paragraph({
              text: "III. OTRAS PERSONAS CON DERECHO ALIMENTARIO:",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 200 },
              bold: true,
            }),
            new Paragraph({
              text: `${solicitudData.detalles_adic}`,
            }),
            new Paragraph({
              text: "________________________________________________________________________________________",
            }),

            new Paragraph({
              text: "IV. PRETENSIÓN:",
              heading: HeadingLevel.HEADING_2,
              bold: true,
              spacing: { before: 300, after: 200 },
            }),
            new Paragraph({
              text: `${solicitudData.pretensiones}`,
            }),
            new Paragraph({
              text: "________________________________________________________________________________________",
            }),

            new Paragraph({
              text: "V. FIRMA DEL SOLICITANTE O HUELLA DIGITAL SEGUN EL CASO: ",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 300 },
              bold: true,
              underline: {},
            }),
            new Paragraph({
              text: "__________________________________",
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: `${solicitudData.nom_solicitante} - ${solicitudData.dni_solicitante}`,
            }),
          ],
        },
      ],
    });
    const buffer = await Packer.toBuffer(doc);
    return buffer; // ✅ Retornamos el buffer, sin guardar ni enviar aún
  }
}

module.exports = DocumentGenerator;
