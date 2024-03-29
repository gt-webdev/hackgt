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
    db = client.db('hackgt');
    collection = db.collection(collectionName);
});

// ####################################################
// View Routes
// ####################################################
displayPosts = function (req, res) {
    collection.find({}).toArray(function(err, posts) {
        if (err) {
            res.status(500).send();
        } else {
            res.render('index', { posts: posts });
        }
    });
};

app.get('/', (req, res) => {
    displayPosts(req, res);
});

app.post('/', (req, res) => {
    if (req.body.update) {
        collection.update({ _id: ObjectID(req.body.id) }, { $set: {title: req.body.title, body: req.body.body} }, function(err, status) {
            if (err) {
                res.status(500).send();
            } else {
                displayPosts(req, res);
            }
        });
    } else if (req.body.delete) {
        collection.deleteOne({ _id: ObjectID(req.body.id) }, function(err, status) {
            if (err) {
                res.status(500).send();
            } else {
                displayPosts(req, res);
            }
        });
    } else {
        collection.insert({
            title: req.body.title,
            body: req.body.body
        }, function(err, status) {
            if (err) {
                res.status(500).send();
            } else {
                displayPosts(req, res);
            }
        });
    }
});

// ####################################################
// Run Server
// ####################################################

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
