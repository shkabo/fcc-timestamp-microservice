var express = require('express');
var dateformat = require("dateformat");
var app = express();

var port = process.env.PORT || 8080;

// we need only date for timestamp parameter
app.get('/:date', function (req, res) {
  // nothing passed, return null
  if (! req.params.date) {
    res.json({
        'unix' : null,
        'natural' : null
      });
  }
  console.log(req.params.date);
  // hack to ignore favicon.ico requests
  if (req.params.date === 'favicon.ico') {
    return null;
  }

  // let's see what we got
  if ( isNaN(+req.params.date) ) {

    // we assume we got string date passed  
    try {
      var d = new Date(req.params.date);
      if (!validDate(d)) throw "invalid date";
      
      res.json({
        'unix' : d.valueOf(),
        'natural' : req.params.date
      });
    } catch (err){

      // an error occured 
      res.json({
        'unix' : null,
        'natural' : null
      });
      
    }
  } else {

    // we got unix date passed
    try {
      var d = new Date(+req.params.date);
      if (!validDate(d)) throw "invalid date";
      
      res.json({
        'unix' : +req.params.date,
        'natural' : dateformat(d, 'longDate')
        });
    } catch (err) {

      console.error(err);
      // an error occured 
      res.json({
        'unix' : null,
        'natural' : null
      });
    }
  }
});

var server = app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});

function validDate(date) {
  if ( Object.prototype.toString.call(date) === "[object Date]") {
    if ( isNaN( date.getTime() ) ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

module.exports = server;