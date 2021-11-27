const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const gatchaSchema = mongoose.Schema({
    userid: reqString,
    wallet: Number
})

module.exports = mongoose.model('currency', gatchaSchema);