var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var User = require("./models").users

module.exports = function (app) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({where: { name: username }}).then(function(user) {
        if (!user) {
          console.log('incorrect username')
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.password === password) {
          console.log('incorrect password')
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('user logged in')
        return done(null, user);
      })
      .catch(function (err) {
        console.log('here')
        return done(err)
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ where: {id: id}}).then(function(user) {
      done(null, user);
    }).catch(function (err) { done(err) });
  });

  app.use(passport.initialize())
  app.use(passport.session())

  return passport
}
