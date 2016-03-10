var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});




request('http://slickdeals.net/', function (error, response, html) {
  var $ = cheerio.load(html);
  var result = [];
  $('.itemImageLink').each(function(i, element){
    var link = $(this).attr('href');
    var title = $(this).attr('title');
    //scrape some stuff, put it in an object and add it to the result array
    result.push({
      title: title,
      link: link
    })
    });
  console.log(result);
});



app.get('/', function(req, res) {
  res.send("You got to the Homepage!")
});


app.get("/scrape", function(req, res) {
  db.animals.find({}, function(err, dbResults) {
    if(err) {
      throw err;
    }
    res.json(dbResults);
  });
});


app.get("/illegal", function(req, res) {
  db.animals.find({}, function(err, dbResults) {
    if(err) {
      throw err;
    }
    res.json(dbResults);
  });
});








app.listen(3000, function() {
  console.log('App running on port 3000!');
});