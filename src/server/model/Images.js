const mongoose = require('mongoose');

const ImagesSchema = mongoose.Schema({
        imgs: [{data: Buffer, ContentType:String}]
});

module.exports = mongoose.model('Images', ImagesSchema);