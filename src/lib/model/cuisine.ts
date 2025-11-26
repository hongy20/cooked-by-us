import { type Document, type Model, model, models, Schema } from "mongoose";
import type { Cuisine } from "@/lib/domain/cuisine";

// Extend the domain model AND Mongoose's Document, avoid duplicated typing
export interface CuisineDoc extends Cuisine, Document {
  createdAt: Date;
  updatedAt: Date;
}

const CuisineSchema = new Schema<CuisineDoc>(
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
    timestamps: true, // enables createdAt & updatedAt
  },
);

export const CuisineModel =
  (models.Cuisine as Model<CuisineDoc>) ||
  model<CuisineDoc>("Cuisine", CuisineSchema);
