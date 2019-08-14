const express = require("express")
const channelApiController = require("./channelApiController")
const bodyParser = require('body-parser')
let channelApiRouter = express.Router()

module.exports = channelApiRouter
channelApiRouter.use("/", bodyParser.json());

/*
channelApiRouter.route("/id/:id")
    .get(channelApiController.get)
    .put(channelApiController.put)
    .delete(channelApiController.delete)

channelApiRouter.route("/name/:name")
   .get(channelApiController.get)
   .put(channelApiController.put)
   .delete(channelApiController.delete)

channelApiRouter.route("/num/:num")
   .get(channelApiController.get)
   .put(channelApiController.put)
   .delete(channelApiController.delete)
*/

channelApiRouter.route("/:id")
    .get(channelApiController.get)
    .put(channelApiController.put)
    .delete(channelApiController.delete)

channelApiRouter.route("/")
   .get(channelApiController.getAll)
   .post(channelApiController.post)