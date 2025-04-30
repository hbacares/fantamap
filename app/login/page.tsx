"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (res?.ok) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-center mb-6">Login to Fantamap</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
          className="space-y-5"
        >
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}