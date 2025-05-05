// app/maps/[id]/edit/page.tsx

"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function MapEditorPage() {
  const { id } = useParams()
  const [mapData, setMapData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMap() {
      const res = await fetch(`/api/maps/${id}`)
      if (res.ok) {
        const data = await res.json()
        setMapData(data)
      }
      setLoading(false)
    }
    if (id) fetchMap()
  }, [id])

  if (loading) return <div className="p-6 text-gray-700">Loading map...</div>
  if (!mapData) return <div className="p-6 text-red-600">Map not found.</div>

  const grid = []
  for (let y = 0; y < mapData.height; y++) {
    for (let x = 0; x < mapData.width; x++) {
      grid.push(
        <div
          key={`${x}-${y}`}
          className={cn(
            "border border-gray-300 w-8 h-8 text-[10px] flex items-center justify-center text-gray-500",
            "hover:bg-blue-50 cursor-pointer"
          )}
        >
          {x},{y}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Editing: {mapData.name}</h1>
      <p className="mb-6 text-gray-600">{mapData.description}</p>

      <div className="overflow-auto border rounded shadow-inner max-h-[75vh] max-w-full">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${mapData.width}, 2rem)`
          }}
        >
          {grid}
        </div>
      </div>
    </div>
  )
}
