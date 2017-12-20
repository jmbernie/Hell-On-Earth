'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    author: DataTypes.STRING,
    artist: DataTypes.STRING,
    body: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return post;
};