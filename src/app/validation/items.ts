import { body} from "express-validator";

export const validator:any = [
    body('name','Không đủ chiều dài').isLength( {min : 5}),
    body('content','Không đủ chiều dài').isLength( {min : 10}),
]