import "server-only";
import type { Types } from "mongoose";
import { cache } from "react";
import { CuisineModel, type ICuisine } from "@/lib/model/cuisine";
import connectDB from "@/lib/mongodb";
import type { CuisineInput } from "@/lib/validator/cuisine";

// Write
export const createCuisine = async (data: CuisineInput) => {
  await connectDB();
  return await CuisineModel.create(data);
};

export const editCuisine = async (cuisineId: string, data: CuisineInput) => {
  await connectDB();
  return await CuisineModel.findByIdAndUpdate(
    { _id: cuisineId },
    { $set: data },
  );
};

// Read
export const doesCuisineExist = cache(async (cuisineId: Types.ObjectId) => {
  await connectDB();
  return await CuisineModel.findById(cuisineId).select("_id");
});

export const getAllCuisines = cache(async () => {
  await connectDB();
  return await CuisineModel.find().sort({ createdAt: -1 }).lean<ICuisine[]>();
});
