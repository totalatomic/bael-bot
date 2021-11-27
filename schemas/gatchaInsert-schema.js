const  mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const GotchaInsertSchema = mongoose.Schema({
    index: Number,
    name: reqString,
    description: reqString,
    Url: reqString,
    verified: Boolean,
    weight: Number
})

module.exports = mongoose.model('gatchaOptions', GotchaInsertSchema);