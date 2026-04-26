const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { fileURLToPath } = require("url");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

//Initialize express app
const app = express();

//connect to MongoDb
connectDB();

//Middleware to handle cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static folder fpr uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes

app.use(errorHandler);

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not Found",
    statusCode: 404,
  });
});

//PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running in on Port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error:${err.message}`);
  process.exit(1);
});
