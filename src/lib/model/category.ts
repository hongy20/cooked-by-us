import { type Document, type Model, model, models, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [1, "Category name must be at least 1 character"],
      maxLength: [100, "Category name must be no greater than 100 characters"],
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel =
  (models.Category as Model<ICategory>) ||
  model<ICategory>("Category", CategorySchema);
