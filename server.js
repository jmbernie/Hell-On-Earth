var express = require("express");
var session = require("express-session")
var bodyParser = require("body-parser");
var flash = require('connect-flash')

var app = express();
//var port = 3000;
var port = process.env.PORT || 3000;

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
app.use(session({secret: "awesome"}))
app.use(flash())

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars")
var hbs = exphbs.create({ defaultLayout: "main" });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

var db = require('./models')

var passport = require('./passport.js')(app)
var markov = require('./lyrics/markovChain.js');

db.sequelize.sync().then(() => {
  console.log('database synchronized')
});

// Serve index.handlebars to the root route.
app.get("/", function(req, res) {
  db.post.findAll().then((posts) => {
    res.render("index", { posts: posts })
  })
  // db.posts.query("SELECT * FROM quotes;", function(err, data) {
  //   if (err) {
  //     return res.status(500).end();
  //   }

  //   res.render("index", { quotes: data });
  // });
});

app.get('/favicon.ico', function (req, res) {
  res.status(204).end()
})

app.get('/api/markov/:artist/:seed', function (req, res) {
  console.log(req.params)
  var artist = req.params.artist
  var seed = req.params.seed
  var options = {
    artist: artist,
    seed: seed,
    options: [markov.markovChainLyrics(artist, seed),
      markov.markovChainLyrics(artist, seed),
      markov.markovChainLyrics(artist, seed)]
  }
  res.json(options)
})

// Show the user the individual quote and the form to update the quote.
app.get("api/posts/:id", function(req, res) {
  console.log(req.params)
  db.post.findOne({ where: { id: req.params.id }})
  .then((post) => { res.render("single", { post: post.dataValues })})
  .catch((err) => { res.sendStatus(500)})
  // connection.query("SELECT * FROM quotes where id = ?", [req.params.id], function(err, data) {
  //   if (err) {
  //     return res.status(500).end();
  //   }

  //   console.log(data);
  //   res.render("single-quote", data[0]);
  // });
});

app.post("/api/posts", function(req, res) {
  // connection.query("INSERT INTO quotes (author, quote) VALUES (?, ?)", [
  //   req.body.author, req.body.quote
  // ], function(err, result) {
  //   if (err) {
  //     // If an error occurred, send a generic server faliure
  //     return res.status(500).end();
  //   }
    console.log(req.body);
    console.log(req.body.author);
    console.log(req.body.artist);
    console.log(req.body.body);
  
  if (!req.user) {
    res.status(401).end()
  } else {
    console.log(req.user)
    var thisPost = {
      body: req.body.body,
      author: req.user.dataValues.name,
      artist: req.body.artist
    }
    db.post.create(thisPost).then((post) => { console.log(post); res.json(post); })
  }

  //   // Send back the ID of the new quote
  //   res.json({ id: result.insertId });
  // });

});

app.get('/newUser', function (req, res) {
  res.render('newUser')
})

app.post('/newUser', function(req, res) {
  console.log('here')
  if (req.body.username && req.body.password) {
    db.users.findOne({where: {name: req.body.username}}).then(
      function (user) {
        console.log(user)
        if (!user) {
          db.users.create(
            { name: req.body.username,
              password: req.body.password})
          .then(res.status(200).send('new user created'))
        } else { res.send('user already exists') }
      })
  }
})

app.get('/login', function (req, res) {
  res.render('login', {})
})

app.post('/login',
  passport.authenticate('local', 
    { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true }
  )
);

app.get("/api/post/:id/delete", function(req, res) {
  // connection.query("DELETE FROM quotes WHERE id = ?", [req.params.id], function(err, result) {
  //   if (err) {
  //     // If an error occurred, send a generic server faliure
  //     return res.status(500).end();
  //   } else if (result.affectedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });
  db.post.destroy({where: {id: req.params.id}})
  .then((thing) => { console.log(thing); res.redirect('/') })
});


// Update a quote by an id and then redirect to the root route.
app.put("/api/quotes/:id", function(req, res) {
  // connection.query("UPDATE quotes SET author = ?, quote = ? WHERE id = ?", [
  //   req.body.author, req.body.quote, req.params.id
  // ], function(err, result) {
  //   if (err) {
  //     // If an error occurred, send a generic server faliure
  //     return res.status(500).end();
  //   } else if (result.changedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  // });
});

app.listen(port, function() {
  console.log("Listening on PORT " + port);
});