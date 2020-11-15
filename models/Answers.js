var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    a1: String,
    a2: String,
    a3: String,
    sid: String
});


module.exports = mongoose.model('Answer', AnswerSchema);
