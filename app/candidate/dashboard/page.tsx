"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, GraduationCap, Clock, User } from "lucide-react"
import Link from "next/link"

// Mock job data
const MOCK_JOBS = [
  {
    id: "1",
    title: "Software Developer",
    company: "Tech Solutions Ethiopia",
    location: "Addis Ababa",
    education: "bachelors",
    experience: "1-2",
    skills: ["JavaScript", "React", "Node.js"],
    description: "We are looking for a talented software developer to join our growing team.",
    hasTest: true,
    postedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Marketing Manager",
    company: "Bloom Marketing",
    location: "Addis Ababa",
    education: "bachelors",
    experience: "3+",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    description: "Lead our marketing initiatives and grow our brand presence.",
    hasTest: false,
    postedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Accountant",
    company: "Finance Pro",
    location: "Dire Dawa",
    education: "bachelors",
    experience: "1-2",
    skills: ["Accounting", "Excel", "QuickBooks"],
    description: "Join our finance team to manage accounts and financial reporting.",
    hasTest: true,
    postedAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Customer Service Representative",
    company: "CallCenter Plus",
    location: "Hawassa",
    education: "diploma",
    experience: "fresh",
    skills: ["Communication", "Problem Solving", "Customer Service"],
    description: "Provide excellent customer support via phone and email.",
    hasTest: false,
    postedAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Graphic Designer",
    company: "Creative Studio",
    location: "Addis Ababa",
    education: "diploma",
    experience: "1-2",
    skills: ["Photoshop", "Illustrator", "InDesign"],
    description: "Create stunning visual designs for our clients.",
    hasTest: true,
    postedAt: "2024-01-11",
  },
]

export default function CandidateDashboard() {
  const router = useRouter()
  const [jobs, setJobs] = useState(MOCK_JOBS)
  const [filters, setFilters] = useState({
    location: "",
    skills: "",
    education: "any", // Updated default value to be a non-empty string
  })
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    // Check auth
    const auth = localStorage.getItem("candidateAuth")
    if (!auth) {
      router.push("/candidate/login")
      return
    }

    // Load profile
    const savedProfile = localStorage.getItem("candidateProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [router])

  const filteredJobs = jobs.filter((job) => {
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (filters.skills) {
      const searchSkills = filters.skills
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
      const hasMatchingSkill = searchSkills.some((searchSkill) =>
        job.skills.some((jobSkill) => jobSkill.toLowerCase().includes(searchSkill)),
      )
      if (!hasMatchingSkill) return false
    }
    if (filters.education !== "any" && job.education !== filters.education) {
      // Updated condition to handle "any" value
      return false
    }
    return true
  })

  const handleApply = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId)
    if (job?.hasTest) {
      router.push(`/candidate/test/${jobId}`)
    } else {
      // Direct application
      const applications = JSON.parse(localStorage.getItem("candidateApplications") || "[]")
      applications.push({ jobId, appliedAt: new Date().toISOString() })
      localStorage.setItem("candidateApplications", JSON.stringify(applications))
      alert("Application submitted successfully! You will receive an SMS confirmation.")
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            {profile && (
              <div className="text-sm text-muted-foreground hidden sm:block">
                Welcome, <span className="font-medium text-foreground">{profile.fullName || "User"}</span>
              </div>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href="/candidate/profile/edit">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Jobs</CardTitle>
            <CardDescription>Find jobs that match your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Addis Ababa"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g., JavaScript, Marketing"
                  value={filters.skills}
                  onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Select
                  value={filters.education}
                  onValueChange={(value) => setFilters({ ...filters, education: value })}
                >
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem> // Updated value prop to be a non-empty string
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
                    <SelectItem value="masters">Master&apos;s Degree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Jobs ({filteredJobs.length})</h2>

          {filteredJobs.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No jobs found matching your filters.</p>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.company}</CardDescription>
                    </div>
                    <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {job.education}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.experience}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {job.hasTest && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Test Required
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
