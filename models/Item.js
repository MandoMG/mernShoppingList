const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   checked: {
      type: Boolean,
      required: true
   },
   aisleCode: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Item = mongoose.model('item', ItemSchema);