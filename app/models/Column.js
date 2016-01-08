var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ColumnSchema   = new Schema({
    name: String,
    order: Number
});

module.exports = mongoose.model('Column', ColumnSchema);