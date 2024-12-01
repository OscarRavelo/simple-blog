import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { title, content, categoryName } = await request.json();
  const { id } = await params;

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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    const deletedPost = await prisma.posts.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json(deletedPost, { status: 200 });
  } catch (error) {
    console.error("Error deleting the post", error);
    return NextResponse.json(
      { error: "failed to delete post" },
      { status: 500 },
    );
  }
}
