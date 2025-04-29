// app/login/page.tsx
"use client"

import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    })

    if (res?.ok) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-24 space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}