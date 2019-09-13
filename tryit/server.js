const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();

// ####################################################
// Set Up Server
// ####################################################
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = 8080;

// ####################################################
// Set Up Database
// ####################################################
const collectionName = 'posts';
const uriString = ''; // your MongoDB url goes here

let collection;
let db;
MongoClient.connect(uriString, function (err, client) {
    if (err) {
        console.log(err);
    }
    console.log("Connected correctly to mongo");
    db = client.db('hackgteeny');
    collection = db.collection(collectionName);
});

// ####################################################
// View Routes
// ####################################################



// ####################################################
// API Routes
// ####################################################



// ####################################################
// Run Server
// ####################################################

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
