import "server-only";
import { cache } from "react";
import { CategoryModel, type ICategory } from "@/lib/model/category";
import connectDB from "@/lib/mongodb";
import type { CategoryInput } from "@/lib/validator/category";

export const createCategory = async (data: CategoryInput) => {
  await connectDB();
  return await CategoryModel.create(data);
};

export const editCategory = async (categoryId: string, data: CategoryInput) => {
  await connectDB();
  return await CategoryModel.updateOne({ _id: categoryId }, { $set: data });
};

export const bootstrapCategories = async () => {
  await connectDB();

  for (const name of [
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
  ]) {
    await CategoryModel.findOneAndUpdate(
      { name },
      { name },
      { upsert: true, new: true },
    );
  }
};

export const getAllCategories = cache(async () => {
  await connectDB();
  return await CategoryModel.find().sort({ createdAt: -1 }).lean<ICategory[]>();
});
