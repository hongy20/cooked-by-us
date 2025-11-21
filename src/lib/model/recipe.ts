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
  author: Types.ObjectId | null;
  category: Types.ObjectId | null;
  cuisine: Types.ObjectId | null;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

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
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    cuisine: {
      type: Schema.Types.ObjectId,
      ref: "Cuisine",
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
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

  try {
    // // Only validate author if it's new or modified
    // if ((recipe.isModified("author") || recipe.isNew) && recipe.author) {
    //   const authorExists = await doesCategoryExist(recipe.author);
    //   if (!authorExists) {
    //     const error = new Error(
    //       `Author with ID ${recipe.author} does not exist`,
    //     );
    //     error.name = "ValidationError";
    //     return next(error);
    //   }
    // }

    // Only validate category if it's new or modified
    if ((recipe.isModified("category") || recipe.isNew) && recipe.category) {
      const categoryExists = await doesCategoryExist(recipe.category);
      if (!categoryExists) {
        const error = new Error(
          `Category with ID ${recipe.category} does not exist`,
        );
        error.name = "ValidationError";
        return next(error);
      }
    }

    // Only validate cuisine if it's new or modified
    if ((recipe.isModified("cuisine") || recipe.isNew) && recipe.cuisine) {
      const cuisineExists = await doesCuisineExist(recipe.cuisine);
      if (!cuisineExists) {
        const error = new Error(
          `Cuisine with ID ${recipe.cuisine} does not exist`,
        );
        error.name = "ValidationError";
        return next(error);
      }
    }
  } catch {
    const validationError = new Error(
      "Invalid category|cuisine ID format or database error",
    );
    validationError.name = "ValidationError";
    return next(validationError);
  }

  next();
});

export const RecipeModel =
  (models.Recipe as Model<IRecipe>) || model<IRecipe>("Recipe", RecipeSchema);
