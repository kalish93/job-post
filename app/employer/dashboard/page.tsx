"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Plus, Users, MapPin, Eye, Search, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function DashboardContent() {
  const router = useRouter()
  const [employer, setEmployer] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    // Check auth
    const auth = localStorage.getItem("employerAuth")
    if (!auth) {
      router.push("/employer/login")
      return
    }
    setEmployer(JSON.parse(auth))

    // Load posted jobs
    const savedJobs = JSON.parse(localStorage.getItem("employerJobs") || "[]")
    setJobs(savedJobs)
  }, [router])

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Employer Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your job listings and track applications</p>
          </div>
          <Button asChild className="rounded-xl shadow-lg">
            <Link href="/employer/post-job">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Briefcase className="w-5 h-5" />
                </div>
                <TrendingUp className="w-4 h-4 text-white/60" />
              </div>
              <p className="text-2xl font-bold">{jobs.length}</p>
              <p className="text-sm text-primary-foreground/70">Active Listings</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold">{jobs.reduce((acc, job) => acc + (job.applicants?.length || 0), 0)}</p>
              <p className="text-sm text-muted-foreground">Total Applicants</p>
            </CardContent>
          </Card>
          {/* ... other stats ... */}
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold">Manage Jobs</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="w-full pl-10 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Search your jobs..."
              />
            </div>
          </div>

          {jobs.length === 0 ? (
            <Card className="p-20 text-center border-dashed border-2 bg-transparent">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">No active jobs found</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Start by posting your first job opening to find the best talent in Ethiopia.
              </p>
              <Button asChild size="lg" className="rounded-xl px-8">
                <Link href="/employer/post-job">Post Your First Job</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} className="group border-none shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-primary/5 rounded-lg text-primary">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 border-none">
                        Active
                      </Badge>
                    </div>
                    <CardTitle className="pt-4 text-xl group-hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Jan 20
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl mb-6">
                      <div className="text-center flex-1">
                        <p className="text-lg font-bold">{job.applicants?.length || 0}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                          Applicants
                        </p>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div className="text-center flex-1">
                        <p className="text-lg font-bold">0</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">New</p>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-xl bg-transparent border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary"
                    >
                      <Link href={`/employer/job/${job.id}/applicants`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Manage Applicants
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function EmployerDashboard() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  )
}
