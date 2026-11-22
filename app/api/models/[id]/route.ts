
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const model = await prisma.aIModel.findUnique({
      where: { id },
    });

    if (!model) {
      return NextResponse.json(
        {
          success: false,
          message: "Model not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: model,
    });
  } catch (error) {
    console.error("Individual Model API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch model",
      },
      { status: 500 }
    );
  }
}
