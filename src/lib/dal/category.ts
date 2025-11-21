import "server-only";
import type { Types } from "mongoose";
import { cache } from "react";
import { CategoryModel, type ICategory } from "@/lib/model/category";
import connectDB from "@/lib/mongodb";
import type { CategoryInput } from "@/lib/validator/category";

export const createCategory = async (data: CategoryInput) => {
  await connectDB();
  return await CategoryModel.create(data);
};

export const doesCategoryExist = async (categoryId: Types.ObjectId) => {
  await connectDB();
  return await CategoryModel.findById(categoryId).select("_id");
};

export const editCategory = async (categoryId: string, data: CategoryInput) => {
  await connectDB();
  return await CategoryModel.findByIdAndUpdate(
    { _id: categoryId },
    { $set: data },
  );
};

export const bootstrapCategories = async () => {
  await connectDB();

  const categories = [
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
  ];

  await CategoryModel.bulkWrite(
    categories.map((name) => ({
      updateOne: {
        filter: { name },
        update: { $setOnInsert: { name } },
        upsert: true,
      },
    })),
  );
};

export const getAllCategories = cache(async () => {
  await connectDB();
  return await CategoryModel.find().sort({ createdAt: -1 }).lean<ICategory[]>();
});
