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
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [30, "Name must be no greater than 30 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description must be no greater than 200 characters"],
    },
    image: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v: string) =>
          /^https:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/.test(v),
        message: "Please provide a valid url",
      },
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
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Ingredients cannot be empty — add at least one",
      },
    },
    instructions: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Instructions cannot be empty — add at least one",
      },
    },
    cookTime: {
      type: String, // ISO 8601 duration format e.g. "PT1H30M"
      required: true,
      validate: {
        validator: (v: string) => /^PT(\d+H)?(\d+M)?(\d+S)?$/.test(v),
        message:
          "Cook time must be in ISO 8601 duration format (e.g., PT1H30M)",
      },
    },
    keywords: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Keywords cannot be empty — add at least one",
      },
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
