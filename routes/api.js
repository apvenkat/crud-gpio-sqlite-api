var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/sqlitedb.db');

//Add Device
router.post('/api',function(req ,res){
  res.setHeader("Access-Control-Allow-Origin", "*");

var pin = req.body.pin;
var name = req.body.name;
var type = req.body.type;
var description = req.body.description;
var value = req.body.value;



var sql = `insert into gpiolist (name, description,pin, type, value)
      VALUES
      (?,?,?, ?, ?);`;

var values = [name,description,pin,type, value];

db.serialize(function () {
  db.run(sql, values, function (err) {
      if (err){
          console.error(err);
          res.status(500).send(err);
      }

      else
          res.send();
  });
});
});

//Get devices
router.get('/api',function(req ,res){
  processData(res, "SELECT * FROM gpiolist" );
});
router.get('/api/id/:id',function(req ,res){
processData(res, "SELECT * FROM gpiolist where id == "+req.params.id);
});


  function processData(res, sql){
  db.serialize(function() {
    db.all(sql,
      function(err, rows) {
        if(err){
          console.error(err);
          res.status(500).send(err);
        }
        else
          sendData(res, rows, err);
    });
  });
}

function sendData(res, data, err){
  res.setHeader("Access-Control-Allow-Origin","*");

  if(data[0])
    res.send(data);

  else{
    res.status(404).send("Device not found");
  }
}

//Delete Device
router.delete('/api/delete/:id',function(req ,res){
  res.setHeader("Access-Control-Allow-Origin", "*");
var id=req.params.id;
if(!id){
        res.status(400).send("ID is mandatory");
    }
    else{
    var sql = `delete from  gpiolist where id = ?;`;
    var values = [id];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err){
                console.error(err);
                res.status(500).send(err);
            }
            else
                res.send();
        });
    });
}
});

//Update device
router.put('/api/id/:id',function(req ,res){
  res.setHeader("Access-Control-Allow-Origin", "*");

  var pin = req.body.pin;
  var description = req.body.description;
      var name = req.body.name;
      var value = req.body.value;
      var id = req.params.id;

      var sql = `update gpiolist
              set pin = ?, description = ?, name = ?, value = ?
              where id = ?;`;

      var values = [pin,description, name, value, id];

      db.serialize(function () {
          db.run(sql, values, function (err) {
              if (err){
                  console.error(err);
                  res.status(500).send(err);
              }
              else
                  res.send();
          });
      });
});




module.exports = router;
