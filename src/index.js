require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3030;
// middlewares
app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
// middlewares

// routes
app.use("/users", require("./routes/users"));
app.use("/s3", require("./routes/s3Upload"));
// routes
app.listen(port, () => {
  console.log("server running on port " + port);
});
