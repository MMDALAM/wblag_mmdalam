const experss = require("express");
const router = experss.Router();
const i18n = require("i18n");

//middleware
const errorHandler = require("app/http/middleware/errorHandler");

router.use((req, res, next) => {
  try {
    let lang = req.getLocale();
    if (i18n.getLocales().includes(lang)) req.setLocale(lang);
    else req.setLocale(i18n.getLocale(lang));
    next();
  } catch (err) {
    next(err);
  }
});

router.get("/lang/:lang", (req, res) => {
  let lang = req.params.lang;
  if (i18n.getLocales().includes(lang))
    res.cookie("lang", lang, {
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });

  res.redirect(req.header("Referer") || "/");
});

//home router
const homeRouter = require("./home");
router.use("/", homeRouter);

//errorHandler
router.all("*", errorHandler.error404);
router.use(errorHandler.handler);

module.exports = router;
