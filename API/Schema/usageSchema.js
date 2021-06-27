const mongoose = require("mongoose");
const usageschema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    ig: [{
        day: {
            type: String,
        },
        duration: {
            type: Number
        }

    }],
    yt: [{
        day: {
            type: String,
        },
        duration: {
            type: Number
        }

    }],
    wa: [{
        day: {
            type: String,
        },
        duration: {
            type: Number
        }

    }]
});

const USAGE_SCHEMA = mongoose.model(usage_data, usageschema);
module.exports = USAGE_SCHEMA;