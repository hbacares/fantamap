// app/register/page.tsx
"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import bcrypt from "bcryptjs"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      router.push("/login")
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-24 space-y-4">
      <h1 className="text-2xl font-semibold">Register</h1>
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  )
}