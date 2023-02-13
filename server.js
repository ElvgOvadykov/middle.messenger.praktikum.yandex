const express = require("express");
require("dotenv").config({
  path: "./.env",
})

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./dist"));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
