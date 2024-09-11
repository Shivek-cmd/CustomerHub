const fs = require("fs");

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let log = err.stack;
  log += `\n${req.method} - ${req.url} - ${req.ip} - ${new Date()}\n`;
  fs.appendFile("error.txt", log, (err) => {
    if (err) console.log(err);
  });
  res.status(500).send("Something broke!");
};

module.exports = errorHandler;
