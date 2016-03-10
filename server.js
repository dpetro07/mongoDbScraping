var express = require('express');
var mongojs = require('mongojs');
var app = express();


var PORT = process.env.PORT || 8080;
var db = mongojs("zoo", ["animals"]);
db.on("error", function(err) {
  console.error('Database Error', err);
});

app.get('/', function(req, res) {
  res.send("You got animals!")
});


app.get("/animals", function(req, res) {
  db.animals.find({}, function(err, dbResults) {
    if(err) {
      throw err;
    }
    res.json(dbResults);
  });
});


app.get("/animals/weight", function(req, res) {
  db.animals.find().sort({"weight": 1}, function(err, dbResults) {
    if (err) {
      throw err;
    }
    res.json(dbResults);
  });
});


app.get("/animals/name", function(req, res) {
  db.animals.find().sort({"name": 1}, function(err, dbResults) {
    if (err) {
      throw err;
    }
    res.json(dbResults);
  });
});



app.get("/animals/numLegs", function(req, res) {
  db.animals.find().sort({"numLegs": 1}, function(err, dbResults) {
    if (err) {
      throw err;
    }
    res.json(dbResults);
  });
});



app.get("/animals/isMammal", function(req, res) {
  db.animals.find({"class": "mammal"}, function(err, dbResults) {
    if (err) {
      throw err;
    }
    res.json(dbResults);
  });
});








app.listen(PORT, function() {
  console.log("Running on port %s", PORT);
});