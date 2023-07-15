import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";
import ValidateReq from "../middleware/validateReq";
import Parser from "rss-parser";
import fs from "fs";

type CustomFeed = { foo: string };
type CustomItem = { bar: number };

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  customFields: {
    feed: ["foo"],
    //            ^ will error because `baz` is not a key of CustomFeed
    item: ["bar"],
  },
});
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
    Category.find(find)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .then((category) => {
        res.status(200).json({
          success: true,
          count: category.length,
          data: category,
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
    Category.findOne({ _id: req.params.id })
      .then((category) => {
        res.status(200).json({
          success: true,
          data: category,
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
      Category.create(req.body)
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
      Category.updateOne({ _id: req.params.id }, req.body)
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
    Category.deleteOne({ _id: req.params.id })
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
  public async getArticleCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    Category.findById(req.params.id).then(async (category: any) => {
      let link = category.link
        ? category.link
        : "https://vnexpress.net/rss/tin-moi-nhat.rss";
      let slug = category.slug ? category.slug : "new";
      let path = `src/app/_data/${slug}.json`;
      const feed = await parser.parseURL(link);
      
      if (req.cookies[slug] && req.cookies[slug] >= Date.now()) {
        console.log("vào off");
       
        let data: Buffer = fs.readFileSync(path);
        let result = JSON.parse(data.toString());
        result.forEach((ele: any, index: number) => {
          ele.id = slug + "_" + index + 1;
          result.push(ele);
        });
        fs.writeFileSync(path, JSON.stringify(result));
        let total: number = parseInt(req.params.total);
        console.log(total);

        let totalData: any = [];
        for (let i = 0; i < total; i++) {
          totalData[i] = result[i];
        }
        if (result) {
          if (req.params.total) {
            res.status(200).json({
              success: true,
              count: total,
              data: totalData,
            });
          } else {
            res.status(200).json({
              success: true,
              count: result.length,
              data: result,
            });
          }
        } else {
          res.status(500).json({
            success: false,
            message: "Không tìm được bài viết nào",
          });
        }
      } else {
        console.log("vào onl");

        res.cookie(slug, Date.now() + 1 * 60 * 1000);
        let data = feed.items;
        data.forEach((ele: any, index: number) => {
          ele.id = slug + "_" + (index + 1);
          data.push(ele);
        });
        fs.writeFileSync(path, JSON.stringify(data));
        let total: any = req.params.total;
        let totalData: any = [];
        for (let i = 0; i < total; i++) {
          totalData[i] = data[i];
        }
        if (feed) {
          if (req.params.total) {
            res.status(200).json({
              success: true,
              count: total,
              data: totalData,
            });
          } else {
            res.status(200).json({
              success: true,
              count: data.length,
              data: data,
            });
          }
        } else {
          res.status(500).json({
            success: false,
            message: "Không tìm được bài viết nào",
          });
        }
      }
    });
  }
}

export default new ItemController();
