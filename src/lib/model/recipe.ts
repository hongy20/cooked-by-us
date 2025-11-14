import { type Document, type Model, model, models, Schema } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  description: string;
  image: string;
  author: Schema.Types.ObjectId;
  recipeCategory: string;
  recipeCuisine: string;
  recipeIngredient: string[];
  recipeInstructions: {
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
    recipeCategory: {
      type: String,
      required: true,
      enum: [
        "Appetizer / Starter",
        "Main Course",
        "Side Dish",
        "Dessert",
        "Soup",
        "Salad",
        "Bread",
        "Beverage / Drink",
        "Sauce",
        "Spread / Dip",
        "Marinade",
        "Dressing",
      ],
    },
    recipeCuisine: {
      type: String,
      required: true,
      enum: [
        "Italian",
        "French",
        "Spanish",
        "Mexican",
        "American",
        "Mediterranean",
        "Middle Eastern",
        "Indian",
        "Chinese",
        "Japanese",
        "Thai",
        "Korean",
        "Vietnamese",
        "Nordic / Scandinavian",
        "African",
        "Latin American",
      ],
    },
    recipeIngredient: {
      type: [String],
      required: true,
    },
    recipeInstructions: {
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

const Recipe =
  (models.Recipe as Model<IRecipe>) || model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
