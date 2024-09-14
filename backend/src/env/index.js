const envVar = require("env-var");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../../", ".env"),
});

const env = {
  PORT: envVar.get("PORT").default(3333).asInt(),
  MYSQL_HOST: envVar.get("MYSQL_HOST").required().asString(),
  MYSQL_USER: envVar.get("MYSQL_USER").required().asString(),
  MYSQL_PASSWORD: envVar.get("MYSQL_PASSWORD").required().asString(),
  MYSQL_DATABASE: envVar.get("MYSQL_DATABASE").required().asString(),
};

module.exports = env;
