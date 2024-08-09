const session = require("./session");
const layout = require("./layout");
const service = require("./service");

module.exports = {
  session,
  layout,
  service,
  debug: true,
  port: process.env.APPLICATION_PORT,
  cookie_secretkey: process.env.COOKIE_SECRETKEY,
  siteurl: process.env.WEBSITE_URL,
};
