"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"

const quizData = {
  react: {
    title: "React.js Quiz",
    image: "/images/react-logo.png",
    questions: [
      {
        question: "What is JSX in React?",
        options: ["A JavaScript library", "A syntax extension for JavaScript", "A CSS framework", "A database"],
        correct: 1,
      },
      {
        question: "Which hook is used for state management in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 1,
      },
      {
        question: "What does the useEffect hook do?",
        options: ["Manages state", "Handles side effects", "Creates components", "Styles components"],
        correct: 1,
      },
      {
        question: "How do you pass data from parent to child component?",
        options: ["Through state", "Through props", "Through context", "Through refs"],
        correct: 1,
      },
      {
        question: "What is the virtual DOM?",
        options: ["Real DOM", "A JavaScript representation of the real DOM", "A CSS framework", "A database"],
        correct: 1,
      },
    ],
  },
  nodejs: {
    title: "Node.js Quiz",
    image: "/images/nodejs-logo.png",
    questions: [
      {
        question: "What is Node.js?",
        options: ["A browser", "A JavaScript runtime", "A database", "A CSS framework"],
        correct: 1,
      },
      {
        question: "Which module is used to create HTTP servers in Node.js?",
        options: ["fs", "http", "path", "url"],
        correct: 1,
      },
      {
        question: "What is npm?",
        options: ["Node Package Manager", "New Programming Method", "Network Protocol Manager", "Node Process Manager"],
        correct: 0,
      },
      {
        question: "Which method is used to read files asynchronously?",
        options: ["fs.readFileSync", "fs.readFile", "fs.read", "fs.open"],
        correct: 1,
      },
      {
        question: "What is Express.js?",
        options: ["A database", "A web framework for Node.js", "A testing library", "A CSS framework"],
        correct: 1,
      },
    ],
  },
  javascript: {
    title: "JavaScript Quiz",
    image: "/images/javascript-logo.png",
    questions: [
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var x = 5", "let x = 5", "const x = 5", "All of the above"],
        correct: 3,
      },
      {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
      },
      {
        question: "What does '===' operator do?",
        options: ["Assignment", "Equality without type checking", "Strict equality with type checking", "Not equal"],
        correct: 2,
      },
      {
        question: "Which is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correct: 2,
      },
      {
        question: "What is a closure in JavaScript?",
        options: ["A loop", "A function with access to outer scope", "An object", "An array method"],
        correct: 1,
      },
    ],
  },
  database: {
    title: "Database & SQL Quiz",
    image: "/images/database-logo.png",
    questions: [
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Standard Query Language",
          "System Query Language",
        ],
        correct: 0,
      },
      {
        question: "Which command is used to retrieve data from a database?",
        options: ["GET", "SELECT", "FETCH", "RETRIEVE"],
        correct: 1,
      },
      {
        question: "What is a primary key?",
        options: ["A unique identifier for records", "A foreign key", "An index", "A constraint"],
        correct: 0,
      },
      {
        question: "Which JOIN returns all records from both tables?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correct: 3,
      },
      {
        question: "What is normalization in databases?",
        options: ["Data backup", "Organizing data to reduce redundancy", "Data encryption", "Data compression"],
        correct: 1,
      },
    ],
  },
  mobile: {
    title: "Mobile Development Quiz",
    image: "/images/mobile-logo.png",
    questions: [
      {
        question: "What is React Native?",
        options: ["A web framework", "A mobile app development framework", "A database", "A testing tool"],
        correct: 1,
      },
      {
        question: "Which component is used for navigation in React Native?",
        options: ["Navigator", "Router", "Navigation", "All of the above"],
        correct: 3,
      },
      {
        question: "What is the difference between iOS and Android development?",
        options: ["Programming languages", "Development tools", "App store policies", "All of the above"],
        correct: 3,
      },
      {
        question: "Which is NOT a mobile development approach?",
        options: ["Native", "Hybrid", "Cross-platform", "Desktop"],
        correct: 3,
      },
      {
        question: "What is Expo in React Native?",
        options: ["A testing framework", "A development platform", "A database", "A design tool"],
        correct: 1,
      },
    ],
  },
  ai: {
    title: "AI & Machine Learning Quiz",
    image: "/images/ai-logo.png",
    questions: [
      {
        question: "What is Machine Learning?",
        options: ["A programming language", "A subset of AI that learns from data", "A database", "A web framework"],
        correct: 1,
      },
      {
        question: "Which is a supervised learning algorithm?",
        options: ["K-means", "Linear Regression", "DBSCAN", "PCA"],
        correct: 1,
      },
      {
        question: "What is a neural network?",
        options: [
          "A network of computers",
          "A model inspired by the human brain",
          "A database structure",
          "A web protocol",
        ],
        correct: 1,
      },
      {
        question: "What is overfitting in machine learning?",
        options: [
          "Model performs well on training data but poorly on new data",
          "Model performs poorly on all data",
          "Model is too simple",
          "Model has too few parameters",
        ],
        correct: 0,
      },
      {
        question: "What is the purpose of training data?",
        options: ["To test the model", "To teach the model patterns", "To validate results", "To deploy the model"],
        correct: 1,
      },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const stack = params.stack as string

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false)

  const quiz = quizData[stack as keyof typeof quizData]

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleQuizComplete()
    }
  }, [timeLeft, quizStarted])

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardTitle className="text-2xl mb-4">Quiz Not Found</CardTitle>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Card>
      </div>
    )
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        handleQuizComplete()
      }
    }
  }

  const handleQuizComplete = () => {
    const finalAnswers = [...answers]
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer
    }

    const score = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === quiz.questions[index].correct ? 1 : 0)
    }, 0)

    const percentage = Math.round((score / quiz.questions.length) * 100)

    router.push(`/results?stack=${stack}&score=${score}&total=${quiz.questions.length}&percentage=${percentage}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <div className="relative">
              <img
                src={quiz.image || "/placeholder.svg"}
                alt={quiz.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-lg flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">{quiz.title}</h1>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-800">Questions</div>
                    <div className="text-2xl font-bold text-blue-600">{quiz.questions.length}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800">Time Limit</div>
                    <div className="text-2xl font-bold text-green-600">5 min</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Instructions:</h3>
                  <ul className="text-left space-y-1 text-gray-600">
                    <li>• Select the best answer for each question</li>
                    <li>• You have 5 minutes to complete the quiz</li>
                    <li>• You can't go back to previous questions</li>
                    <li>• Your score will be shown at the end</li>
                  </ul>
                </div>
                <Button onClick={handleStartQuiz} size="lg" className="w-full">
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-2xl">{quiz.title}</CardTitle>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="w-5 h-5" />
                <span className={timeLeft < 60 ? "text-red-500" : "text-gray-700"}>{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestion].question}</h3>
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                className="space-y-3"
              >
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/")}>
                Exit Quiz
              </Button>
              <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} size="lg">
                {currentQuestion === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
