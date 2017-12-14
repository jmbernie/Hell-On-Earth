'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      author: 'kevin',
      body: 'this is a song',
      type: 'Song',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      author: 'kevin',
      body: 'this is a post',
      type: 'Post',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
