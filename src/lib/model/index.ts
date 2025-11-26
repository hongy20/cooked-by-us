/**
 * Central model exports.
 *
 * IMPORTANT:
 * Mongoose requires each model to be registered before it can be used with features
 * like `.populate()`. If you try to populate a field referencing a model that hasn't
 * been imported and registered yet, you'll get `MissingSchemaError`.
 *
 * By importing and re-exporting all models here, we ensure that:
 * 1. All models are registered in Mongoose.
 * 2. `.populate()` works correctly across your app.
 * 3. We avoid multiple model registration errors in serverless environments.
 */

export { CategoryModel } from "./category";
export { CuisineModel } from "./cuisine";
export { RecipeModel } from "./recipe";

import type { Types } from "mongoose";
import type { RecipeDoc } from "./recipe";

export interface PopulatedRecipeDoc
  extends Omit<RecipeDoc, "category" | "cuisine"> {
  category: {
    // TODO: type it with PopulatedDoc
    _id: Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  cuisine: {
    _id: Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}
