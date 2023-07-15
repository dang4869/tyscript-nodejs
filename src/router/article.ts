import { Router } from "express";
import ArticleController from "../app/controllers/ArticleController";

export default class ArticleRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.get("/:id", ArticleController.showArticle);
  }
}
