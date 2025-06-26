// app/maps/[id]/edit/page.tsx

"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MapEditorPage() {
  const { id } = useParams()
  const [mapData, setMapData] = useState<any>(null)
  const [tiles, setTiles] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number } | null>(null)
  const [tileLabel, setTileLabel] = useState("")
  const [scale, setScale] = useState(1) // zoom factor

  useEffect(() => {
    async function fetchMapAndTiles() {
      const res = await fetch(`/api/maps/${id}`)
      if (!res.ok) return setLoading(false)
      const data = await res.json()
      setMapData(data)

      const tileRes = await fetch(`/api/maps/${id}/tiles`)
      if (tileRes.ok) {
        const tileData = await tileRes.json()
        const tileMap: { [key: string]: string } = {}
        tileData.forEach((t: any) => {
          tileMap[`${t.x},${t.y}`] = t.label
        })
        setTiles(tileMap)
      }

      setLoading(false)
    }
    if (id) fetchMapAndTiles()
  }, [id])

  if (loading) return <div className="p-6 text-gray-700">Loading map...</div>
  if (!mapData) return <div className="p-6 text-red-600">Map not found.</div>

  const grid = []
  for (let y = 0; y < mapData.height; y++) {
    for (let x = 0; x < mapData.width; x++) {
      const label = tiles[`${x},${y}`]
      grid.push(
        <div
          key={`${x}-${y}`}
          className={cn(
            "border border-gray-300 flex items-center justify-center text-gray-700 text-center p-0.5 overflow-hidden",
            "hover:bg-blue-50 cursor-pointer"
          )}
          style={{ width: `${2 * scale}rem`, height: `${2 * scale}rem`, fontSize: `${0.625 * scale}rem` }}
          onClick={() => {
            setSelectedCell({ x, y })
            setTileLabel(label || "")
          }}
        >
          {label || `${x},${y}`}
        </div>
      )
    }
  }

  const handleSave = async () => {
    if (!selectedCell) return

    const res = await fetch(`/api/maps/${id}/tiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        x: selectedCell.x,
        y: selectedCell.y,
        label: tileLabel
      })
    })

    if (res.ok) {
      setTiles((prev) => ({
        ...prev,
        [`${selectedCell.x},${selectedCell.y}`]: tileLabel
      }))
      setSelectedCell(null)
      setTileLabel("")
    } else {
      alert("Failed to save tile.")
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Editing: {mapData.name}</h1>
      <p className="mb-4 text-gray-600">{mapData.description}</p>

      <div className="mb-4 flex gap-2 items-center">
        <Button size="sm" onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}>-</Button>
        <span className="text-sm text-gray-700">Zoom: {scale}x</span>
        <Button size="sm" onClick={() => setScale((s) => Math.min(3, s + 0.25))}>+</Button>
      </div>

      <div className="overflow-auto border rounded shadow-inner max-h-[75vh] max-w-full">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${mapData.width}, ${2 * scale}rem)`
          }}
        >
          {grid}
        </div>
      </div>

      <Dialog open={!!selectedCell} onOpenChange={() => setSelectedCell(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tile Editor — ({selectedCell?.x}, {selectedCell?.y})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Label
              <Input
                value={tileLabel}
                onChange={(e) => setTileLabel(e.target.value)}
                placeholder="Mountain, city, cave entrance..."
              />
            </label>
            <Button onClick={handleSave} className="w-full">
              Save Tile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}