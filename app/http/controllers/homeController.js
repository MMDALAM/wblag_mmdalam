const controller = require("app/http/controllers/controller");
const fs = require("fs");
const path = require("path");

class homeController extends controller {
  async index(req, res, next) {
    try {
      let lang = req.getLocale();
      return res.render("home/index", { lang });
    } catch (err) {
      next(err);
    }
  }

  async txt(req, res, next) {
    try {
      if (req.url == "/742745.txt") {
        let filePath = path.join("742745.txt");

        fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
          if (err) {
            res.writeHead(500);
            res.end("Error loading 742745.txt");
            return;
          }
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(data);
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new homeController();
