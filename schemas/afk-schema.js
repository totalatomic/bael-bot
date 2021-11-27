const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const afkSchema = mongoose.Schema({
    userId: reqString,
    guildId: reqString,
    reason: String
})

module.exports = mongoose.model('afkTable', afkSchema)