import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/test.js";
dotenv.config(); //this allows me to use environment variables which inturn help me encapsulate my app
const CONNECTION_URL = process.env.ATLAS_URI;
//console.log();
const PORT = process.env.PORT;
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use("/", router);
app.use(cors());

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Server running");
    })
  )
  .catch((error) => console.log(error.message));
