import "server-only";
import { cache } from "react";
import { CuisineModel, type ICuisine } from "@/lib/model/cuisine";
import connectDB from "@/lib/mongodb";
import type { CuisineInput } from "@/lib/validator/cuisine";

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

export const bootstrapCuisines = async () => {
  await connectDB();

  const cuisines = [
    "Italian",
    "Chinese",
    "Japanese",
    "Korean",
    "Nordic / Scandinavian",
  ];

  await CuisineModel.bulkWrite(
    cuisines.map((name) => ({
      updateOne: {
        filter: { name },
        update: { $setOnInsert: { name } },
        upsert: true,
      },
    })),
  );
};

export const getAllCuisines = cache(async () => {
  await connectDB();
  return await CuisineModel.find().sort({ createdAt: -1 }).lean<ICuisine[]>();
});
