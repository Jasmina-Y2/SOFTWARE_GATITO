const { Document, Packer, Paragraph, TextRun } = require("docx");

class EsquelaService {
  static async generarDocumento(data) {
    const doc = new Document();

    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [new TextRun({ text: `Fecha: ${data.fecha}`, bold: true })],
        }),
        new Paragraph({ text: `Nombre de las partes: ${data.nombre_partes}` }),
        new Paragraph({ text: `Asunto: ${data.asunto}` }),
        new Paragraph({
          text: "Contenido:",
          spacing: { after: 100 },
          heading: "Heading1",
        }),
        new Paragraph({ text: data.contenido }),
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    return buffer;
  }
}

module.exports = EsquelaService;
