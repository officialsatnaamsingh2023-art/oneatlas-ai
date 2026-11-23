import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ success: true, status: "ok", database: "connected", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Health check database error:", error);
    return NextResponse.json({ success: false, status: "degraded", database: "unavailable", timestamp: new Date().toISOString() }, { status: 503 });
  }
}
