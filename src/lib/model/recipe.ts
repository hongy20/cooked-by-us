import { type Document, type Model, model, models, Schema } from "mongoose";
import { RECIPE_CATEGORY, RECIPE_CUISINE } from "../constant";

export interface IRecipe extends Document {
  name: string;
  description: string;
  image: string;
  author: Schema.Types.ObjectId;
  category: string;
  cuisine: string;
  ingredients: string[];
  instructions: {
    text: string;
    image?: string;
  }[];
  cookTime: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

const InstructionStepSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const RecipeSchema = new Schema<IRecipe>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Should reference the User model once it's created
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: RECIPE_CATEGORY,
    },
    cuisine: {
      type: String,
      required: true,
      enum: RECIPE_CUISINE,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [InstructionStepSchema],
      required: true,
    },
    cookTime: {
      type: String, // ISO 8601 duration format e.g. "PT1H30M"
      required: true,
    },
    keywords: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

export const RecipeModel =
  (models.Recipe as Model<IRecipe>) || model<IRecipe>("Recipe", RecipeSchema);
