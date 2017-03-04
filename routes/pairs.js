var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var request = require('request');
var querystring = require('querystring');


var url = 'https://my-assortment-pair.cfapps.io/';

function cleanHeaders(requestHeaders) {
    delete requestHeaders.host;
    return requestHeaders;
}
//Get all developers
router.get('/developers', function(req, res, next) {
  request.get(url + 'developers', function (err, remoteResponse, remoteBody) {
    if (err) {
        error(method, action, remoteResponse, err);
        return res.status(500).end('Error getting developers');
    }
    res.writeHead(remoteResponse.statusCode, remoteResponse.headers);
    res.end(remoteBody);
  });
});

//CREATE PAIR
router.post('/new', function(req, res, next){
  var content = querystring.stringify(req.body);
  request.post(
      'https://my-assortment-pair.cfapps.io/pairs',
      { json: req.body},
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log('Undefined',body)
          }
          res.write(content);
          res.end();
      }
  );
})

//Delete Pair
router.post('/delete', function(req, res, next){
  request.delete(req.body.href, function (err, remoteResponse, remoteBody) {
    if (err) {
        error(method, action, remoteResponse, err);
        return res.status(500).end('Error');
    }
    res.writeHead(remoteResponse.statusCode, remoteResponse.headers);
    res.end(remoteBody);
  });
})

//GET PAIRGROUPS
router.get('/pairGroups', function(req, res, next) {
  request.get(url + 'pairGroups', function (err, remoteResponse, remoteBody) {
    if (err) {
        error(method, action, remoteResponse, err);
        return res.status(500).end('Error getting developers');
    }
    res.writeHead(remoteResponse.statusCode, remoteResponse.headers);
    res.end(remoteBody);
  });
});

//CREATE PAIR GROUP
router.post('/groups', function(req, res, next){
  var content = querystring.stringify(req.body);
  request.post(
      'https://my-assortment-pair.cfapps.io/pairGroups',
      { json: req.body},
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)
          }
          res.write(content);
          res.end();
      }
  );
})



module.exports = router;
