# GT Webdev 05 - NodeJS Tutorial

In this tutorial we'll learn about NodeJS, Express, EJS, MongoDB and APIs

## 01: Install node and set up database
Node: https://nodejs.org/en/download/
MongoDB: https://www.mongodb.com/cloud/atlas

## 02: Install dependencies
Run the following in your command line and go through the onboarding:
```bash
npm install
npm install -g nodemon
```

## 03: Add a log to your server.js file and run it
```
console.log("Hello World!");
```
```bash
node server.js
```

## 04: Connect to database
```
const uriString = ''; // your MongoDB url goes here
```

## 05: Set up a page
```
app.get('/', (req, res) => {
    res.render('index');
});
```

## 06: Add ability to post
```
app.post('/', (req, res) => {
    collection.insert({
        title: req.body.title,
        body: req.body.body
    }, function(err, status) {
        if (err) {
            res.status(500).send();
        } else {
            res.render('index');
        }
    });
});
```

## 07: Send posts to the page
```
app.get('/', (req, res) => {
    collection.find({}).toArray(function(err, posts) {
        if (err) {
            res.status(500).send();
        } else {
            res.render('index', { posts: posts });
        }
    });
});
```

## 08: Display posts on page
```
<% posts.forEach((post) => { %>
  <form method="POST" action="/">
    <input type="text" name="title" value="<%= post.title %>" />
    <textarea name="body"><%= post.body %></textarea>
    <input type="hidden" name="id" value="<%= post._id %>" />
    <div class="buttonRow">
      <input type="submit" value="Delete" name="delete" />
      <input type="submit" value="Update" name="update" />
    </div>
  </form>
<% }) %>
```

## 09: Update post to actually show posts
```
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
});
```

## 10: Add ability to edit and delete
```
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
```

## 10: Read API
```
app.get('/api/posts', (req, res) => {
    collection.find({}).toArray(function(err, posts) {
        if (err) {
            res.status(500).send();
        } else {
            res.send(posts);
        }
    });
});
```

## 11: Read by id API
```
app.get('/api/posts/:id', (req, res) => {
    collection.findOne({ _id: ObjectID(req.params.id) }, function(err, post) {
        if (err) {
            res.status(500).send();
        } else {
            res.send(post);
        }
    });
});
```

## 12: Create API
```
app.post('/api/posts', (req, res) => {
    collection.insert({
        title: req.body.title,
        body: req.body.body
    }, function(err, status) {
        if (err) {
            res.status(500).send();
        } else {
            res.status(201).send("Post Created")
        }
    });
});
```

## 13: Update API
```
app.put('/api/posts/:id', (req, res) => {
    collection.update({ _id: ObjectID(req.params.id) }, { $set: {title: req.body.title, body: req.body.body} }, function(err, status) {
        if (err) {
            res.status(500).send();
        } else {
            res.status(201).send("Post Updated")
        }
    });
});
```

## 14: Delete API
```
app.delete('/api/posts/:id', (req, res) => {
    collection.deleteOne({ _id: ObjectID(req.params.id) }, function(err, status) {
        if (err) {
            res.status(500).send();
        } else {
            res.send("Post Deleted")
        }
    });
});
```
