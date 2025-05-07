const express = require("express");
const Router = express.Router();
const { User, SolicitudModel } = require("../models/models");
const docx = require("docx");
const path = require("path");
const fs = require("fs");
const { Console } = require("console");
const DocumentGenerator2 = require("../services/Service");

const solicitudModel = new SolicitudModel();

Router.get("/", (req, res) => {
  res.render("inicio2.ejs");
});
Router.get("/login/", (req, res) => {
  res.render("login", { error: null });
});
Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const Usuarios = new User();

  try {
    const existe = await Usuarios.ValidarUsuario(email, password);

    if (existe) {
      let { user, roles } = existe;

      req.flash("data_user", user);
      //console.log(roles);
      req.flash("data_roles", roles);
      req.flash("ruta", "con");

      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error("Error encontrado:", error);
    res.render("login", { error });
  }
});

Router.get("/dashboard/", async(req, res) => {
  const data_user = req.flash("data_user")[0];
  const usuariosRoles = req.flash("data_roles");
  const ruta = req.flash("ruta");

  const Expedientes = await solicitudModel.obtenerExpediente()
  console.log("EXPEDIENTES: "+Expedientes)
  if (!data_user || !usuariosRoles) {
    req.flash("error", "Debes iniciar sesión primero.");
    return res.render("Error");
  }

  //console.log("USUARIO ROL2 : "+usuariosRoles);
  res.render("Dashboard", {
    data: usuariosRoles,
    data_user,
    currentRoute: ruta,
  });



});
Router.get("/GenerarInforme", (req, res) => {
  res.render("GenerarInforme.ejs");
});
Router.get("/Generaresquela", (req, res) => {
  res.render("Generaresquela.ejs");
});
Router.get("/dashboard_dir/:dni", async (req, res) => {
  const dni = req.params.dni;
  const Usuarios = new User();
  const existe = await Usuarios.obtenerDatosPorDni(dni);

  let { user, roles } = existe;

  req.flash("data_user", user);
  req.flash("data_roles", roles);
  req.flash("ruta", "dir");

  res.redirect("/Director");
});
Router.get("/dashboard_con/:dni", async (req, res) => {
  const dni = req.params.dni;

  const Usuarios = new User();
  const existe = await Usuarios.obtenerDatosPorDni(dni);
  if (existe) {
    let { user, roles } = existe;

    req.flash("data_user", user);
    req.flash("data_roles", roles);
    req.flash("ruta", "con");

    res.redirect("/dashboard");
  } else {
    res.render("error", {
      mensaje: "No se encontraron datos para el DNI proporcionado.",
    });
  }
});
Router.get("/Director", (req, res) => {
  const data_user = req.flash("data_user")[0];
  const usuariosRoles = req.flash("data_roles");
  const ruta = req.flash("ruta");

  if (!data_user || !usuariosRoles) {
    req.flash("error", "Debes iniciar sesión primero.");
    return res.render("Error.ejs");
  }
  res.render("Director", {
    data: usuariosRoles,
    data_user,
    currentRoute: ruta,
  });
});
Router.get("/solicitud", (req, res) => {
  res.render("formulario");
});

Router.post("/generar-solicitud", async (req, res) => {
  try {
   
    const {
      fecha,
      nom_solicitante,
      dni_solicitante,
      dom_solicitante,
      nom_apoderado,
      dom_apoderado,
      nom_invitado,
      dom_invitado,
      des_hechos,
      detalles_adic,
      pretensiones,
    } = req.body;

    // Obtener el último ID de expediente
    const ultimoID = await solicitudModel.obtenerUltimoExpediente();
    const newExpediente = ultimoID ? ultimoID + 1 : 1;

    // Preparar los datos para la nueva solicitud
    const data = {
      ID_Expediente: newExpediente,
      fecha,
      nom_solicitante,
      dni_solicitante,
      dom_solicitante,
      nom_apoderado,
      dom_apoderado,
      nom_invitado,
      dom_invitado,
      des_hechos,
      detalles_adic,
      pretensiones,
    };

    // Crear la solicitud en la base de datos
    const results = await solicitudModel.createSolicitud(data);
    //console.log(results)
    // Si la solicitud se ha creado correctamente, generar el documento
    const docBuffer = await DocumentGenerator2.generarDocumento(data);

    // Enviar el archivo generado como respuesta
    res.setHeader("Content-Disposition", "attachment; filename=solicitud.docx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(docBuffer);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    res.status(500).send("Hubo un problema al procesar la solicitud.");
  }
});







module.exports = Router;
