const validator = require("./validator");
const { body } = require("express-validator");

class postedValidator extends validator {
  handle() {
    return [
      body("name").not().isEmpty().withMessage(" نام شما نمیتواند خالی بماند"),
      body("family")
        .not()
        .isEmpty()
        .withMessage(" فامیلی شما نمیتواند خالی بماند"),
      body("tel")
        .isLength({ max: 11 })
        .withMessage(" شماره تلفن باید 11 عدد باشد "),
      body("subject")
        .isLength({ max: 60 })
        .withMessage("  موضوع نمیتواند بیشتراز 60 حروف باشد "),
      body("text")
        .isLength({ max: 200 })
        .withMessage("  متن نمیتواند بیشتراز 200 حروف باشد "),
    ];
  }
}

module.exports = new postedValidator();
