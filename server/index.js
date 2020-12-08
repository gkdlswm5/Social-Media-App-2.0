import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// require("dotenv").config({
//   path: "./config/config.env",
// });

dotenv.config({
  path: "./config/config.env",
});

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("memory API");
});

//changes
// app.get("/", (req, res) => {
//   res.send("memory API");
// });

// process.env.CONNECTION_URL ||
const CONNECTION_URL =
  "mongodb+srv://test:qweeasdd123@cluster0.zfw9e.mongodb.net/socialMedia?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}

//process.env.MONGODB_URI ||

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
