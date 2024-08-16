const { default: mongoose } = require('mongoose');
const seed = require('./seed.js');

const runSeed = () => {
  return seed().then(() => {
    mongoose.connection.close();
  })
};

runSeed();
