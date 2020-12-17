var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var urlSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
});

module.exports = URL = mongoose.model('URL', urlSchema)