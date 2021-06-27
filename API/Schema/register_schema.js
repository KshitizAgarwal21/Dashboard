const mongoose = require('mongoose');
const schema = mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        lowercase: true
    },
    Password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    ig: {
        day: {
            type: String,
        },
        time: {
            type: Number
        }

    },
    yt: {
        day: {
            type: String,
        },
        time: {
            type: Number
        }

    },
    wa: {
        day: {
            type: String,
        },
        time: {
            type: Number
        }

    }
});
const REGISTER_SCHEMA = mongoose.model("USER_DATA", schema);
module.exports = REGISTER_SCHEMA;