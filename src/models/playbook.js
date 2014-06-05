"use strict";


var mongoose = require('mongoose'),
  path = require('path');

var waigo = require('waigo'),
  schema = waigo.load('support/db/mongoose/schema');


var playbookSchema = schema.create({
  name: {
    type: String,
    index: {
      unique: true
    }
  },
  path: String
});



playbookSchema.virtual('fullPath').get(function() {
  var app = waigo.load('application').app;

  return path.join(app.config.ansiblePlaybooksFolder, this.path);
})



module.exports = function(dbConn) {
  return dbConn.model('Playbook', playbookSchema);
}






