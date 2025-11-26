import { type Document, type Model, model, models, Schema } from "mongoose";
import type { Category } from "@/lib/domain/category";

// Extend the domain model AND Mongoose's Document, avoid duplicated typing
export interface CategoryDoc extends Category, Document {
  createdAt: Date;
  updatedAt: Date;
}

const CategoryInputSchema = new Schema<CategoryDoc>(
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
    timestamps: true, // enables createdAt & updatedAt
  },
);

export const CategoryModel =
  (models.Category as Model<CategoryDoc>) ||
  model<CategoryDoc>("Category", CategoryInputSchema);
