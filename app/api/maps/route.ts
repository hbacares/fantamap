import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, description, width, height, gridSizeKm } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  const map = await prisma.map.create({
    data: {
      name,
      description,
      width,
      height,
      gridSizeKm,
      ownerId: user!.id,
    },
  })

  return NextResponse.json(map, { status: 201 })
}