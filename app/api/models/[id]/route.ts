import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const model = await prisma.aIModel.findUnique({ where: { id } });
    if (!model) return NextResponse.json({ success: false, message: "Model not found." }, { status: 404 });
    return NextResponse.json({ success: true, data: model }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET /api/models/[id] failed:", error);
    return NextResponse.json({ success: false, message: "Could not load this model." }, { status: 500 });
  }
}
