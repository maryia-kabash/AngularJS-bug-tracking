var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BugSchema   = new Schema({
    name: String,
    type: String,
    summary: String,
    priority: String,
    descr: String,
    project: String,
    column: {
        type: Schema.Types.ObjectId,
        ref: 'Column'
    }
});

module.exports = mongoose.model('Bug', BugSchema);