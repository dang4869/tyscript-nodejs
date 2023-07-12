import { Request, Response, NextFunction } from "express";
import Items from "../models/Items";
import ValidateReq from "../middleware/validateReq";

class ItemController {
  index(req: Request, res: Response, next: NextFunction) {
    let querys: any = req.query;
    // coppy query
    const queryFind = { ...querys };

    let find: any, select: any, sort: any;

    // Create fields remove
    let removeFields = ["select", "sort", "page", "limit"];

    // Remove fields
    removeFields.forEach((query) => delete queryFind[query]);

    // Create query string
    // console.log(queryFind);
    let queryStr = JSON.stringify(queryFind);

    // replace
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (find) => `$${find}`
    );

    //parse
    find = JSON.parse(queryStr);

    if (querys.select) {
      select = querys.select.split(",").join(" ");
    }

    // sort fields
    if (querys.sort) {
      sort = querys.sort.split(",").join(" ");
    }

    //pagination
    const page = parseInt(querys.page) || 1;
    const limit = parseInt(querys.limit) || 6;
    const skip = (page - 1) * limit;
    Items.find(find)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .then((items) => {
        res.status(200).json({
          success: true,
          count: items.length,
          data: items,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Không tìm được sản phẩm nào",
        });
      });
  }
  showOne(req: Request, res: Response, next: NextFunction) {
    Items.findOne({ _id: req.params.id })
      .then((item) => {
        res.status(200).json({
          success: true,
          data: item,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Không tìm được sản phẩm nào",
        });
      });
  }
 public async add(req: Request, res: Response, next: NextFunction) {
    const err = await ValidateReq.init(req, res, next);
    if (!err) {
      Items.create(req.body)
        .then((item) => {
          res.status(200).json({
            success: true,
            message: "Thêm sản phẩm thành công",
            data: item,
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Thêm sản phẩm thất bại",
            error: error,
          });
        });
    }
  }
 public async edit(req: Request, res: Response, next: NextFunction) {
    const err = await ValidateReq.init(req, res, next);
    if (!err) {
      Items.updateOne({ _id: req.params.id }, req.body)
        .then((item) => {
          res.status(200).json({
            success: true,
            message: "Đã cập nhật sản phẩm thành công",
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Cập nhật sản phẩm thất bại",
            error,
          });
        });
    }
  }
  delete(req: Request, res: Response, next: NextFunction) {
    Items.deleteOne({ _id: req.params.id })
      .then((item) => {
        res.status(200).json({
          success: true,
          message: "Đã xóa sản phẩm thành công",
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Xóa sản phẩm thất bại",
        });
      });
  }
}

export default new ItemController();
