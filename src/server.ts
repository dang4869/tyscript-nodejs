import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import db from "./config/database";
import route from "./router";
import errorHandler from "./app/middleware/error";
const PORT = 8000;
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
db;
route(app);
errorHandler

app.listen(PORT, () => console.log(`Running on ${PORT}`));
