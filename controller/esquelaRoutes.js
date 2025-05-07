const express = require("express");
const router = express.Router();
const esquelaController = require("../controllers/esquelaController");

router.get("/Generaresquela", esquelaController.formulario);
router.post("/generar-esquela", esquelaController.generarEsquela);

module.exports = router;
