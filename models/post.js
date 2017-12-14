'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    author: DataTypes.STRING,
    body: DataTypes.STRING,
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