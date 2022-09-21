const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

schema.virtual('hearts', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('adrenals', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('chests', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})

schema.virtual('colons', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('genitourinarys', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('kidneys', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})

schema.virtual('livers', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('musculoskeletals', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('neuros', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})

schema.virtual('pancreass', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('smallBowels', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('spleens', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})

schema.virtual('stomachs', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('traumas', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})
schema.virtual('vasculars', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Item'
})

module.exports = mongoose.model('Category', schema)