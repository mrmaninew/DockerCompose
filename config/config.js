"use strict";

const mongoose = require("mongoose");

module.exports = {
  port: process.env.PORT || 3000,
  database: "mongodb://mongo/employee",
  options: {
    useNewUrlParser: true
  },
  // Invoke Connection with MongoDB Database
  connectDB: function() {
    mongoose.connect(
      this.database,
      this.options
    );
  },
  // Disconnect connection with MongoDB Database
  disconnectDB: function() {
    mongoose.disconnect(this.database);
  }
};

mongoose.connection.on("open", function() {
  console.log("Connected to Database (MongoDB) ");
});

mongoose.connection.on("error", function() {
  console.log("error in Database (MongoDB) connections");
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("Database (MongoDB) disconnected through app termination");
    process.exit(0);
  });
});
