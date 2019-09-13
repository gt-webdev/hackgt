import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();

// An array of posts. This is usually in a database
let posts = [
  {
    "title": "Example Post",
    "body": "This is an example Body."
  }
];

// ####################################################
// Set Up Server
// ####################################################
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = 3000;

// ####################################################
// View Routes
// ####################################################
app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});

app.post('/', (req, res) => {
  if (req.body.update) {
    posts[req.body.index] = {
      title: req.body.title,
      body: req.body.body
    }
  } else if (req.body.delete) {
    posts.splice(req.body.index, 1);
  } else {
    posts.push({
      title: req.body.title,
      body: req.body.body
    })
  }
  res.render('index', { posts: posts });
});

// ####################################################
// API Routes
// ####################################################
app.get('/api/posts', (req, res) => {
  res.send(posts);
});

app.get('/api/posts/:id', (req, res) => {
  if (posts[req.params.id]) {
    res.send(posts[req.params.id])
  } else {
    res.status(404).send("Post Not Found.");
  }
});

app.post('/api/posts', (req, res) => {
  posts.push({
    title: req.body.title,
    body: req.body.body
  })
  res.status(201).send("Post Created")
});

app.put('/api/posts/:id', (req, res) => {
  if (posts[req.params.id]) {
    posts[req.params.id] = {
      title: req.body.title,
      body: req.body.body
    }
    res.send("Post Updated")
  } else {
    res.status(404).send("Post Not Found.");
  }
});

app.delete('/api/posts/:id', (req, res) => {
  if (posts[req.params.id]) {
    posts.splice(req.body.index, 1);
    res.send("Post Deleted")
  } else {
    res.status(404).send("Post Not Found.");
  }
});

// ####################################################
// Run Server
// ####################################################

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
