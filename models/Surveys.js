var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
    title: String,
    q1: String,
    q2: String,
    q3: String,
    active: Boolean
});


module.exports = mongoose.model('Survey', SurveySchema);
