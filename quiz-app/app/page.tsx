import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Globe, Smartphone, Brain, Zap } from "lucide-react"
import TechShowcase from "@/components/tech-showcase"

const quizStacks = [
  {
    id: "react",
    title: "React.js",
    description: "Test your knowledge of React components, hooks, and state management",
    icon: <Code className="w-8 h-8" />,
    color: "bg-blue-500",
    questions: 10,
    difficulty: "Intermediate",
    image: "/images/react-logo.png",
  },
  {
    id: "nodejs",
    title: "Node.js",
    description: "Challenge yourself with Node.js runtime, APIs, and server-side concepts",
    icon: <Zap className="w-8 h-8" />,
    color: "bg-green-500",
    questions: 12,
    difficulty: "Advanced",
    image: "/images/nodejs-logo.png",
  },
  {
    id: "database",
    title: "Database & SQL",
    description: "Explore database design, SQL queries, and data management principles",
    icon: <Database className="w-8 h-8" />,
    color: "bg-purple-500",
    questions: 15,
    difficulty: "Intermediate",
    image: "/images/database-logo.png",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Master JavaScript fundamentals, ES6+, and modern programming concepts",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-yellow-500",
    questions: 20,
    difficulty: "Beginner",
    image: "/images/javascript-logo.png",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Test your React Native and mobile app development skills",
    icon: <Smartphone className="w-8 h-8" />,
    color: "bg-pink-500",
    questions: 8,
    difficulty: "Advanced",
    image: "/images/mobile-logo.png",
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Challenge your understanding of AI concepts and machine learning",
    icon: <Brain className="w-8 h-8" />,
    color: "bg-indigo-500",
    questions: 10,
    difficulty: "Advanced",
    image: "/images/ai-logo.png",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">🧠 Quiz App</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge across various technology stacks and boost your programming skills
          </p>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {quizStacks.map((stack) => (
            <Card key={stack.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <img src={stack.image || "/placeholder.svg"} alt={stack.title} className="w-full h-48 object-cover" />
                <div className={`absolute top-4 left-4 ${stack.color} text-white p-2 rounded-lg`}>{stack.icon}</div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold">{stack.title}</CardTitle>
                  <Badge variant="secondary">{stack.difficulty}</Badge>
                </div>
                <CardDescription className="text-gray-600">{stack.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{stack.questions} Questions</span>
                  <span className="text-sm text-gray-500">~{Math.ceil(stack.questions * 1.5)} min</span>
                </div>
                <Link href={`/quiz/${stack.id}`}>
                  <Button className="w-full" size="lg">
                    Start Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Showcase */}
        <TechShowcase />

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose Our Quiz App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Multiple Tech Stacks</h3>
              <p className="text-gray-600">Choose from various programming languages and frameworks</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
              <p className="text-gray-600">Get immediate feedback and detailed score analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Skill Assessment</h3>
              <p className="text-gray-600">Evaluate and improve your programming knowledge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
