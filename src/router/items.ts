import { Router } from "express";
import ItemController from "../app/controllers/ItemController";
import {validator} from '../app/validation/items'
export default class ItemRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes(): void {
    this.router.delete("/delete/:id", ItemController.delete);
    this.router.put("/edit/:id",validator, ItemController.edit);
    this.router.get("/:id", ItemController.showOne);
    this.router.post("/add",validator, ItemController.add);
    this.router.get("/", ItemController.index);
  }
}
