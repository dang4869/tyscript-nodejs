import mongoose, { Schema } from "mongoose";

const Category: Schema = new Schema({
  name: { type: String, required: [true, "Không được để trống trường name"] },
  slug: {
    type: String,
    required: [true, "Không được để trống trường slug"],
  },
  link: {
    type: String,
    required: [true, "Không được để trống trường link"]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('category', Category);