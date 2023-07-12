import mongoose, { Schema } from "mongoose";

const Items: Schema = new Schema({
  name: { type: String, required: [true, "Không được để trống trường name"] },
  content: {
    type: String,
    required: [true, "Không được để trống trường content"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Items', Items);