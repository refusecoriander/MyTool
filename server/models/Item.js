const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    year: { type: String },
    month: { type: String },
    data: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    optionA: { type: String },
    optionB: { type: String },
    optionC: { type: String },
    optionD: { type: String },
}, {
    timestamps: true
})
module.exports = mongoose.model('Item', schema)