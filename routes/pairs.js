var express = require('express');
var router = express.Router();

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
// get all the movies and return as JSON data
router.get('/', function(req, res, next) {
});
module.exports = router;
