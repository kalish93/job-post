"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Building2,
  Sparkles,
  ChevronRight,
  DollarSign,
  GraduationCap,
  Calendar,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Extended mock job data with more realistic entries
const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior Full-Stack Developer",
    company: "EthioTech Solutions",
    location: "Addis Ababa",
    type: "Full-time",
    education: "bachelors",
    experience: "5+ years",
    salary: 45000,
    skills: ["Next.js", "PostgreSQL", "Tailwind", "TypeScript"],
    description:
      "Join our core team to lead the development of our high-scale fintech platform. You will be responsible for architecture, performance optimization, and mentoring junior engineers.",
    hasTest: true,
    postedAt: "2 days ago",
    applicants: 24,
    verified: true,
  },
  {
    id: "2",
    title: "Digital Marketing Specialist",
    company: "Nile Media Group",
    location: "Bahir Dar",
    type: "Remote",
    education: "diploma",
    experience: "1-2 years",
    salary: 20000,
    skills: ["SEO", "Content Marketing", "Google Ads"],
    description:
      "Help us expand our digital footprint across the Nile region. We are looking for a creative individual who can manage multiple campaigns and deliver measurable growth results.",
    hasTest: false,
    postedAt: "1 week ago",
    applicants: 18,
    verified: true,
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Design Hub Africa",
    location: "Addis Ababa",
    type: "Full-time",
    education: "bachelors",
    experience: "3-5 years",
    salary: 35000,
    skills: ["Figma", "User Research", "Prototyping"],
    description:
      "We are looking for a designer who lives and breathes user-centric design. You will work closely with developers to create intuitive and beautiful interfaces for our mobile and web apps.",
    hasTest: true,
    postedAt: "3 days ago",
    applicants: 31,
    verified: false,
  },
  {
    id: "4",
    title: "Customer Success Manager",
    company: "CloudEth Services",
    location: "Dire Dawa",
    type: "Full-time",
    education: "bachelors",
    experience: "2-3 years",
    salary: 28000,
    skills: ["Communication", "CRM", "Problem Solving"],
    description:
      "Ensure our enterprise clients get the most value out of our cloud solutions. You will be the primary point of contact for technical onboarding and long-term relationship management.",
    hasTest: false,
    postedAt: "5 days ago",
    applicants: 12,
    verified: true,
  },
  {
    id: "5",
    title: "Data Analyst",
    company: "FinTech Ethiopia",
    location: "Addis Ababa",
    type: "Contract",
    education: "masters",
    experience: "3-5 years",
    salary: 40000,
    skills: ["Python", "SQL", "Tableau", "Excel"],
    description:
      "Turn data into actionable business insights. You will clean complex datasets, build predictive models, and present findings to key stakeholders in our finance department.",
    hasTest: true,
    postedAt: "1 day ago",
    applicants: 45,
    verified: true,
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [educationFilter, setEducationFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [salaryRange, setSalaryRange] = useState([0, 100000])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Advanced filtering logic
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLocation = locationFilter === "all" || job.location === locationFilter
    const matchesType = typeFilter === "all" || job.type === typeFilter
    const matchesEducation = educationFilter === "all" || job.education === educationFilter
    const matchesExperience = experienceFilter === "all" || job.experience === experienceFilter
    const matchesSalary = job.salary >= salaryRange[0] && job.salary <= salaryRange[1]
    const matchesVerified = !showVerifiedOnly || job.verified

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesEducation &&
      matchesExperience &&
      matchesSalary &&
      matchesVerified
    )
  }).sort((a, b) => {
    if (sortBy === "salary-high") return b.salary - a.salary
    if (sortBy === "salary-low") return a.salary - b.salary
    if (sortBy === "applicants") return b.applicants - a.applicants
    return 0 // newest (default order)
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary pt-12 md:pt-16 pb-20 md:pb-24 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center text-primary-foreground">
          <Badge className="mb-4 md:mb-6 bg-white/20 text-white border-white/30 backdrop-blur-md shadow-lg text-xs md:text-sm">
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5" />
            Ethiopia's Premier Job Platform
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 text-balance leading-tight px-2">
            Discover Your Next
            <br />
            <span className="bg-gradient-to-r from-white to-secondary-foreground bg-clip-text text-transparent">
              Career Opportunity
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8 md:mb-10 text-pretty leading-relaxed px-4">
            Connect with thousands of leading employers across Ethiopia. From tech startups to established enterprises,
            your dream job awaits.
          </p>

          <div className="relative">
            <Card className="border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-2 sm:p-3">
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input
                      className="pl-10 md:pl-12 h-11 md:h-14 border-none bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary/20 text-sm md:text-base"
                      placeholder="Job title, skills, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 flex items-center relative">
                      <MapPin className="absolute left-3 md:left-4 w-4 h-4 md:w-5 md:h-5 text-muted-foreground pointer-events-none z-10" />
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="h-11 md:h-14 border-none bg-muted/50 pl-10 md:pl-12 text-sm md:text-base focus:ring-2 focus:ring-primary/20">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                          <SelectItem value="Bahir Dar">Bahir Dar</SelectItem>
                          <SelectItem value="Dire Dawa">Dire Dawa</SelectItem>
                          <SelectItem value="Hawassa">Hawassa</SelectItem>
                          <SelectItem value="Mekelle">Mekelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      size="lg"
                      className="h-11 md:h-14 px-6 md:px-10 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                    >
                      <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Search Jobs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-6 md:mt-8 text-primary-foreground/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold">1,200+</span> Active Jobs
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold">350+</span> Companies
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold">5,000+</span> Candidates
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 -mt-6 md:-mt-8 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          <aside className="hidden lg:block lg:col-span-1">
            <Card className="border-border/50 shadow-lg sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display font-bold text-lg">
                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                    Filters
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setLocationFilter("all")
                      setTypeFilter("all")
                      setEducationFilter("all")
                      setExperienceFilter("all")
                      setSalaryRange([0, 100000])
                      setShowVerifiedOnly(false)
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Reset
                  </Button>
                </div>

                {/* Employment Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Employment Type
                  </Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Education Level */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    Education Level
                  </Label>
                  <Select value={educationFilter} onValueChange={setEducationFilter}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelors">Bachelor's</SelectItem>
                      <SelectItem value="masters">Master's</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Experience
                  </Label>
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="0-1 years">Entry Level (0-1y)</SelectItem>
                      <SelectItem value="1-2 years">Junior (1-2y)</SelectItem>
                      <SelectItem value="2-3 years">Mid-Level (2-3y)</SelectItem>
                      <SelectItem value="3-5 years">Senior (3-5y)</SelectItem>
                      <SelectItem value="5+ years">Expert (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Salary Range (ETB)
                  </Label>
                  <div className="pt-2">
                    <Slider
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      max={100000}
                      step={5000}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{salaryRange[0].toLocaleString()}</span>
                      <span>{salaryRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Verified Companies */}
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="verified"
                    checked={showVerifiedOnly}
                    onCheckedChange={(checked) => setShowVerifiedOnly(!!checked)}
                  />
                  <Label htmlFor="verified" className="text-sm cursor-pointer">
                    Verified companies only
                  </Label>
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Matching your search criteria</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden flex-1 sm:flex-none bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] h-9">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                    <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                    <SelectItem value="applicants">Most Applicants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showFilters && (
              <Card className="lg:hidden border-border/50 shadow-lg mb-4 animate-in slide-in-from-top-4 duration-300">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-display font-bold">
                      <SlidersHorizontal className="w-4 h-4 text-primary" />
                      Filters
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setLocationFilter("all")
                        setTypeFilter("all")
                        setEducationFilter("all")
                        setExperienceFilter("all")
                        setSalaryRange([0, 100000])
                        setShowVerifiedOnly(false)
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Reset All
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Employment Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Education Level</Label>
                    <Select value={educationFilter} onValueChange={setEducationFilter}>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelors">Bachelor's</SelectItem>
                        <SelectItem value="masters">Master's</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Experience</Label>
                    <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="0-1 years">Entry Level (0-1y)</SelectItem>
                        <SelectItem value="1-2 years">Junior (1-2y)</SelectItem>
                        <SelectItem value="2-3 years">Mid-Level (2-3y)</SelectItem>
                        <SelectItem value="3-5 years">Senior (3-5y)</SelectItem>
                        <SelectItem value="5+ years">Expert (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Salary Range (ETB)</Label>
                    <div className="pt-2">
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        max={100000}
                        step={5000}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{salaryRange[0].toLocaleString()}</span>
                        <span>{salaryRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="verified-mobile"
                      checked={showVerifiedOnly}
                      onCheckedChange={(checked) => setShowVerifiedOnly(!!checked)}
                    />
                    <Label htmlFor="verified-mobile" className="text-sm cursor-pointer">
                      Verified companies only
                    </Label>
                  </div>

                  <Button className="w-full mt-4" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {filteredJobs.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 cursor-pointer overflow-hidden"
                  >
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                        {/* Company logo */}
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center font-display font-bold text-lg md:text-xl text-primary border border-primary/20 flex-shrink-0">
                          {job.company.charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2 md:mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-1 md:mb-1.5 flex-wrap">
                                <h3 className="font-display text-lg md:text-xl font-bold group-hover:text-primary transition-colors text-balance break-words">
                                  {job.title}
                                </h3>
                                {job.verified && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-secondary/10 text-secondary text-xs flex-shrink-0"
                                  >
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm md:text-base text-muted-foreground font-medium">{job.company}</p>
                            </div>
                            <div className="sm:text-right flex-shrink-0">
                              <div className="font-display font-bold text-base md:text-lg text-primary">
                                {job.salary.toLocaleString()} ETB
                              </div>
                              <div className="text-xs text-muted-foreground">per month</div>
                            </div>
                          </div>

                          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4">
                            {job.description}
                          </p>

                          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-3 gap-y-2 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/70 flex-shrink-0" />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/70 flex-shrink-0" />
                              <span className="truncate">{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/70 flex-shrink-0" />
                              <span className="truncate">{job.postedAt}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/70 flex-shrink-0" />
                              <span className="truncate">{job.applicants} applicants</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 md:pt-4 border-t border-border/50">
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                              {job.skills.slice(0, 3).map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="font-normal bg-muted/50 border-border/50 text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <Button
                              size="sm"
                              className="font-semibold shadow-sm group-hover:shadow-md transition-all w-full sm:w-auto"
                            >
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border/50">
                <CardContent className="py-12 md:py-20 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setLocationFilter("all")
                      setTypeFilter("all")
                      setEducationFilter("all")
                      setExperienceFilter("all")
                      setSalaryRange([0, 100000])
                      setShowVerifiedOnly(false)
                    }}
                  >
                    Reset All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
