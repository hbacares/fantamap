import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const mapId = params.id

  try {
    const map = await prisma.map.findUnique({
      where: { id: mapId },
      select: {
        id: true,
        name: true,
        description: true,
        width: true,
        height: true,
        gridSizeKm: true,
        owner: { select: { email: true } }
      }
    })

    if (!map) return NextResponse.json({ error: "Map not found" }, { status: 404 })
    if (map.owner.email !== session.user.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { owner, ...mapData } = map
    return NextResponse.json(mapData)
  } catch (err) {
    console.error("Map fetch error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
