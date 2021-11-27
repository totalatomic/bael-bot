const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}
const reqInt = {
    type: Number,
    required: true
}

const gatchaSchema = mongoose.Schema({
    userid: reqString,
    guildId: reqString,
    urlid: reqString,
    health: reqInt,
    shield: reqInt,
    atc: reqInt,
    lvl: reqInt
})

module.exports = mongoose.model('gatchaTaken', gatchaSchema);