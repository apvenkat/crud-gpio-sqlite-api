const express = require('express');
const app = express();
const port = 4300;

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/sqlitedb.db');
var bodyParser = require("body-parser");

var fs = require('fs');
var sqlSchema = fs.readFileSync('db/gpio-config.sql').toString();

    db.serialize(function() {
        db.run(sqlSchema);
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes/api'));


app.listen(port, () => {
    console.log('Backend NodeJS live on ' + port);
});
