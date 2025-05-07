const path = require("path");
const fs = require("fs");
const EsquelaModel = require("../models/esquelaModel");
const EsquelaService = require("../services/EsquelaService");

const esquelaModel = new EsquelaModel();

exports.formulario = (req, res) => {
  res.render("GenerarEsquela");
};

exports.generarEsquela = async (req, res) => {
  try {
    const {
      fecha,
      nombre_partes,
      asunto,
      contenido,
    } = req.body;

    const nombreArchivo = `esquela_${Date.now()}.docx`;
    const filePath = path.join(__dirname, "../public/docs", nombreArchivo);

    const docBuffer = await EsquelaService.generarDocumento({
      fecha,
      nombre_partes,
      asunto,
      contenido,
    });

    fs.writeFileSync(filePath, docBuffer);

    await esquelaModel.createEsquela({
      fecha,
      nombre_partes,
      asunto,
      contenido,
      archivo_nombre: nombreArchivo,
    });

    res.setHeader("Content-Disposition", `attachment; filename=${nombreArchivo}`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(docBuffer);
  } catch (error) {
    console.error("Error al generar esquela:", error);
    res.status(500).send("Error al generar la esquela.");
  }
};
