import * as express from "express";
import ItemRouter from "./items";
function route(app: any) {
  app.use("/api/v1/items", new ItemRouter().router);
}

export default route;
