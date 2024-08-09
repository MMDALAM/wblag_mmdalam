const express = require("express");
const app = express();
const http = require("http");
const session = require("express-session");
const { body } = require("express-validator");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const i18n = require("i18n");
const Helpers = require("./Helpers");

module.exports = class Application {
  constructor() {
    this.setupExpress();
    this.setConfig();
    this.setRouters();
  }

  setupExpress() {
    const server = http.createServer(app);
    server.listen(config.port, () =>
      console.log(`Listening on port ${config.port}`)
    );
  }

  setConfig() {
    app.enable("trust proxy");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(config.layout.public_dir));
    app.set("view engine", config.layout.view_engine);
    app.set("views", config.layout.view_dir);
    app.use(config.layout.ejs.expressLayouts);
    app.set("layout extractScripts", config.layout.ejs.extractScripts);
    app.set("layout extractStyles", config.layout.ejs.extractStyles);
    app.set("layout", config.layout.ejs.master);
    app.use(flash());
    app.use(cookieParser());
    app.use(session({ ...config.session }));

    app.use(body());

    i18n.configure({
      locales: ["en", "fa"],
      directory: config.layout.locales_directory,
      defaultLocale: "fa",
      cookie: "lang",
    });
    app.use(i18n.init);

    app.use((req, res, next) => {
      app.locals = new Helpers(req, res).getObjects();
      next();
    });
  }

  setRouters() {
    app.use(require("app/routers/web"));
  }
};
