import { Router } from "express";
import PriceController from "../app/controllers/PriceController";
export default class PriceRouter {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }
    public routes(): void {
      this.router.get("/gold", PriceController.gold);
      this.router.get("/coin", PriceController.coin);
    }
  }