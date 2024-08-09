const path = require("path");
const autoBind = require("auto-bind-inheritance");
const moment = require("jalali-moment");
moment.locale("fa", { useGregorianParser: true });

module.exports = class Helpers {
  constructor(req, res) {
    autoBind(this);
    this.req = req;
    this.res = res;
  }

  getObjects() {
    return {
      viewPath: this.viewPath,
      date: this.date,
      ...this.getGlobalVaribales(),
      req: this.req,
    };
  }

  getGlobalVaribales() {
    return {
      errors: this.req.flash("errors"),
    };
  }

  viewPath(dir) {
    return path.resolve(config.layout.view_dir + "/" + dir);
  }

  date(time) {
    return moment(time);
  }
};
