import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "8080",
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: `${process.env.REACT_APP_MONGO_HOST}${process.env.REACT_APP_MONGO_USER}:${process.env.REACT_APP_MONGO_PASSWORD}@${process.env.REACT_APP_DATABASE_NAME}.${process.env.REACT_APP_MONGO_INFO}`,
};
export default config;

