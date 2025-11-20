import { type Document, type Model, model, models, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  author: Schema.Types.ObjectId;
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
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Should reference the User model once it's created
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel =
  (models.Category as Model<ICategory>) ||
  model<ICategory>("Category", CategorySchema);
