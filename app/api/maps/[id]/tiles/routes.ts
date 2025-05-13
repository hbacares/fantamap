// app/api/maps/[id]/tiles/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const mapId = params.id
  const { x, y, label } = await req.json()

  try {
    const map = await prisma.map.findUnique({
      where: { id: mapId },
      select: { owner: true }
    })

    if (!map) return NextResponse.json({ error: "Map not found" }, { status: 404 })
    if (map.owner.email !== session.user.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const tile = await prisma.tile.upsert({
      where: {
        mapId_x_y: {
          mapId,
          x,
          y
        }
      },
      update: {
        label
      },
      create: {
        mapId,
        x,
        y,
        label
      }
    })

    return NextResponse.json(tile)
  } catch (err) {
    console.error("Tile save error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}