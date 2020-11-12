var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VacuumSchema = new Schema({
    why: String,
    performance: String,
    hepa: String
});


module.exports = mongoose.model('Vacuum', VacuumSchema);
