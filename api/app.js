require("dotenv").config();

const express = require("express");
const app = express();
var cors = require("cors");
const logger = require("morgan");
const CONFIG = require("./config.json");

const port = CONFIG.PORT || 5000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.use("/uploads", express.static("uploads"));
require("./config/database");
app.use("/admin", require("./routes/admin/index"));
app.use("/frontend", require("./routes/frontend/index"));

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
