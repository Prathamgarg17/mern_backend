const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn"); // add it just below const app = express();
const Register = require("./models/registers");
const port = process.env.PORT || 3000;
// console.log(path.join(__dirname, "../public")); 
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs")
app.set("views", template_path);

hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/2", (req, res) => {
    res.render("index2")
});
app.get("/login", (req, res) => {
    res.render("login")
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password:   password,
                confirmpassword: cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("login");
        } else {
            res.send("passwords are not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login", async(req, res) => {
    try {
        const email =  req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("index2");
        }else{
            res.send("invalid Email Detail")
        }
        
    } catch (error) {
        res.status(400).send("invalid Email Detail")
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
