"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Briefcase, Phone, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"

export default function CandidateRegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    otp: "",
  })

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock OTP sending
    setTimeout(() => {
      setIsLoading(false)
      setShowOTP(true)
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      })
    }, 1000)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock OTP verification
    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem("candidateAuth", JSON.stringify({ phone: formData.phone, email: formData.email }))
      toast({
        title: "Success!",
        description: "Your account has been created.",
      })
      router.push("/candidate/profile/create")
    }, 1000)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-background">
      {/* Visual side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden flex-col justify-center p-12 lg:p-24 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />

        <Link
          href="/"
          className="absolute top-12 left-12 flex items-center gap-2 font-display font-bold text-2xl text-white"
        >
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Briefcase className="w-5 h-5" />
          </div>
          <span>JobConnect</span>
        </Link>

        <div className="relative space-y-12 max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-2" />
              Join the Workforce
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold leading-tight">
              Start Your Journey <br />
              <span className="text-secondary-foreground">Today</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Create your professional profile and get matched with top companies across Ethiopia.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Personalized Matching</h3>
                <p className="text-primary-foreground/60 text-sm">
                  We suggest jobs based on your unique skills and experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Verified Employers</h3>
                <p className="text-primary-foreground/60 text-sm">
                  Every company on our platform is thoroughly vetted for security.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Skill Assessments</h3>
                <p className="text-primary-foreground/60 text-sm">
                  Prove your expertise with our integrated testing platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold tracking-tight">Create Account</h2>
            <p className="text-muted-foreground">Enter your details to get started as a candidate.</p>
          </div>

          {!showOTP ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+251 900 000 000"
                      className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password">Password</Label>
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
                {isLoading ? "Processing..." : "Continue to Verification"}
                {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/candidate/login" className="font-bold text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className="h-14 text-center text-2xl font-bold tracking-[0.5em] bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    A code has been sent to <span className="font-bold">{formData.phone}</span>
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 font-bold text-base shadow-lg" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify & Create Account"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full h-12 font-medium"
                onClick={() => setShowOTP(false)}
              >
                Back to details
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button type="button" className="font-bold text-primary hover:underline">
                    Resend Code
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
