import * as express from "express";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../app/lib/swagger.json'
import swaggerJsDoc from 'swagger-jsdoc'
import CategoryRouter from "./category";
import NewRouter from "./news";
import PriceRouter from "./price";
import ArticleRouter from "./article";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "Category API"
//     },
//     servers: [
//       {
//         url: "http://localhost:8000"
//       }
//     ]
//   },
//   apis: ["./src/app/controller*.ts"]
// }
// const specs = swaggerJsDoc(options)
function route(app: any) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/api/v1/category", new CategoryRouter().router);
  app.use("/api/v1/news", new NewRouter().router);
  app.use("/api/v1/price", new PriceRouter().router);
  app.use("/api/v1/article", new ArticleRouter().router);
}

export default route;
