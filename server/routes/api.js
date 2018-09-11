"use strict";
module.exports = function(app, express) {
  var apiRouter = express.Router();

  apiRouter
    .route("/emp")
    .get((req, res) => {
      res.status(200).send("dones");
    })
    .put((req, res) => {
      res.status(200).send("dones");
    })
    .post((req, res) => {
      res.status(200).send("dones");
    })
    .delete((req, res) => {
      res.status(200).send("dones");
    });

  return apiRouter;
};
