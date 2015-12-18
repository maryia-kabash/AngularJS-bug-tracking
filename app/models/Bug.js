var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BugSchema   = new Schema({
    name: String,
    type: String,
    summary: String,
    priority: String,
    descr: String,
    project: String
});

module.exports = mongoose.model('Bug', BugSchema);