import {
  type Document,
  type Model,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";
import { doesCategoryExist } from "../dal/category";
import { doesCuisineExist } from "../dal/cuisine";

export interface IRecipe extends Document {
  name: string;
  description: string;
  image: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  cuisine: Types.ObjectId;
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
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    cuisine: {
      type: Schema.Types.ObjectId,
      ref: "Cuisine",
      required: true,
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

RecipeSchema.pre("save", async function (next) {
  const recipe = this as IRecipe;

  // Only validate category and cuisine if it's new or modified
  if (recipe.isModified(["category", "cuisine"]) || recipe.isNew) {
    try {
      const categoryExists = await doesCategoryExist(recipe.category);
      if (!categoryExists) {
        const error = new Error(
          `Category with ID ${recipe.category} does not exist`,
        );
        error.name = "ValidationError";
        return next(error);
      }

      const cuisineExists = await doesCuisineExist(recipe.cuisine);
      if (!cuisineExists) {
        const error = new Error(
          `Cuisine with ID ${recipe.cuisine} does not exist`,
        );
        error.name = "ValidationError";
        return next(error);
      }
    } catch {
      const validationError = new Error(
        "Invalid category|cuisine ID format or database error",
      );
      validationError.name = "ValidationError";
      return next(validationError);
    }
  }

  next();
});

export const RecipeModel =
  (models.Recipe as Model<IRecipe>) || model<IRecipe>("Recipe", RecipeSchema);
