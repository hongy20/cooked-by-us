import { type Document, type Model, model, models, Schema } from "mongoose";

export interface ICuisine extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CuisineSchema = new Schema<ICuisine>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Cuisine name must be at least 3 characters"],
      maxLength: [100, "Cuisine name must be no greater than 100 characters"],
    },
  },
  {
    timestamps: true,
  },
);

export const CuisineModel =
  (models.Cuisine as Model<ICuisine>) ||
  model<ICuisine>("Cuisine", CuisineSchema);
