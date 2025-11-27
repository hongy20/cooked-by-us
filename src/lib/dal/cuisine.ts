import "server-only";
import { cache } from "react";
import { CuisineModel } from "@/lib/model/cuisine";
import connectDB from "@/lib/mongodb";
import type { CuisineInput } from "@/lib/validator/cuisine";
import type { PersistedCuisine } from "./types";
import { toClient } from "./utils";

// Write
export const createCuisine = async (
  data: CuisineInput,
): Promise<PersistedCuisine> => {
  await connectDB();
  const doc = await CuisineModel.create(data);
  return toClient(doc);
};

export const updateCuisine = async (
  cuisineId: string,
  data: CuisineInput,
): Promise<PersistedCuisine | undefined> => {
  await connectDB();
  const doc = await CuisineModel.findByIdAndUpdate(
    cuisineId,
    { $set: data },
    { new: true },
  );
  return doc ? toClient(doc) : undefined;
};

export const deleteCuisine = async (cuisineId: string): Promise<boolean> => {
  await connectDB();
  const doc = await CuisineModel.findByIdAndDelete(cuisineId);
  return !!doc;
};

// Read
export const doesCuisineExist = cache(
  async (cuisineId: string): Promise<boolean> => {
    await connectDB();
    const exists = await CuisineModel.exists({ _id: cuisineId });
    return !!exists;
  },
);

export const getAllCuisines = cache(async (): Promise<PersistedCuisine[]> => {
  await connectDB();
  const docs = await CuisineModel.find().sort({ createdAt: -1 }).lean();
  return docs.map((doc) => toClient(doc));
});
