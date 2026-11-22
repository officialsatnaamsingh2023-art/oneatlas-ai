
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const search = params.get("search") || "";
    const provider = params.get("provider") || "";
    const category = params.get("category") || "";
    const sort = params.get("sort") || "name";

    const where: Prisma.AIModelWhereInput = {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                provider: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      ...(provider ? { provider } : {}),
      ...(category ? { category } : {}),
    };

    const orderBy: Prisma.AIModelOrderByWithRelationInput =
      sort === "price"
        ? { inputPrice: "asc" }
        : sort === "newest"
          ? { createdAt: "desc" }
          : { name: "asc" };

    const models = await prisma.aIModel.findMany({
      where,
      orderBy,
    });

    return NextResponse.json({
      success: true,
      count: models.length,
      data: models,
    });
  } catch (error) {
    console.error("Models API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch AI models",
      },
      { status: 500 }
    );
  }
}
