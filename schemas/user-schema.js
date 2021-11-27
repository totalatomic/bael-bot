const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const reqInt = {
    type: Number,
    required: true
}
const reqbool = {
    type: Boolean,
    required: true
}

const userobj = mongoose.Schema({
    userId: reqString,
    guildId: reqString,
    mana: reqInt
 })

module.exports = mongoose.model("userdoc", userobj)