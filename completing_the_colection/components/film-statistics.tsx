"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const genreData = [
  { genre: "Drama", count: 8, color: "#D7443E" },
  { genre: "Thriller", count: 4, color: "#ACB4BF" },
  { genre: "Sci-Fi", count: 3, color: "#494E55" },
  { genre: "Romance", count: 2, color: "#8B4513" },
  { genre: "Horror", count: 2, color: "#800000" },
  { genre: "Comedy", count: 1, color: "#DAA520" },
]

const decadeData = [
  { decade: "1940s", count: 2 },
  { decade: "1950s", count: 4 },
  { decade: "1960s", count: 6 },
  { decade: "1970s", count: 3 },
  { decade: "1980s", count: 1 },
  { decade: "1990s", count: 2 },
  { decade: "2000s", count: 2 },
]

const ratingData = [
  { rating: "5.0", count: 2 },
  { rating: "4.5-4.9", count: 6 },
  { rating: "4.0-4.4", count: 3 },
  { rating: "3.5-3.9", count: 1 },
]

const directorData = [
  { director: "Ingmar Bergman", count: 2 },
  { director: "Alfred Hitchcock", count: 2 },
  { director: "David Lynch", count: 2 },
  { director: "Federico Fellini", count: 2 },
  { director: "Andrei Tarkovsky", count: 2 },
  { director: "Others", count: 10 },
]

export function FilmStatistics() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light mb-4 text-criterion-red">Collection Statistics</h2>
        <div className="criterion-divider w-16 mx-auto mb-6"></div>
        <p className="text-criterion-text/80">A breakdown of the films that have been featured on the podcast</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Genre Distribution */}
        <Card className="bg-criterion-card border-criterion-blue">
          <CardHeader>
            <CardTitle className="text-criterion-red">Films by Genre</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ genre, count }) => `${genre}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Decade Distribution */}
        <Card className="bg-criterion-card border-criterion-blue">
          <CardHeader>
            <CardTitle className="text-criterion-red">Films by Decade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={decadeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#494E55" />
                <XAxis dataKey="decade" stroke="#ACB4BF" />
                <YAxis stroke="#ACB4BF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#262A2E",
                    border: "1px solid #494E55",
                    color: "#E5E5E5",
                  }}
                />
                <Bar dataKey="count" fill="#D7443E" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="bg-criterion-card border-criterion-blue">
          <CardHeader>
            <CardTitle className="text-criterion-red">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#494E55" />
                <XAxis dataKey="rating" stroke="#ACB4BF" />
                <YAxis stroke="#ACB4BF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#262A2E",
                    border: "1px solid #494E55",
                    color: "#E5E5E5",
                  }}
                />
                <Bar dataKey="count" fill="#ACB4BF" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Director Frequency */}
        <Card className="bg-criterion-card border-criterion-blue">
          <CardHeader>
            <CardTitle className="text-criterion-red">Most Featured Directors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={directorData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#494E55" />
                <XAxis type="number" stroke="#ACB4BF" />
                <YAxis dataKey="director" type="category" stroke="#ACB4BF" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#262A2E",
                    border: "1px solid #494E55",
                    color: "#E5E5E5",
                  }}
                />
                <Bar dataKey="count" fill="#D7443E" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-criterion-card border-criterion-blue text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-criterion-red mb-2">20</div>
            <div className="text-criterion-accent">Total Films Reviewed</div>
          </CardContent>
        </Card>

        <Card className="bg-criterion-card border-criterion-blue text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-criterion-red mb-2">4.6</div>
            <div className="text-criterion-accent">Average Rating</div>
          </CardContent>
        </Card>

        <Card className="bg-criterion-card border-criterion-blue text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-criterion-red mb-2">1960s</div>
            <div className="text-criterion-accent">Most Common Decade</div>
          </CardContent>
        </Card>

        <Card className="bg-criterion-card border-criterion-blue text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-criterion-red mb-2">2.5h</div>
            <div className="text-criterion-accent">Avg Episode Length</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
