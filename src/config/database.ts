import mongoose from "mongoose";
async function connect(){
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/api_typescriptnode');
    console.log('Thành công')
  } catch (error) {
    console.log('Thất bại')
  }
}
export default connect()