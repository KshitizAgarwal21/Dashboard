const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const port = 8080 || process.env.port;
const mongoose = require("mongoose");
const REGISTER_SCHEMA = require('./Schema/register_schema');
app.use(cors());
app.use(express.json());
var userData = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtaWtlc3RhbkBoaWtlLmNvbSIsIm5hbWUiOiJNaWtlIFN0YW4iLCJpYXQiOjE1MTYyMzkwMjJ9.XSDPzJGG49vqVaXIOtxhL5EkSqbOn_jO3lW0mpE0WOE",
    phone: 99181
};
mongoose.connect('mongodb://localhost:27017/dashboard', { useNewUrlParser: true });
app.listen(port, () => {

    console.log("Server up and running listening at " + port);
});

app.post("/api/registeruser", (req, res) => {
    const find = REGISTER_SCHEMA.findOne({ Email: req.body.Email }, async (err, searchResult) => {
        if (err) console.log(err);
        if (!searchResult) {
            const user = new REGISTER_SCHEMA(req.body);
            console.log(user);
            try {
                const result = await user.save();
                if (result) res.status(200).send({ msg: "Registration successful" });
            }
            catch (e) {
                console.log(e);
                res.status(500).send({ msg: "Bad Request" });
            }
        }
        else {
            res.status(200).send({ msg: "Already exists" });
        }
    })

});

app.post("/api/login", async (req, res) => {
    const search = await REGISTER_SCHEMA.findOne({ Email: req.body.email }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            if (result != null) {
                if (req.body.password == result.Password) {
                    var tokenBody = {
                        Name: result.Name,
                        Email: result.Email
                    }
                    var token = jwt.sign(tokenBody, "mysalt");
                    console.log(token);
                    res.status(200).send({ token: token });
                }
                else {
                    res.status(200).send({ msg: "Invalid credentials" });
                }
            }
            else {
                res.status(200).send({ msg: "Email not found" })
            }
        }
    });
});