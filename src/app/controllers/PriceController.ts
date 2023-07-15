import { Request, Response, NextFunction } from "express";
import xml2js from "xml2js";
import rq from "request-promise";
import { json } from "stream/consumers";
class PriceController {
  public async gold(req: Request, res: Response, next: NextFunction) {
    let parserXml = new xml2js.Parser();

    let requestOptions = {
      method: "GET",
      uri: "https://www.sjc.com.vn/xml/tygiavang.xml",
      json: true,
      rejectUnauthorized: false,
    };
    let data: any;
    let xml = await rq(requestOptions);
    parserXml.parseString(xml, function (err: any, result: any) {
      data = JSON.stringify(result);
    });
    let glod = JSON.parse(data).root.ratelist[0].city[0].item;
    let price: any = [];
    glod.forEach((ele: any) => {
      price.push(ele["$"]);
    });
    if (data) {
      res.status(200).json({
        success: true,
        data: price,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Không tìm được thông tin nào",
      });
    }
  }
  public async coin(req: Request, res: Response, next: NextFunction) {
    const requestOptions = {
      method: "GET",
      uri: "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      qs: {
        start: "1",
        limit: "20",
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": "45ff3fe0-1402-49bc-80f6-682cd8fe6667",
      },
      json: true,
      gzip: true,
    };
    let data = await rq(requestOptions);
    data = data.data;
    let result : any = []
    data.forEach((ele: any) => {
      let obj: any ={}
      obj.name = ele.name;
      obj.price = ele.quote.USD.price;
      obj.percent_change_24h = ele.quote.USD.percent_change_24h

      result.push(obj)
      
    })
    if (data) {
      res.status(200).json({
        success: true,
        count: result.length,
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Không tìm được thông tin nào",
      });
    }
  }
}
export default new PriceController();
