import { body} from "express-validator";

export const validator:any = [
    body('name','Không đủ chiều dài').isLength( {min : 5}),
    body('slug','Không đủ chiều dài').isLength( {min : 5}),
    body('link','Không đủ chiều dài').isLength( {min : 5}),
]