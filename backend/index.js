import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/test.js";
const CONNECTION_URL =
  "mongodb+srv://Utkarshdmg:utkarshdmg@typingdb.7wfww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
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
