import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, categoryId } = body;

    if (!title || !content) {
      return NextResponse.json(
        {
          error: "Title and content are required",
        },
        {
          status: 400,
        },
      );
    }

    const newPost = await prisma.posts.create({
      data: {
        title,
        content,
        categoryId,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("error creating post", error);
  }
}

export async function GET() {
  console.log("calling the endpoint");
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Category: true,
      },
    });

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error) {
    console.error("Errorr fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
