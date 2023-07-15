import { Router } from "express";
import NewsController from "../app/controllers/NewsController";

export default class NewRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.get("/", NewsController.index);
  }
}
