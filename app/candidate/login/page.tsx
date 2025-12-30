"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Briefcase, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"

export default function CandidateLoginPage() {
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
      localStorage.setItem("candidateAuth", JSON.stringify({ email: formData.email }))
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
      router.push("/candidate/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-background">
      {/* Visual side */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative overflow-hidden flex-col justify-center p-12 lg:p-24 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[120px]" />

        <Link
          href="/"
          className="absolute top-12 left-12 flex items-center gap-2 font-display font-bold text-2xl group text-white"
        >
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <span>JobConnect</span>
        </Link>

        <div className="relative space-y-8 max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-2" />
              Candidate Portal
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold leading-tight">
              Unlock Your <br />
              <span className="text-secondary-foreground">Career Potential</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Join thousands of professionals finding their next big opportunity in Ethiopia. Access exclusive jobs,
              track applications, and take skills assessments.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold">12k+</div>
              <div className="text-sm text-primary-foreground/60">Jobs Posted</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="text-sm text-primary-foreground/60">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-muted-foreground">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
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
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 font-bold text-base shadow-lg" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                type="button"
                className="h-11 border-border/50 hover:bg-muted font-medium bg-transparent"
              >
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                className="h-11 border-border/50 hover:bg-muted font-medium bg-transparent"
              >
                LinkedIn
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/candidate/register" className="font-bold text-primary hover:underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
