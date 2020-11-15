var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    a1: String,
    a2: String,
    a3: String,
    qid:string
});


module.exports = mongoose.model('Answer', AnswerSchema);
