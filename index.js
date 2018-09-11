"use strict";

const path = require("path"),
  http = require("http"),
  express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  config = require("./config/config"),
  app = express();

// mongoose use global promise
mongoose.Promise = global.Promise;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(
  express.static(__dirname + "/client", {
    dotfiles: "allow",
    maxAge: 86400000,
    redirect: false,
    index: ["index.html", "index.html"]
  })
);

// connection to development database
config.connectDB();

app.get("/", function(res) {
  res.status(200).sendFile(path.join(__dirname + "/client/index.html"));
});

app.use("/api", require("./server/routes/api")(app, express));

// Event listener for HTTP server running event.
function onListening() {
  var serverURL = "http://localhost:" + config.port;
  console.log("server listening on " + serverURL);
}

// create server and run
var server = http.createServer(app);

// listen on configured port
server.listen(config.port);
server.on("listening", onListening);
