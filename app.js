// load dependencies
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
require("dotenv").config({
  path: "./config/config.env",
});

// Load Routes
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// app
const app = express();

// connect to db
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("mongodb connected")
);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
}

// Server middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.use("/", (req, res, next) => {
  res.status(404).json({
    message: "Page Not Found",
    success: false,
  });
});

// express jwt error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: {
        notif: "شما اجازه دسترسی به این قسمت را ندارید",
      },
    });
  }
});

// listen to app
const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));
