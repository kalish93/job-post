"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Briefcase, Building2, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"

export default function EmployerLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock login
    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem("employerAuth", JSON.stringify({ email: formData.email }))
      toast({
        title: "Welcome back!",
        description: "Employer account accessed successfully.",
      })
      router.push("/employer/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-background">
      {/* Visual side - Employer themed */}
      <div className="hidden md:flex md:w-1/2 bg-secondary relative overflow-hidden flex-col justify-center p-12 lg:p-24 text-secondary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />

        <Link
          href="/"
          className="absolute top-12 left-12 flex items-center gap-2 font-display font-bold text-2xl text-white"
        >
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Briefcase className="w-5 h-5" />
          </div>
          <span>JobConnect</span>
        </Link>

        <div className="relative space-y-8 max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-sm">
              <Building2 className="w-3 h-3 mr-2" />
              Employer Portal
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Hire Ethiopia's <br />
              <span className="text-primary-foreground">Top Talent</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Post jobs, manage candidates, and build your world-class team with our specialized recruitment tools.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI-Powered Matching</h3>
                <p className="text-white/60 text-sm">Find the perfect fit faster with our matching algorithms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold tracking-tight">Employer Sign In</h2>
            <p className="text-muted-foreground">Access your hiring dashboard and job postings.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-bold text-base shadow-lg bg-secondary hover:bg-secondary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login to Dashboard"}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              New to JobConnect?{" "}
              <Link href="/employer/register" className="font-bold text-secondary hover:underline">
                Create employer account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
