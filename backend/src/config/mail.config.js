require("dotenv").config();

const host = process.env.MAIL_HOST;
const user = process.env.EMAil_USER;
const pass = process.env.EMAIL_PASS;
const port = process.env.MAIL_PORT;
const secure = process.env.MAIL_SECURE;



module.exports = {
  host,
  user,
  pass,
  port,
  secure
}