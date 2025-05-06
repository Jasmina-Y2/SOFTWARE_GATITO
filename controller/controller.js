const express = require("express");
const Router = express.Router();
const User = require("../models/models");

Router.get("/",(req,res)=>{
    res.render("inicio2.ejs")
})
Router.get("/login/",(req,res)=>{
    res.render("login",{error:null});
})
Router.post("/login",async(req,res)=>{
    const { email, password} = req.body;
    
    const Usuarios = new User();

    try {
        const existe = await Usuarios.ValidarUsuario(email,password)

        if (existe) {
            let { user, roles } = existe;

            req.flash('data_user', user); 
            //console.log(roles);
            req.flash('data_roles', roles); 
            req.flash('ruta', "con"); 

            res.redirect('/dashboard');
        }
    } catch (error) {
        console.error('Error encontrado:', error);
        res.render('login',{error});
    }

})
Router.get("/dashboard/",(req,res)=>{    
    const data_user = req.flash('data_user')[0]; 
    const usuariosRoles = req.flash('data_roles'); 
    const ruta = req.flash('ruta'); 

    if (!data_user || !usuariosRoles) {
        req.flash('error', 'Debes iniciar sesión primero.');
        return res.render("Error");
    }

    //console.log("USUARIO ROL2 : "+usuariosRoles);
    res.render('Dashboard', { data: usuariosRoles, data_user,currentRoute: ruta });
})

Router.get("/GenerarInforme",(req,res)=>{
    res.render("GenerarInforme.ejs");
})
Router.get("/dashboard_dir/:dni",async(req,res)=>{
    const dni = req.params.dni;
    const Usuarios = new User();
    const existe = await Usuarios.obtenerDatosPorDni(dni);
    
    let { user, roles } = existe;

    req.flash('data_user', user); 
    req.flash('data_roles', roles); 
    req.flash('ruta', "dir"); 
    
    res.redirect('/Director');
})
Router.get("/dashboard_con/:dni",async(req,res)=>{
    const dni = req.params.dni; 
    
    const Usuarios = new User();
    const existe = await Usuarios.obtenerDatosPorDni(dni);
    if (existe) {
        let { user, roles } = existe;

        req.flash('data_user', user); 
        req.flash('data_roles', roles); 
        req.flash('ruta', "con"); 
    
        res.redirect('/dashboard');
    } else {
        res.render('error', { mensaje: 'No se encontraron datos para el DNI proporcionado.' });
    }
})
Router.get("/Director",(req,res)=>{
    const data_user = req.flash('data_user')[0]; 
    const usuariosRoles = req.flash('data_roles'); 
    const ruta = req.flash('ruta'); 

    if (!data_user || !usuariosRoles) {
        req.flash('error', 'Debes iniciar sesión primero.');
        return res.render("Error.ejs");
    }
    res.render('Director', { data: usuariosRoles, data_user,currentRoute: ruta });

})

module.exports = Router;