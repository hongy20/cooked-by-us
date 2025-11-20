import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Run your migration

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
