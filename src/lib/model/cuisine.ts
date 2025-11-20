import { type Document, type Model, model, models, Schema } from "mongoose";

export interface ICuisine extends Document {
  name: string;
  author: Schema.Types.ObjectId;
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

export const CuisineModel =
  (models.Cuisine as Model<ICuisine>) ||
  model<ICuisine>("Cuisine", CuisineSchema);
