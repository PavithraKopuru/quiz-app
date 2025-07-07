"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Trophy, RotateCcw, Home } from "lucide-react"
import { useEffect, useState } from "react"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading...</div>
  }

  const stack = searchParams.get("stack")
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "0")
  const percentage = Number.parseInt(searchParams.get("percentage") || "0")

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: "A+", color: "bg-green-500", message: "Excellent!" }
    if (percentage >= 80) return { grade: "A", color: "bg-green-400", message: "Great job!" }
    if (percentage >= 70) return { grade: "B", color: "bg-blue-500", message: "Good work!" }
    if (percentage >= 60) return { grade: "C", color: "bg-yellow-500", message: "Not bad!" }
    if (percentage >= 50) return { grade: "D", color: "bg-orange-500", message: "Keep practicing!" }
    return { grade: "F", color: "bg-red-500", message: "Need improvement!" }
  }

  const gradeInfo = getGrade(percentage)

  const getStackTitle = (stack: string) => {
    const titles = {
      react: "React.js",
      nodejs: "Node.js",
      javascript: "JavaScript",
      database: "Database & SQL",
      mobile: "Mobile Development",
      ai: "AI & Machine Learning",
    }
    return titles[stack as keyof typeof titles] || stack
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Results Header */}
          <Card className="text-center overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
              <p className="text-blue-100">{getStackTitle(stack || "")} Quiz Results</p>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{score}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{total}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{percentage}%</div>
                  <div className="text-sm text-gray-600">Score Percentage</div>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <Badge className={`${gradeInfo.color} text-white text-2xl px-6 py-2`}>Grade: {gradeInfo.grade}</Badge>
              </div>

              <p className="text-xl font-semibold text-gray-700 mb-4">{gradeInfo.message}</p>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Correct Answers</span>
                  </div>
                  <span className="font-bold text-green-600">{score}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Incorrect Answers</span>
                  </div>
                  <span className="font-bold text-red-600">{total - score}</span>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Recommendations:</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    {percentage >= 80 ? (
                      <>
                        <li>
                          • Excellent performance! You have a strong understanding of {getStackTitle(stack || "")}
                        </li>
                        <li>• Consider taking advanced quizzes in related technologies</li>
                        <li>• Share your knowledge by helping others learn</li>
                      </>
                    ) : percentage >= 60 ? (
                      <>
                        <li>• Good foundation! Focus on areas where you missed questions</li>
                        <li>• Review the concepts and try the quiz again</li>
                        <li>• Practice with real-world projects to strengthen your skills</li>
                      </>
                    ) : (
                      <>
                        <li>• Don't worry! Learning takes time and practice</li>
                        <li>• Review the fundamentals of {getStackTitle(stack || "")}</li>
                        <li>• Take the quiz again after studying the topics</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => router.push(`/quiz/${stack}`)} className="flex-1" variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button onClick={() => router.push("/")} className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Share Results */}
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Share Your Achievement!</h3>
              <p className="text-gray-600 mb-4">
                I scored {percentage}% on the {getStackTitle(stack || "")} quiz! 🎉
              </p>
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="sm">
                  Share on Twitter
                </Button>
                <Button variant="outline" size="sm">
                  Share on LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
