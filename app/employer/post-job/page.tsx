"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Briefcase, ClipboardCheck, Plus, Trash2 } from "lucide-react"

type QuestionType = "multiple-choice" | "checkbox" | "short-answer"

interface CustomQuestion {
  id: string
  text: string
  type: QuestionType
  options: string[]
}

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [hasTest, setHasTest] = useState(false)
  const [testType, setTestType] = useState<"platform" | "custom">("platform")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "Addis Ababa",
    type: "Full-time",
    education: "bachelors",
    experience: "1-2",
    skills: "",
  })

  const [questions, setQuestions] = useState<CustomQuestion[]>([
    { id: "1", text: "", type: "multiple-choice", options: ["", ""] },
  ])

  const addQuestion = () => {
    if (questions.length < 10) {
      setQuestions([
        ...questions,
        { id: Math.random().toString(), text: "", type: "multiple-choice", options: ["", ""] },
      ])
    }
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: string, updates: Partial<CustomQuestion>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newJob = {
      id: Date.now().toString(),
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      hasTest,
      test: hasTest ? { type: testType, questions: testType === "custom" ? questions : [] } : null,
      postedAt: new Date().toISOString(),
      applicants: [],
    }

    const saved = JSON.parse(localStorage.getItem("employerJobs") || "[]")
    localStorage.setItem("employerJobs", JSON.stringify([...saved, newJob]))

    setTimeout(() => {
      setIsLoading(false)
      toast({ title: "Job Published!", description: "Your job is now live on the platform." })
      router.push("/employer/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create Job Posting</h1>
          <p className="text-muted-foreground">Detailed information helps you find the right candidate.</p>
        </div>

        <form onSubmit={handlePost} className="space-y-8">
          {/* Basic Info */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary font-bold mb-1">
                <Briefcase className="w-4 h-4" />
                Step 1
              </div>
              <CardTitle>Core Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    required
                    placeholder="e.g. Senior Backend Engineer"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={formData.location} onValueChange={(v) => setFormData({ ...formData, location: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                      <SelectItem value="Bahar Dar">Bahar Dar</SelectItem>
                      <SelectItem value="Dire Dawa">Dire Dawa</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  required
                  placeholder="Detailed responsibilities and requirements..."
                  className="min-h-[200px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Required Education</Label>
                  <Select value={formData.education} onValueChange={(v) => setFormData({ ...formData, education: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(v) => setFormData({ ...formData, experience: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresh">Entry Level</SelectItem>
                      <SelectItem value="1-2">1-2 Years</SelectItem>
                      <SelectItem value="3-5">3-5 Years</SelectItem>
                      <SelectItem value="5+">5+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skills (Comma separated)</Label>
                <Input
                  placeholder="React, SQL, Project Management..."
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Assessment Configuration */}
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="bg-secondary/5 p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Skill Assessment</h3>
                  <p className="text-sm text-muted-foreground">Add questions to pre-screen candidates</p>
                </div>
              </div>
              <Switch checked={hasTest} onCheckedChange={setHasTest} />
            </div>

            {hasTest && (
              <CardContent className="p-6 space-y-8 animate-in slide-in-from-top-4 duration-300">
                <div className="space-y-4">
                  <Label className="text-base font-bold">Assessment Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setTestType("platform")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        testType === "platform"
                          ? "border-primary bg-primary/5 shadow-inner"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <h4 className="font-bold mb-1">Standardized Platform Test</h4>
                      <p className="text-xs text-muted-foreground">Behavioral and logical assessment by JobConnect.</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTestType("custom")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        testType === "custom"
                          ? "border-primary bg-primary/5 shadow-inner"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <h4 className="font-bold mb-1">Custom Test Builder</h4>
                      <p className="text-xs text-muted-foreground">Create your own specific technical questions.</p>
                    </button>
                  </div>
                </div>

                {testType === "custom" && (
                  <div className="space-y-6 pt-6 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base font-bold">Manage Questions</Label>
                      <Badge variant="outline" className="font-medium">
                        {questions.length} / 10
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      {questions.map((q, idx) => (
                        <Card key={q.id} className="relative group border border-border/60 bg-muted/20">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeQuestion(q.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <CardContent className="p-6 space-y-4">
                            <div className="flex gap-4">
                              <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center shrink-0">
                                {idx + 1}
                              </Badge>
                              <div className="flex-1 space-y-4">
                                <div className="space-y-2">
                                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                    Question Text
                                  </Label>
                                  <Input
                                    placeholder="Enter your question..."
                                    value={q.text}
                                    onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                      Format
                                    </Label>
                                    <Select
                                      value={q.type}
                                      onValueChange={(v: QuestionType) => updateQuestion(q.id, { type: v })}
                                    >
                                      <SelectTrigger className="bg-white">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="multiple-choice">Single Choice (MCQ)</SelectItem>
                                        <SelectItem value="checkbox">Multiple Choice (Checkboxes)</SelectItem>
                                        <SelectItem value="short-answer">Text Response</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                {q.type !== "short-answer" && (
                                  <div className="space-y-3 pt-2">
                                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                                      Answer Options
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {q.options.map((opt, optIdx) => (
                                        <div key={optIdx} className="flex gap-2">
                                          <Input
                                            className="bg-white"
                                            placeholder={`Option ${optIdx + 1}`}
                                            value={opt}
                                            onChange={(e) => {
                                              const newOpts = [...q.options]
                                              newOpts[optIdx] = e.target.value
                                              updateQuestion(q.id, { options: newOpts })
                                            }}
                                          />
                                          {q.options.length > 2 && (
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="shrink-0"
                                              onClick={() => {
                                                const newOpts = q.options.filter((_, i) => i !== optIdx)
                                                updateQuestion(q.id, { options: newOpts })
                                              }}
                                            >
                                              <X className="w-4 h-4" />
                                            </Button>
                                          )}
                                        </div>
                                      ))}
                                      {q.options.length < 5 && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="border-dashed bg-white"
                                          onClick={() => updateQuestion(q.id, { options: [...q.options, ""] })}
                                        >
                                          <Plus className="w-3 h-3 mr-1.5" /> Add Option
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 border-dashed border-2 hover:bg-muted/50 bg-transparent"
                      onClick={addQuestion}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Question
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="px-8 font-bold"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Discard
            </Button>
            <Button type="submit" size="lg" className="px-12 rounded-xl font-bold shadow-xl" disabled={isLoading}>
              {isLoading ? "Publishing..." : "Publish Job Listing"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
import { X } from "lucide-react"
