"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, Mail, Phone, MapPin, GraduationCap, Briefcase, Star } from "lucide-react"
import Link from "next/link"

export default function JobApplicantsPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [job, setJob] = useState<any>(null)
  const [applicants, setApplicants] = useState<any[]>([])

  useEffect(() => {
    // Load job and applicants
    const jobs = JSON.parse(localStorage.getItem("employerJobs") || "[]")
    const currentJob = jobs.find((j: any) => j.id === params.jobId)
    if (currentJob) {
      setJob(currentJob)
      // Mock applicants with test results
      const mockApplicants = [
        {
          id: "1",
          fullName: "Abebe Kebede",
          email: "abebe@email.com",
          phone: "+251911223344",
          location: "Addis Ababa",
          education: "bachelors",
          fieldOfStudy: "Computer Science",
          experience: "1-2",
          skills: "JavaScript, React, Node.js",
          testScore: 85,
          shortlisted: false,
        },
        {
          id: "2",
          fullName: "Tigist Haile",
          email: "tigist@email.com",
          phone: "+251922334455",
          location: "Addis Ababa",
          education: "masters",
          fieldOfStudy: "Software Engineering",
          experience: "3+",
          skills: "JavaScript, React, TypeScript",
          testScore: 92,
          shortlisted: false,
        },
      ]
      setApplicants(currentJob.applicants?.length > 0 ? currentJob.applicants : mockApplicants)
    }
  }, [params.jobId])

  const handleShortlist = (applicantId: string) => {
    const updatedApplicants = applicants.map((a) => (a.id === applicantId ? { ...a, shortlisted: !a.shortlisted } : a))
    setApplicants(updatedApplicants)

    // Update localStorage
    const jobs = JSON.parse(localStorage.getItem("employerJobs") || "[]")
    const updatedJobs = jobs.map((j: any) => (j.id === params.jobId ? { ...j, applicants: updatedApplicants } : j))
    localStorage.setItem("employerJobs", JSON.stringify(updatedJobs))

    const applicant = updatedApplicants.find((a) => a.id === applicantId)
    toast({
      title: applicant?.shortlisted ? "Candidate Shortlisted!" : "Removed from Shortlist",
      description: applicant?.shortlisted
        ? `${applicant.fullName} has been notified via SMS.`
        : `${applicant.fullName} removed from shortlist.`,
    })
  }

  if (!job) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-2">
            <Link href="/employer/dashboard">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-muted-foreground">{applicants.length} Applicants</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {applicants.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No applicants yet.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {applicants.map((applicant) => (
              <Card key={applicant.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{applicant.fullName}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {applicant.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {applicant.phone}
                        </span>
                      </CardDescription>
                    </div>
                    <Button
                      variant={applicant.shortlisted ? "default" : "outline"}
                      onClick={() => handleShortlist(applicant.id)}
                    >
                      <Star className={`w-4 h-4 mr-2 ${applicant.shortlisted ? "fill-current" : ""}`} />
                      {applicant.shortlisted ? "Shortlisted" : "Shortlist"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Location:</span>
                        <span>{applicant.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Education:</span>
                        <span>
                          {applicant.education} in {applicant.fieldOfStudy}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Experience:</span>
                        <span>{applicant.experience}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {applicant.skills.split(",").map((skill: string) => (
                            <Badge key={skill.trim()} variant="secondary" className="text-xs">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {applicant.testScore && (
                        <div className="text-sm">
                          <span className="font-medium">Test Score:</span>
                          <Badge
                            variant="outline"
                            className={`ml-2 ${
                              applicant.testScore >= 80
                                ? "border-green-500 text-green-700"
                                : applicant.testScore >= 60
                                  ? "border-yellow-500 text-yellow-700"
                                  : "border-red-500 text-red-700"
                            }`}
                          >
                            {applicant.testScore}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  {applicant.shortlisted && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-primary font-medium">
                        Candidate has been shortlisted and notified via SMS
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
