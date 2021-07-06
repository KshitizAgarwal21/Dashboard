const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const port = 3000 || process.env.port;
const mongoose = require("mongoose");
const REGISTER_SCHEMA = require('./Schema/register_schema');
const USAGE_SCHEMA = require('./Schema/usageSchema');
app.use(cors());
app.use(express.json());
const uploadFile = require("./middleware/upload");
// var userData = {
//     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtaWtlc3RhbkBoaWtlLmNvbSIsIm5hbWUiOiJNaWtlIFN0YW4iLCJpYXQiOjE1MTYyMzkwMjJ9.XSDPzJGG49vqVaXIOtxhL5EkSqbOn_jO3lW0mpE0WOE",
//     phone: 99181
// };
const devURL = 'mongodb://localhost:27017/dashboard';
const prodURL = "mongodb+srv://Kshitiz_Agarwal:FJ9EiIfKDWGb6nzS@cluster0.mkzhm.mongodb.net/Dashboard?retryWrites=true&w=majority";
mongoose.connect(prodURL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
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
                        Image: result.Image,
                        uid: result._id
                    }

                    var token = jwt.sign(tokenBody, "mysalt");

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
    if (req.headers.authorization == null) {
        res.status(400).send({ msg: "Unauthorised Request" });
    }
    else {
        const user = jwt.verify(req.headers.authorization, "mysalt");

        const result = await USAGE_SCHEMA.findOne({ uid: user.uid });
        if (result == null) {
            res.status(400).send({ msg: "No data available right now" });
        }
        else {
            //Start of Code block=> Code to sort the result array according to days of week
            const sorter = {
                "monday": 1,
                "tuesday": 2,
                "wednesday": 3,
                "thursday": 4,
                "friday": 5,
                "saturday": 6,
                "sunday": 7
            }
            result.usage.sort(function sortByDay(a, b) {
                let day1 = a.day.toLowerCase();
                let day2 = b.day.toLowerCase();
                return sorter[day1] - sorter[day2];
            });
            // End of code block
            res.status(200).send({ result: result });
        }
    }
})

app.get('/api/getusers', async (req, res) => {
    const result = await REGISTER_SCHEMA.find({}, { Name: 1, Email: 1, Image: 1, _id: 0 });
    res.status(200).send({ 'data': result });
})

app.post('/api/upload', async (req, res, next) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        const uid = jwt.verify(req.headers.authorization, "mysalt").uid;
        REGISTER_SCHEMA.findOneAndUpdate({ _id: uid }, { $set: { Image: uid } }, (err, result) => {
            console.log("image updated");
        });
        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }


})