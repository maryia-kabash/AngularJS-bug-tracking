var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BoardSchema   = new Schema({
    name: String,
    columns: Array
});

//var ColumnSchema   = new Schema({
//    name: String,
//    order: Number,
//    bugs: [BugSchema]
//});
//
//var BugSchema   = new Schema({
//    name: String,
//    type: String,
//    summary: String,
//    priority: String,
//    descr: String
//});
//
//module.exports = mongoose.model('Bug', BugSchema);
//module.exports = mongoose.model('Column', ColumnSchema);
module.exports = mongoose.model('Board', BoardSchema);