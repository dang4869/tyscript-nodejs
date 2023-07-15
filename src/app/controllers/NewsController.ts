import { NextFunction, Request, Response } from "express";
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
class NewsController {
  public async index(req: Request, res: Response, next: NextFunction) {
    const feed = await parser.parseURL(
      "https://vnexpress.net/rss/tin-moi-nhat.rss"
    );
    fs.writeFileSync("src/app/_data/news.json", JSON.stringify(feed.items));
    if (req.cookies.getRss && req.cookies.getRss >= Date.now()) {
      console.log('vào off');
      
      let data: Buffer = fs.readFileSync("src/app/_data/news.json")
      res.status(200).json({
        success: true,
        count: JSON.parse(data.toString()).length,
        data: JSON.parse(data.toString()),
      });
    } else {
      console.log('vào onl');
      
      res.cookie("getRss", Date.now() + 1 * 60 * 1000);
      if (feed) {
        res.status(200).json({
          success: true,
          count: feed.items.length,
          data: feed.items,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Không tìm được bài viết nào",
        });
      }
    }
  }
}
export default new NewsController();
