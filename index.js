const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');


// MENSAJE PRUEBA
app.use(session({
    secret: 'melanio',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.set("views",__dirname+"/views")
app.set("view engine","ejs")
|
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/",require("./controller/controller.js"))
app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash(); 
    next();
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"),()=>{
    console.log("On port running 3000");
})
