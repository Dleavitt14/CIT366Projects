var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
  maxDocumentId: {type: Number, required: true},
  maxMessageId: {type: String, required: true},
  maxContactsId: {type: String, required: true}
});

module.exports = mongoose.model('Message', schema);
