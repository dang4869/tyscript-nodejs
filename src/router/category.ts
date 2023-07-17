import { Router } from "express";
import CategoryController from "../app/controllers/CategoryController";
import {validator} from '../app/validation/category'
export default class ItemRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.delete("/:id", CategoryController.delete);
    this.router.put("/:id",validator, CategoryController.edit);
    this.router.get("/:id", CategoryController.showOne);
    this.router.get("/:id/article(/:total)?", CategoryController.getArticleCategory)
    this.router.post("/",validator, CategoryController.add);
    this.router.get("/", CategoryController.index);
  }
}
