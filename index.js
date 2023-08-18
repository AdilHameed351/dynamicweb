require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./src/db/conn");
const app = express();
const User = require("./src/models/usermessage");

const port = process.env.PORT || 3000;

// setting the path
const staticPath = path.join(__dirname, "./public");
const templatePath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");

// middleware
app.use("/css", express.static(path.join(__dirname, "./node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "./node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "./node_modules/jquery/dist")));
app.use(express.static(staticPath));
app.use(express.urlencoded({extended: false}));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

// routing
app.get("/", (req, res) => {
    res.render("index");
});

// post a message in a database
app.post("/contact", async(req, res) => {
    try {
        const contactMessage = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        });
        
        const sentMessage = await contactMessage.save();
        res.status(201).render("index");

    }catch(error) {
        res.status(500).send(error);
    }
});

// server create
app.listen(port, (req, res) => {
    console.log(`Server is running on port no. ${port}`);
});