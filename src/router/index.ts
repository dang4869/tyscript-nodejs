import * as express from "express";
import CategoryRouter from "./category";
import NewRouter from "./news";
import PriceRouter from "./price";
import ArticleRouter from "./article";
function route(app: any) {
  app.use("/api/v1/category", new CategoryRouter().router);
  app.use("/api/v1/news", new NewRouter().router);
  app.use("/api/v1/price", new PriceRouter().router);
  app.use("/api/v1/article", new ArticleRouter().router);
}

export default route;
