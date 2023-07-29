import dotenv from 'dotenv';
import config from "./config/config.js";
import app from "./express.js";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Database connecting"))
  .then(() => {
    app.listen(config.port, (err) => {
      console.log("server started on port %s", config.port);
    });
  })
  .catch((err) => console.log(err));

