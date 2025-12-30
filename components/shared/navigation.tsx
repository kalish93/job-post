"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Briefcase, User, LogOut, Menu, Building2, FileText, Phone, DollarSign } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// Import Sheet components for mobile drawer navigation
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [candidateAuth, setCandidateAuth] = useState<string | null>(null)
  const [employerAuth, setEmployerAuth] = useState<string | null>(null)
  // Replace isMenuOpen with Sheet open state
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    setCandidateAuth(localStorage.getItem("candidateAuth"))
    setEmployerAuth(localStorage.getItem("employerAuth"))
  }, [pathname])

  const handleLogout = (role: "candidate" | "employer") => {
    localStorage.removeItem(`${role}Auth`)
    if (role === "candidate") setCandidateAuth(null)
    else setEmployerAuth(null)
    // Close sheet after logout
    setIsSheetOpen(false)
    router.push("/")
  }

  const isLoggedIn = !!candidateAuth || !!employerAuth

  return (
    <nav className="border-b bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Increased height for better mobile touch targets */}
        <div className="flex justify-between h-16 md:h-16">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Slightly larger logo on mobile for better visibility */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              {/* Responsive text sizing */}
              <span className="font-display font-bold text-lg md:text-xl text-foreground tracking-tight">
                Job<span className="text-primary">Connect</span>
              </span>
            </Link>

            {/* Desktop navigation - unchanged */}
            <div className="hidden md:flex items-center space-x-1">
              {!isLoggedIn && (
                <>
                  <Link
                    href="/"
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === "/"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    href="/about"
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === "/about"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Building2 className="w-4 h-4 mr-1.5" />
                    About
                  </Link>
                  <Link
                    href="/pricing"
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === "/pricing"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <DollarSign className="w-4 h-4 mr-1.5" />
                    Pricing
                  </Link>
                  <Link
                    href="/contact"
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === "/contact"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Phone className="w-4 h-4 mr-1.5" />
                    Contact
                  </Link>
                </>
              )}
              {candidateAuth && (
                <Link
                  href="/candidate/dashboard"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname.startsWith("/candidate/dashboard")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  My Dashboard
                </Link>
              )}
              {employerAuth && (
                <Link
                  href="/employer/dashboard"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname.startsWith("/employer/dashboard")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  Employer Panel
                </Link>
              )}
            </div>
          </div>

          {/* Desktop auth buttons - unchanged */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Button asChild variant="ghost" size="sm" className="font-medium hover:bg-muted">
                  <Link href="/candidate/login">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="shadow-md hover:shadow-lg transition-shadow font-medium">
                  <Link href="/candidate/register">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="font-medium border-primary/20 hover:bg-primary/5 bg-transparent"
                >
                  <Link href="/employer/login">
                    <Building2 className="w-4 h-4 mr-1.5" />
                    For Employers
                  </Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-card hover:bg-muted font-medium"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-display">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {candidateAuth && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/candidate/profile/edit" className="cursor-pointer">
                          <FileText className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/candidate/dashboard" className="cursor-pointer">
                          <Briefcase className="w-4 h-4 mr-2" />
                          My Applications
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleLogout("candidate")}
                        className="text-destructive cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                  {employerAuth && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/employer/dashboard" className="cursor-pointer">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Manage Jobs
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/employer/post-job" className="cursor-pointer">
                          <FileText className="w-4 h-4 mr-2" />
                          Post New Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleLogout("employer")}
                        className="text-destructive cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile sheet trigger with better touch target */}
          <div className="flex items-center md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-display text-left">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span>
                        Job<span className="text-primary">Connect</span>
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile menu content with better spacing and touch targets */}
                <div className="flex flex-col gap-6 mt-8">
                  {!isLoggedIn && (
                    <>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Briefcase className="w-5 h-5" />
                          Browse Jobs
                        </Link>
                        <Link
                          href="/about"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/about" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Building2 className="w-5 h-5" />
                          About
                        </Link>
                        <Link
                          href="/pricing"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/pricing" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <DollarSign className="w-5 h-5" />
                          Pricing
                        </Link>
                        <Link
                          href="/contact"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/contact" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Phone className="w-5 h-5" />
                          Contact
                        </Link>
                        <Link
                          href="/employer/register"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname === "/employer/register"
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Building2 className="w-5 h-5" />
                          Employer Sign Up
                        </Link>
                      </div>

                      <div className="border-t pt-4 flex flex-col gap-2">
                        <Button asChild size="lg" className="w-full justify-start h-12 text-base font-semibold">
                          <Link href="/candidate/register" onClick={() => setIsSheetOpen(false)}>
                            Get Started as Candidate
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="w-full justify-start h-12 text-base bg-transparent"
                        >
                          <Link href="/candidate/login" onClick={() => setIsSheetOpen(false)}>
                            Sign In
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="w-full justify-start h-12 text-base border-primary/20 bg-transparent"
                        >
                          <Link href="/employer/login" onClick={() => setIsSheetOpen(false)}>
                            <Building2 className="w-5 h-5 mr-2" />
                            For Employers
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}

                  {candidateAuth && (
                    <>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/candidate/dashboard"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname.startsWith("/candidate/dashboard")
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Briefcase className="w-5 h-5" />
                          My Dashboard
                        </Link>
                        <Link
                          href="/candidate/profile/edit"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <FileText className="w-5 h-5" />
                          Edit Profile
                        </Link>
                      </div>
                      <div className="border-t pt-4">
                        <Button
                          variant="destructive"
                          size="lg"
                          className="w-full justify-start h-12 text-base"
                          onClick={() => handleLogout("candidate")}
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </>
                  )}

                  {employerAuth && (
                    <>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/employer/dashboard"
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            pathname.startsWith("/employer/dashboard")
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Briefcase className="w-5 h-5" />
                          Employer Panel
                        </Link>
                        <Link
                          href="/employer/post-job"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <FileText className="w-5 h-5" />
                          Post New Job
                        </Link>
                      </div>
                      <div className="border-t pt-4">
                        <Button
                          variant="destructive"
                          size="lg"
                          className="w-full justify-start h-12 text-base"
                          onClick={() => handleLogout("employer")}
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Logout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
