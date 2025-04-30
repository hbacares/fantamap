"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function NewMapPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) return

    setLoading(true)
    const res = await fetch("/api/maps", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        width: 100,
        height: 100,
        gridSizeKm: 1,
      }),
    })

    if (res.ok) {
      const map = await res.json()
      router.push(`/maps/${map.id}/edit`)
    } else {
      alert("Something went wrong creating the map.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create New Map</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            id="name"
            placeholder="Map name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="A short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button onClick={handleCreate} disabled={loading || !name.trim()} className="w-full">
          {loading ? "Creating..." : "Create Map"}
        </Button>
      </div>
    </div>
  )
}