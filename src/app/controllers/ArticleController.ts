import { Request, Response, NextFunction } from "express";
import fs from 'fs'
class ArticleController {
    showArticle(req: Request, res: Response, next: NextFunction){
       let id = req.params.id;
       let slug = id.split('_')[0]
       let path = `src/app/_data/${slug}.json`;
       let data: Buffer = fs.readFileSync(path);
      data = JSON.parse(data.toString());
      let result = data.find((item:any)=> item.id ===id);
     if(result){
        res.status(200).json({
            success: true,
            data: result
        })
     }else{
        res.status(404).json({
            success: false,
            message: 'Không tìm được bài viết nào'
        })
     }
      
    }
}
export default new ArticleController;