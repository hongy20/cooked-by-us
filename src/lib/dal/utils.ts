import type { CategoryDoc, CuisineDoc, PopulatedRecipeDoc } from "@/lib/model";
import type {
  PersistedCategory,
  PersistedCuisine,
  PersistedRecipe,
} from "./types";

type Doc = { _id: unknown; createdAt: Date; updatedAt: Date };

// ---- Overload signatures ----
export function toClient(doc: PopulatedRecipeDoc): PersistedRecipe;
export function toClient(doc: CategoryDoc): PersistedCategory;
export function toClient(doc: CuisineDoc): PersistedCuisine;

export function toClient<T extends Doc>(
  doc: T,
): Omit<T, "_id"> & {
  id: string;
};

// ---- Single implementation ----
export function toClient(doc: Doc) {
  // Special case: PopulatedRecipeDoc
  if (isPopulatedRecipeDoc(doc)) {
    return {
      ...baseToClient(doc),
      category: doc.category ? baseToClient(doc.category) : null,
      cuisine: doc.cuisine ? baseToClient(doc.cuisine) : null,
    };
  }

  // Generic
  return baseToClient(doc);
}

// ---- Helper: convert _id fields ----
function baseToClient<T extends Doc>(doc: T) {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: String(_id),
  };
}

function isPopulatedRecipeDoc(doc: Doc): doc is PopulatedRecipeDoc {
  return "category" in doc || "cuisine" in doc;
}
