import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const allowedSorts = new Set(["name", "newest", "price", "outputPrice", "context"]);

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const search = (params.get("search") || "").trim().slice(0, 100);
    const provider = (params.get("provider") || "").trim();
    const category = (params.get("category") || "").trim();
    const speed = (params.get("speed") || "").trim();
    const sort = params.get("sort") || "name";
    const featured = params.get("featured");
    const openSource = params.get("openSource");
    const page = Math.max(1, Math.min(1000, Number.parseInt(params.get("page") || "1", 10) || 1));
    const limit = Math.max(1, Math.min(100, Number.parseInt(params.get("limit") || "100", 10) || 100));

    const where: Prisma.AIModelWhereInput = {
      ...(search ? { OR: [
        { name: { contains: search, mode: "insensitive" } },
        { provider: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ] } : {}),
      ...(provider && provider !== "All" && provider !== "all" ? { provider } : {}),
      ...(category && category !== "All" && category !== "all" ? { category } : {}),
      ...(speed ? { speed } : {}),
      ...(featured === "true" ? { featured: true } : {}),
      ...(featured === "false" ? { featured: false } : {}),
      ...(openSource === "true" ? { openSource: true } : {}),
      ...(openSource === "false" ? { openSource: false } : {}),
    };

    const sortKey = allowedSorts.has(sort) ? sort : "name";
    const orderBy: Prisma.AIModelOrderByWithRelationInput =
      sortKey === "price" ? { inputPrice: "asc" } :
      sortKey === "outputPrice" ? { outputPrice: "asc" } :
      sortKey === "context" ? { context: "desc" } :
      sortKey === "newest" ? { createdAt: "desc" } : { name: "asc" };

    const [total, data] = await prisma.$transaction([
      prisma.aIModel.count({ where }),
      prisma.aIModel.findMany({
        where, orderBy, skip: (page - 1) * limit, take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      count: data.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET /api/models failed:", error);
    return NextResponse.json({ success: false, message: "Could not load models. Check the database connection and try again." }, { status: 500 });
  }
}
