import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Wheel Chose Violence: My Experience with Salo",
    excerpt:
      "Sometimes the wheel is cruel. Sometimes it chooses a film that tests your very soul. This is the story of how I survived Pasolini's most controversial work.",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Behind the Scenes",
    slug: "the-wheel-chose-violence-salo",
  },
  {
    id: 2,
    title: "Building the Perfect Wheel: A Technical Deep Dive",
    excerpt:
      "Ever wondered how I actually build these wheels? From spreadsheets to spinning animations, here's the surprisingly complex process behind the simple spin.",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Technical",
    slug: "building-the-perfect-wheel",
  },
  {
    id: 3,
    title: "Community Submissions: The Good, The Bad, and The Bizarre",
    excerpt:
      "A look at some of the most interesting, challenging, and downright weird films that listeners have submitted for the community wheel.",
    date: "2023-12-27",
    readTime: "6 min read",
    category: "Community",
    slug: "community-submissions-roundup",
  },
  {
    id: 4,
    title: "Why I Started This Podcast (And Why I Might Regret It)",
    excerpt:
      "The origin story of Completing the Collection, from a simple personal challenge to a full-blown podcast commitment that's taken over my life.",
    date: "2023-12-20",
    readTime: "4 min read",
    category: "Personal",
    slug: "why-i-started-this-podcast",
  },
  {
    id: 5,
    title: "The Films I'm Secretly Hoping Never Come Up",
    excerpt:
      "A confession: there are some films in my collection that I'm genuinely terrified to watch. Here's my list of wheel nightmares.",
    date: "2023-12-13",
    readTime: "7 min read",
    category: "Personal",
    slug: "films-im-secretly-hoping-never-come-up",
  },
  {
    id: 6,
    title: "Criterion Collection Haul: 50% Off Sale Damage Report",
    excerpt:
      "The annual Criterion sale happened and my wallet is crying. Here's what I added to the collection (and thus, the wheel of potential suffering).",
    date: "2023-12-06",
    readTime: "3 min read",
    category: "Collection",
    slug: "criterion-collection-haul-damage-report",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Behind the Scenes
            </h1>
            <p className="text-xl text-slate-300">Thoughts, stories, and confessions from the collection</p>
          </div>

          {/* Featured Post */}
          <Card className="bg-slate-900 border-slate-700 mb-12 hover:border-amber-500 transition-colors">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-square">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Featured post"
                    fill
                    className="object-cover rounded-l-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-amber-500 text-black">Featured</Badge>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="border-amber-500 text-amber-400 w-fit mb-3">
                    {blogPosts[0].category}
                  </Badge>
                  <h2 className="text-2xl font-bold mb-4 text-amber-400">{blogPosts[0].title}</h2>
                  <p className="text-slate-300 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].slug}`}
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card
                key={post.id}
                className="bg-slate-900 border-slate-700 hover:border-amber-500 transition-colors group"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="border-amber-500 text-amber-400 mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-3 text-amber-400 group-hover:text-amber-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-300 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-amber-400 hover:text-amber-300 text-sm font-medium"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
