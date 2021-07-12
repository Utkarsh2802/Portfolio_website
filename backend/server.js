import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/test.js";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config(); //this allows me to use environment variables which inturn help me encapsulate my app
const CONNECTION_URL = process.env.ATLAS_URI;
//console.log();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//app.use(bodyParser.urlencoded({ extendend: true }));

app.use("/", router);

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
