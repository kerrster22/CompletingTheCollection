"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Film, Users, Clock, Send } from "lucide-react"

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    filmTitle: "",
    letterboxdUrl: "",
    submitterName: "",
    comment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ filmTitle: "", letterboxdUrl: "", submitterName: "", comment: "" })
    alert("Thank you for your submission! Your film has been added to the community spin list.")
  }

  const recentSubmissions = [
    {
      title: "Mulholland Drive",
      submittedBy: "CinemaLover92",
      comment: "Lynch's puzzle box masterpiece",
      date: "2 days ago",
    },
    {
      title: "The Cook, the Thief, His Wife & Her Lover",
      submittedBy: "ArtHouseFan",
      comment: "Greenaway's visual feast",
      date: "3 days ago",
    },
    {
      title: "Stalker",
      submittedBy: "TarkovskyTime",
      comment: "Philosophical sci-fi at its finest",
      date: "5 days ago",
    },
    {
      title: "Chungking Express",
      submittedBy: "WongKarWaiFan",
      comment: "Hong Kong romance at its best",
      date: "1 week ago",
    },
    {
      title: "The Holy Mountain",
      submittedBy: "SurrealCinema",
      comment: "Jodorowsky's spiritual journey",
      date: "1 week ago",
    },
    { title: "Persona", submittedBy: "BergmanBuff", comment: "Psychological masterpiece", date: "2 weeks ago" },
  ]

  return (
    <div className="min-h-screen bg-criterion-bg text-criterion-text">
      <Navigation />

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Community Spin Submissions</h1>
            <div className="criterion-divider w-16 mx-auto mb-6"></div>
            <p className="text-xl text-criterion-text/80 max-w-3xl mx-auto">
              Submit a film for the monthly community spin! Once a month, I'll spin a special wheel featuring all
              community submissions for a dedicated episode.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Submission Form */}
            <Card className="criterion-border bg-criterion-card">
              <CardHeader className="border-b-2 border-criterion-blue">
                <CardTitle className="flex items-center gap-3 text-criterion-red text-2xl font-medium">
                  <Film className="w-6 h-6" />
                  Submit Your Film
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="filmTitle" className="text-criterion-text font-medium mb-2 block">
                      Film Title *
                    </Label>
                    <Input
                      id="filmTitle"
                      value={formData.filmTitle}
                      onChange={(e) => setFormData({ ...formData, filmTitle: e.target.value })}
                      placeholder="Enter the film title"
                      required
                      className="bg-criterion-bg border-criterion-blue text-criterion-text placeholder:text-criterion-accent/60"
                    />
                  </div>

                  <div>
                    <Label htmlFor="letterboxdUrl" className="text-criterion-text font-medium mb-2 block">
                      Letterboxd URL (Optional)
                    </Label>
                    <Input
                      id="letterboxdUrl"
                      value={formData.letterboxdUrl}
                      onChange={(e) => setFormData({ ...formData, letterboxdUrl: e.target.value })}
                      placeholder="https://letterboxd.com/film/..."
                      className="bg-criterion-bg border-criterion-blue text-criterion-text placeholder:text-criterion-accent/60"
                    />
                  </div>

                  <div>
                    <Label htmlFor="submitterName" className="text-criterion-text font-medium mb-2 block">
                      Your Name or Username *
                    </Label>
                    <Input
                      id="submitterName"
                      value={formData.submitterName}
                      onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                      placeholder="How should we credit you?"
                      required
                      className="bg-criterion-bg border-criterion-blue text-criterion-text placeholder:text-criterion-accent/60"
                    />
                  </div>

                  <div>
                    <Label htmlFor="comment" className="text-criterion-text font-medium mb-2 block">
                      Comment or Reason (Optional)
                    </Label>
                    <Textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Why should this film be on the wheel?"
                      className="bg-criterion-bg border-criterion-blue text-criterion-text placeholder:text-criterion-accent/60"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full criterion-button bg-criterion-red hover:bg-criterion-blue text-white font-medium py-3 border-0"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Film
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="space-y-8">
              <Card className="criterion-border bg-criterion-card">
                <CardHeader className="border-b-2 border-criterion-blue">
                  <CardTitle className="flex items-center gap-3 text-criterion-red text-2xl font-medium">
                    <Users className="w-6 h-6" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6 text-criterion-text/80">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-criterion-text">Submit your film recommendation</p>
                      <p className="text-sm">Use the form to add your film to the community pool</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-criterion-text">Added to the community wheel</p>
                      <p className="text-sm">Your submission joins the monthly community spin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-criterion-text">Monthly community episode</p>
                      <p className="text-sm">Once a month, I spin the community wheel for a special episode</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 criterion-border bg-criterion-red text-white text-sm font-bold flex items-center justify-center">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-criterion-text">Get credited when selected</p>
                      <p className="text-sm">Your name gets mentioned when your film comes up!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="criterion-border bg-criterion-card">
                <CardHeader className="border-b-2 border-criterion-blue">
                  <CardTitle className="flex items-center gap-3 text-criterion-red text-2xl font-medium">
                    <Clock className="w-6 h-6" />
                    Next Community Spin
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="text-criterion-text/80 mb-3">The next community spin episode will be recorded on:</p>
                  <p className="text-2xl font-medium text-criterion-red mb-3">January 15th, 2024</p>
                  <p className="text-sm text-criterion-accent">Submit by January 10th to be included!</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4">Recent Submissions</h2>
              <div className="criterion-divider w-16 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentSubmissions.map((submission, index) => (
                <Card
                  key={index}
                  className="criterion-border bg-criterion-card hover:bg-criterion-card/80 transition-colors"
                >
                  <CardContent className="p-6">
                    <h3 className="font-medium text-criterion-red mb-2 text-lg">{submission.title}</h3>
                    <p className="text-sm text-criterion-accent mb-3">
                      Submitted by {submission.submittedBy} • {submission.date}
                    </p>
                    {submission.comment && <p className="text-sm text-criterion-text/70">{submission.comment}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
