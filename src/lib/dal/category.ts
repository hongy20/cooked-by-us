import "server-only";
import { cacheTag } from "next/cache";
import { cache } from "react";
import { CACHE_TAG_CATEGORIES } from "@/lib/constant";
import { CategoryModel } from "@/lib/model/category";
import connectDB from "@/lib/mongodb";
import type { CategoryInput } from "@/lib/validator/category";
import type { PersistedCategory } from "./types";
import { toClient } from "./utils";

// Write
export const createCategory = async (
  data: CategoryInput,
): Promise<PersistedCategory> => {
  await connectDB();
  const doc = await CategoryModel.create(data);
  return toClient(doc);
};

export const updateCategory = async (
  categoryId: string,
  data: CategoryInput,
): Promise<PersistedCategory | undefined> => {
  await connectDB();
  const doc = await CategoryModel.findByIdAndUpdate(
    categoryId,
    { $set: data },
    { new: true },
  );
  return doc ? toClient(doc) : undefined;
};

export const deleteCategory = async (categoryId: string): Promise<boolean> => {
  await connectDB();
  const doc = await CategoryModel.findByIdAndDelete(categoryId);
  return !!doc;
};

// Read
export const doesCategoryExist = cache(
  async (categoryId: string): Promise<boolean> => {
    "use cache";
    cacheTag(CACHE_TAG_CATEGORIES);

    await connectDB();
    const doc = await CategoryModel.exists({ _id: categoryId });
    return !!doc;
  },
);

export const getAllCategories = cache(
  async (): Promise<PersistedCategory[]> => {
    "use cache";
    cacheTag(CACHE_TAG_CATEGORIES);

    await connectDB();
    const docs = await CategoryModel.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => toClient(doc));
  },
);
