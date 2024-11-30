import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { title, content, categoryName } = await request.json();
  const { id } = await params;
  console.log(title, content, categoryName);

  try {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    const updatedPost = await prisma.posts.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        content,
        categoryId: category.id,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post or category", error);
    return NextResponse.json(
      { error: "Failed to update post or category" },
      { status: 500 },
    );
  }
}
