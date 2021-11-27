const { mongo, Mongoose } = require("mongoose");
const config = require('../config.json')

const mongoose = require('mongoose');
//

module.exports = async () => {
    await mongoose.connect(config.mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    });
    return mongoose;
}