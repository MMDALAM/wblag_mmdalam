const experss = require("express");
const router = experss.Router();

//controllers
const homeController = require("app/http/controllers/homeController");

//home Rouer
router.get("/", homeController.index);

module.exports = router;
