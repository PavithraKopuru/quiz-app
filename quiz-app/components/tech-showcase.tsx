import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const technologies = [
  {
    name: "React.js",
    description: "A JavaScript library for building user interfaces",
    image: "/images/react-logo.png",
    color: "from-blue-400 to-blue-600",
    stats: "10 Questions • Intermediate",
  },
  {
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 engine",
    image: "/images/nodejs-logo.png",
    color: "from-green-400 to-green-600",
    stats: "12 Questions • Advanced",
  },
  {
    name: "JavaScript",
    description: "The programming language of the web",
    image: "/images/javascript-logo.png",
    color: "from-yellow-400 to-yellow-600",
    stats: "20 Questions • Beginner",
  },
  {
    name: "Database & SQL",
    description: "Data storage and query language fundamentals",
    image: "/images/database-logo.png",
    color: "from-purple-400 to-purple-600",
    stats: "15 Questions • Intermediate",
  },
  {
    name: "Mobile Development",
    description: "Building apps for iOS and Android platforms",
    image: "/images/mobile-logo.png",
    color: "from-pink-400 to-pink-600",
    stats: "8 Questions • Advanced",
  },
  {
    name: "AI & Machine Learning",
    description: "Artificial intelligence and data science concepts",
    image: "/images/ai-logo.png",
    color: "from-indigo-400 to-indigo-600",
    stats: "10 Questions • Advanced",
  },
]

export default function TechShowcase() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Technologies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Master the most in-demand technologies with our comprehensive quiz collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg overflow-hidden`}
                >
                  <Image
                    src={tech.image || "/placeholder.svg"}
                    alt={tech.name}
                    width={60}
                    height={60}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors">{tech.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{tech.description}</p>
                <div className="text-xs text-gray-400">{tech.stats}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
