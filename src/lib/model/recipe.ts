import { type Document, type Model, model, models, Schema } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  description: string;
  image: string;
  author: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  cuisine: Schema.Types.ObjectId;
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

export const RecipeModel =
  (models.Recipe as Model<IRecipe>) || model<IRecipe>("Recipe", RecipeSchema);
