"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Clock, CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react"

// Enhanced mock questions with different formats
const ENHANCED_TEST_QUESTIONS = [
  {
    id: "1",
    question: "Select the primary colors (Choose all that apply)",
    type: "checkbox",
    options: ["Red", "Green", "Blue", "Yellow", "Orange"],
  },
  {
    id: "2",
    question: "Which of these is a JavaScript framework?",
    type: "multiple-choice",
    options: ["React", "Laravel", "Django", "Flask"],
  },
  {
    id: "3",
    question: "Explain the concept of 'Hoisting' in JavaScript in your own words.",
    type: "short-answer",
  },
]

export default function TestPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [job, setJob] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>(ENHANCED_TEST_QUESTIONS)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [timeRemaining, setTimeRemaining] = useState(1200) // 20 mins
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("employerJobs") || "[]")
    const currentJob = jobs.find((j: any) => j.id === params.jobId)
    if (currentJob) setJob(currentJob)
  }, [params.jobId])

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setInterval(() => setTimeRemaining((t) => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeRemaining, isSubmitted])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  const handleCheckbox = (qId: string, option: string) => {
    const currentAnswers = answers[qId] || []
    const updated = currentAnswers.includes(option)
      ? currentAnswers.filter((a: string) => a !== option)
      : [...currentAnswers, option]
    setAnswers({ ...answers, [qId]: updated })
  }

  const renderInput = (question: any) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(v) => setAnswers({ ...answers, [question.id]: v })}
          >
            <div className="space-y-3">
              {question.options.map((opt: string) => (
                <div
                  key={opt}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <RadioGroupItem value={opt} id={opt} />
                  <Label htmlFor={opt} className="flex-1 cursor-pointer font-medium">
                    {opt}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )
      case "checkbox":
        return (
          <div className="space-y-3">
            {question.options.map((opt: string) => (
              <div
                key={opt}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Checkbox
                  id={opt}
                  checked={(answers[question.id] || []).includes(opt)}
                  onCheckedChange={() => handleCheckbox(question.id, opt)}
                />
                <Label htmlFor={opt} className="flex-1 cursor-pointer font-medium">
                  {opt}
                </Label>
              </div>
            ))}
          </div>
        )
      case "short-answer":
        return (
          <Textarea
            placeholder="Type your response here..."
            className="min-h-[200px] text-base leading-relaxed"
            value={answers[question.id] || ""}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
          />
        )
      default:
        return null
    }
  }

  const progress = ((currentQuestionIdx + 1) / questions.length) * 100
  const question = questions[currentQuestionIdx]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
        <Card className="max-w-md w-full text-center border-none shadow-xl">
          <CardContent className="pt-12 pb-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Assessment Completed!</h2>
            <p className="text-muted-foreground mb-8">
              Your results have been recorded. The employer will review your application and test performance.
            </p>
            <Button onClick={() => router.push("/candidate/dashboard")} className="w-full h-12 text-lg font-bold">
              Go to My Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <Card className="border-border/50 shadow-xl overflow-hidden bg-card">
              <div className="bg-muted h-1.5 w-full">
                <div
                  className="bg-primary h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <CardHeader className="pb-6 pt-8 px-8">
                <div className="flex justify-between items-center mb-6">
                  <Badge variant="secondary" className="px-3 py-1 font-semibold bg-primary/10 text-primary border-none">
                    Question {currentQuestionIdx + 1} of {questions.length}
                  </Badge>
                  <div
                    className={`flex items-center gap-2 font-display font-bold text-lg ${timeRemaining < 300 ? "text-destructive animate-pulse" : "text-primary"}`}
                  >
                    <Clock className="w-5 h-5" />
                    {formatTime(timeRemaining)}
                  </div>
                </div>
                <CardTitle className="font-display text-3xl font-bold text-foreground leading-tight">
                  {question.question}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Please select the most appropriate answer from the options below.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-8 px-8 min-h-[350px] bg-muted/5">{renderInput(question)}</CardContent>
              <CardFooter className="bg-card p-8 flex justify-between gap-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx((v) => v - 1)}
                  className="flex-1 h-12 font-bold hover:bg-muted"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
                {currentQuestionIdx === questions.length - 1 ? (
                  <Button
                    className="flex-1 h-12 font-bold shadow-lg bg-primary hover:bg-primary/90"
                    onClick={() => setIsSubmitted(true)}
                  >
                    Complete Assessment
                  </Button>
                ) : (
                  <Button
                    className="flex-1 h-12 font-bold shadow-md"
                    onClick={() => setCurrentQuestionIdx((v) => v + 1)}
                  >
                    Next Question
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="w-full md:w-72 space-y-6">
            <Card className="border-border/50 shadow-lg bg-card sticky top-24">
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-sm font-medium">Question Map</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestionIdx(i)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                        currentQuestionIdx === i
                          ? "bg-primary text-primary-foreground shadow-lg scale-110"
                          : answers[questions[i].id]
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground hover:bg-muted-foreground/10"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-primary" /> Current Question
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-green-200" /> Answered
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-full bg-muted" /> Not Started
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/10 shadow-sm border">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-xs text-primary/80 leading-relaxed font-medium">
                  Your progress is saved automatically. If you lose connection, refresh the page to resume.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
