import "server-only";
import type { Types } from "mongoose";
import { cache } from "react";
import { CategoryModel, type ICategory } from "@/lib/model/category";
import connectDB from "@/lib/mongodb";
import type { CategoryInput } from "@/lib/validator/category";

// Write
export const createCategory = async (data: CategoryInput) => {
  await connectDB();
  return await CategoryModel.create(data);
};

export const updateCategory = async (
  categoryId: string,
  data: CategoryInput,
) => {
  await connectDB();
  return await CategoryModel.findByIdAndUpdate(categoryId, { $set: data });
};

export const deleteCategory = async (categoryId: string) => {
  await connectDB();
  return await CategoryModel.findByIdAndDelete(categoryId);
};

// Read
export const doesCategoryExist = cache(async (categoryId: Types.ObjectId) => {
  await connectDB();
  return await CategoryModel.findById(categoryId).select("_id");
});

export const getAllCategories = cache(async () => {
  await connectDB();
  return await CategoryModel.find().sort({ createdAt: -1 }).lean<ICategory[]>();
});
