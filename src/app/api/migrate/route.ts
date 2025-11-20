import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { migrateXXX } from "@/lib/migration";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Run your migration
    await migrateXXX();

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
