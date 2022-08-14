const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(DB_HOST);
    console.log('ta aqui');
    mongoose.connection.on('error', err => {
      console.log(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.'
      );
      console.log('pegou algum erro');
      process.exit();
    });
  },
  close: () => {
    mongoose.connection.close();
  }
};
