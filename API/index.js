const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const port = 8080 || process.env.port;
const mongoose = require("mongoose");
const REGISTER_SCHEMA = require('./Schema/register_schema');
const USAGE_SCHEMA = require('../API/Schema/usageSchema');
const { useSerialIds } = require("highcharts");
app.use(cors());
app.use(express.json());
var userData = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtaWtlc3RhbkBoaWtlLmNvbSIsIm5hbWUiOiJNaWtlIFN0YW4iLCJpYXQiOjE1MTYyMzkwMjJ9.XSDPzJGG49vqVaXIOtxhL5EkSqbOn_jO3lW0mpE0WOE",
    phone: 99181
};
mongoose.connect('mongodb://localhost:27017/dashboard', { useNewUrlParser: true, useFindAndModify: false });
app.listen(port, () => {

    console.log("Server up and running listening at " + port);
});

app.post("/api/registeruser", (req, res) => {
    const find = REGISTER_SCHEMA.findOne({ Email: req.body.Email.toLowerCase() }, (err, searchResult) => {
        if (err) console.log(err);
        if (!searchResult) {
            const user = new REGISTER_SCHEMA(req.body);
            console.log(user);
            try {
                const result = user.save();
                if (result) res.status(200).send({ msg: "Registration successful" });
            }
            catch (e) {
                console.log(e);
                res.status(500).send({ msg: "Bad Request" });
            }
        }
        else {
            res.status(400).send({ msg: "Email already exists" });
        }
    })

});

app.post("/api/login", async (req, res) => {
    console.log(req.headers.authorization);
    const search = await REGISTER_SCHEMA.findOne({ Email: req.body.Email.toLowerCase() }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            if (result != null) {
                if (req.body.Password === result.Password) {
                    var tokenBody = {
                        Name: result.Name,
                        Email: result.Email,
                        uid: result._id
                    }

                    var token = jwt.sign(tokenBody, "mysalt");
                    console.log(token);
                    res.status(200).send({ token: token });
                }
                else {
                    res.status(400).send({ msg: "Invalid credentials" });
                }
            }
            else {
                res.status(400).send({ msg: "Email not found" })
            }
        }
    });
});

app.post('/api/addusage', async (req, res) => {

    const { uid, day, insta, youtube, whatsapp } = req.body;
    console.log(uid);
    var data = {
        uid: uid,
        usage: { day, whatsapp, insta, youtube }
    }
    const result = await USAGE_SCHEMA.findOne({ uid: uid })
    if (result == null) {
        //const usage = result.usage.filter(item => item.day != day)
        USAGE_SCHEMA(data).save();
        res.status(200).send({ 'msg': "Data added for the user" });
    }
    else {
        const dayResult = await USAGE_SCHEMA.findOne({ uid: uid, "usage.day": day })
        if (dayResult == null) {
            const addDay = await USAGE_SCHEMA.findOneAndUpdate({ uid: uid }, {
                $push: {
                    usage: { day: day, insta: insta, youtube: youtube, whatsapp: whatsapp },
                }
            })
            res.status(200).send({ 'msg': "Data for new day added successfully" })
        }
        else {
            const addDay = await USAGE_SCHEMA.findOneAndUpdate({ uid: uid, "usage.day": day }, {
                $set: { "usage.$": { day: day, whatsapp: whatsapp, insta: insta, youtube: youtube } }
            })
            res.status(200).send({ 'msg': "Data for the day updated successfully" });
        }
    }
})

app.get('/api/getdata', async (req, res) => {
    const user = jwt.verify(req.headers.authorization, "mysalt");
    console.log(user.uid);

    const result = await USAGE_SCHEMA.find({ uid: user.uid });
    console.log(result);

})