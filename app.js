const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
require("dotenv").config();
const PORT = process.env.PORT || 3000

const db = require("./db/index");
db.mongoConnection();

const { initializeSocket } = require("./socket/socket");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static("public"));
app.use(bodyParser.json());
app.use(fileUpload());

// global helpers start
  const io = initializeSocket(server);
  const logger = require("./services/logger.service");
  const { errorResponse, successResponse } = require("./helper");

  global.io = io;
  global.logger = logger
  global.errorResponse = errorResponse
  global.successResponse = successResponse
// end

const userRoutes = require("./routes/userManager.route");
app.use("/api/v1", userRoutes)

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});