# GT Webdev 05 - NodeJS Tutorial

In this tutorial we'll learn about NodeJS, Express, EJS, and APIs

## 01: Initialize the project
Run the following in your command line and go through the onboarding:
```bash
npm init
```

## 02: Add a log to your server.js file and run it
```
console.log("Hello World!");
```
```bash
node server.js
```

## 03: Use this package.json and install all dependencies
```
{
  "name": "nodejs-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npx babel-node server.js",
    "dev": "npx babel-watch server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.3.3",
    "@babel/node": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "body-parser": "^1.18.3",
    "ejs": "^2.6.1",
    "express": "^4.16.4"
  },
  "devDependencies": {
    "babel-watch": "^7.0.0"
  },
  "babel": {
    "presets": [
      "@babel/preset-env"
    ]
  }
}

```
```bash
npm i
```

## 04: Import our dependencies in server.js
```
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
```

## 05: Set up static serving
```
app.use(express.static(path.join(__dirname, 'public')));
```

## 06: Make the server listen
```
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
```

## 07: EJS Route
```
let posts = [
  {
    "title": "Example Post",
    "body": "This is an example Body."
  }
];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { posts: posts });
});
```

## 08: Dynamic EJS Rendering
In the blank space of index.ejs
```
<% posts.forEach((post, index) => { %>
  <form method="POST" action="/">
    <input type="text" name="title" value="<%= post.title %>" />
    <textarea name="body"><%= post.body %></textarea>
    <input type="hidden" name="index" value="<%= index %>" />
    <div class="buttonRow">
      <input type="submit" value="Delete" name="delete" />
      <input type="submit" value="Update" name="update" />
    </div>
  </form>
<% }) %>
```

## 09: Handle Editing
```
app.use(bodyParser.urlencoded({ extended: true }))

...

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
```

## 10: Read API
```
app.use(bodyParser.json())

...

app.get('/api/posts', (req, res) => {
  res.send(posts);
});
```

## 11: Read by id API
```
app.get('/api/posts/:id', (req, res) => {
  if (posts[req.params.id]) {
    res.send(posts[req.params.id])
  } else {
    res.status(404).send("Post Not Found.");
  }
});
```

## 12: Create API
```
app.post('/api/posts', (req, res) => {
  posts.push({
    title: req.body.title,
    body: req.body.body
  })
  res.status(201).send("Post Created")
});
```

## 13: Update API
```
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
```

## 14: Delete API
```
app.delete('/api/posts/:id', (req, res) => {
  if (posts[req.params.id]) {
    posts.splice(req.body.index, 1);
    res.send("Post Deleted")
  } else {
    res.status(404).send("Post Not Found.");
  }
});
```
