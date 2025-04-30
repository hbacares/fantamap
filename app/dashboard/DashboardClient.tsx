"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function DashboardClient() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [maps, setMaps] = useState([])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    if (status === "authenticated") {
      fetch("/api/user/maps")
        .then((res) => res.json())
        .then((data) => setMaps(data))
    }
  }, [status])

  if (status === "loading") {
    return <div className="p-6 text-gray-700">Loading your dashboard...</div>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Maps</h1>
        <Button onClick={() => router.push("/maps/new")}>Create New Map</Button>
      </div>

      {maps.length === 0 ? (
        <div className="text-gray-600 border border-dashed rounded p-6 text-center">
          You haven’t created any maps yet.<br />
          Click “Create New Map” to get started.
        </div>
      ) : (
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Grid Size (km)</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {maps.map((map: any) => (
                <tr key={map.id}>
                  <td className="px-4 py-3 text-gray-900">{map.name}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {map.width} × {map.height}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{map.gridSizeKm} km</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(map.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/maps/${map.id}`)}
                    >
                      Open
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}