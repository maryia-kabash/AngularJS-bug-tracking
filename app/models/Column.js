var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ColumnSchema   = new Schema({
    name: String,
    order: Number,
    bugs: [{
        type: Schema.Types.ObjectId,
        ref: 'Bug'
    }]
});

module.exports = mongoose.model('Column', ColumnSchema);