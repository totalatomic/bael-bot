const mongoose = require('mongoose');
const reqString = {
    type: String,
    required: true
}

const muteSchema = mongoose.Schema({
    userId: reqString,
    reason: String,
    staffId: reqString,
    staffTag: String,
    expires: {
        type: Date,
        required: true
    },
    current: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('muted', muteSchema)