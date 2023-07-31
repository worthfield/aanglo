import express, { json, urlencoded } from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import shopRoutes from './routes/shop.routes.js';
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
import bodyParser from "body-parser";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const C_W_D = process.cwd();
const app = express();

app.use(express.static(join(__dirname, '../client/build')));
app.use(express.static(join(__dirname, '../client/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.REACT_APP_DOMAIN || 'http://localhost:3000',
    credentials: true
  }));
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", shopRoutes);
app.use('/',productRoutes)
app.use('/',orderRoutes)

export default app;
