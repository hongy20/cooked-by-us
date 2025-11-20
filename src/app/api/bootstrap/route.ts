import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { bootstrapCategories } from "@/lib/dal/category";
import { bootstrapCuisines } from "@/lib/dal/cuisine";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await bootstrapCategories();
    await bootstrapCuisines();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
