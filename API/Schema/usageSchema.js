const mongoose = require("mongoose");
const usageschema = mongoose.Schema({

    uid: {
        type: String,
        default: "",
        required: true
    },
    usage: {
        type: Array,
        default: [],
        required: true
    }
});

const USAGE_SCHEMA = mongoose.model("USAGE_DATA", usageschema);
module.exports = USAGE_SCHEMA;