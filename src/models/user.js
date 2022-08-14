const mongoose = require('mongoose');

// Define the users's database schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      index: { unique: true }
    },
    email: {
      type: String,
      require: true,
      index: { unique: true }
    },
    password: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    }
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

// Define the 'User' model with the schema
const User = mongoose.model('User', userSchema);

// Export the module
module.exports = User;
