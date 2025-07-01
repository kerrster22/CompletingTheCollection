"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FilmGrainOverlay } from "@/components/film-grain-overlay"
import { mainCollectionFilms, type Film } from "@/data/films"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Star } from "lucide-react"
import { FilmWheelSpinner } from "@/components/canvasFilmWheel"

export default function WheelPage() {
  const [mainFilms, setMainFilms] = useState<Film[]>(mainCollectionFilms)
  // const [communityFilmsState, setCommunityFilmsState] = useState<Film[]>(communityFilms)
  // const [mainTheme, setMainTheme] = useState("All Films")
  // const [communityTheme, setCommunityTheme] = useState("All Films")
  // const [mainFilterSummary, setMainFilterSummary] = useState("Showing all films in collection")
  // const [communityFilterSummary, setCommunityFilterSummary] = useState("Showing all community submissions")

  // const handleMainThemeChange = (filteredFilms: Film[], themeName: string, filterSummary: string) => {
  //   setMainFilms(filteredFilms)
  //   setMainTheme(themeName)
  //   setMainFilterSummary(filterSummary)
  // }

  // const handleCommunityThemeChange = (filteredFilms: Film[], themeName: string, filterSummary: string) => {
  //   setCommunityFilmsState(filteredFilms)
  //   setCommunityTheme(themeName)
  //   setCommunityFilterSummary(filterSummary)
  // }

  return (
    <div className="min-h-screen bg-criterion-bg text-criterion-text">
      <Navigation />

      <div className="relative py-16 px-4 overflow-hidden">
        <FilmGrainOverlay />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Advanced Themed Wheels</h1>
            <div className="criterion-divider w-16 mx-auto mb-6"></div>
            <p className="text-xl text-criterion-text/80 max-w-3xl mx-auto">
              Create precise themed wheels by combining multiple filters. Search for specific films, combine genres with
              decades, filter by directors and countries, or use our quick examples to get started.
            </p>
          </div>

          {/* Main Collection Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center text-criterion-red">Main Collection</h2>
{/*
            <AdvancedThemeSelector
              films={mainCollectionFilms}
              onThemeChange={handleMainThemeChange}
              currentTheme={mainTheme}
            /> */}

            {/* Selection Statistics
            <Card className="bg-criterion-card border-criterion-blue mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-criterion-red" />
                  <h3 className="text-lg font-medium text-criterion-red">Selection Statistics</h3>
                </div>
                <p className="text-sm text-criterion-accent mb-4">{mainFilterSummary}</p>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{mainStats.count}</div>
                    <div className="text-xs text-criterion-accent">Films</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{mainStats.totalRuntime}h</div>
                    <div className="text-xs text-criterion-accent">Total Runtime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{mainStats.avgYear}</div>
                    <div className="text-xs text-criterion-accent">Avg Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{mainStats.genreCount}</div>
                    <div className="text-xs text-criterion-accent">Genres</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{mainStats.directorCount}</div>
                    <div className="text-xs text-criterion-accent">Directors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{mainStats.criterionCount}</div>
                    <div className="text-xs text-criterion-accent">Criterion</div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <FilmWheelSpinner films={mainFilms} title="Main Collection Wheel" onResult={(film) => console.log("Selected:", film)} />

          </div>
{/*
          Community Collection Section
          <div className="mb-16">
            <h2 className="text-3xl font-light mb-8 text-center text-criterion-red">Community Submissions</h2>

            <AdvancedThemeSelector
              films={communityFilms}
              onThemeChange={handleCommunityThemeChange}
              currentTheme={communityTheme}
            /> */}

            {/* Selection Statistics */}
            {/* <Card className="bg-criterion-card border-criterion-blue mb-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-criterion-red" />
                  <h3 className="text-lg font-medium text-criterion-red">Selection Statistics</h3>
                </div>
                <p className="text-sm text-criterion-accent mb-4">{communityFilterSummary}</p>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{communityStats.count}</div>
                    <div className="text-xs text-criterion-accent">Films</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{communityStats.totalRuntime}h</div>
                    <div className="text-xs text-criterion-accent">Total Runtime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{communityStats.avgYear}</div>
                    <div className="text-xs text-criterion-accent">Avg Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{communityStats.genreCount}</div>
                    <div className="text-xs text-criterion-accent">Genres</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{communityStats.directorCount}</div>
                    <div className="text-xs text-criterion-accent">Directors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-criterion-red">{communityStats.criterionCount}</div>
                    <div className="text-xs text-criterion-accent">Criterion</div>
                  </div>
                </div>
              </CardContent>
            </Card>
 */}

          {/* Advanced Filtering Guide */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-criterion-card border-criterion-blue">
              <CardContent className="p-8">
                <h3 className="text-xl font-medium text-criterion-red mb-4">Multi-Filter Examples</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <Badge variant="outline" className="border-criterion-red text-criterion-red mr-2">
                      1970s
                    </Badge>
                    <Badge variant="outline" className="border-criterion-red text-criterion-red mr-2">
                      Horror
                    </Badge>
                    <span className="text-criterion-text">Classic 70s horror films</span>
                  </div>
                  <div>
                    <Badge variant="outline" className="border-criterion-blue text-criterion-accent mr-2">
                      Kubrick
                    </Badge>
                    <Badge variant="outline" className="border-criterion-red text-criterion-red mr-2">
                      Sci-Fi
                    </Badge>
                    <span className="text-criterion-text">Kubrick's science fiction</span>
                  </div>
                  <div>
                    <Badge variant="outline" className="border-green-500 text-green-600 mr-2">
                      France
                    </Badge>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600 mr-2">
                      1960s
                    </Badge>
                    <Badge variant="outline" className="border-criterion-red text-criterion-red mr-2">
                      New Wave
                    </Badge>
                    <span className="text-criterion-text">French New Wave cinema</span>
                  </div>
                  <div>
                    <Badge variant="outline" className="border-purple-500 text-purple-600 mr-2">
                      Criterion
                    </Badge>
                    <Badge variant="outline" className="border-criterion-red text-criterion-red mr-2">
                      Film Noir
                    </Badge>
                    <span className="text-criterion-text">Criterion noir collection</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-criterion-card border-criterion-blue">
              <CardContent className="p-8">
                <h3 className="text-xl font-medium text-criterion-red mb-4">Advanced Features</h3>
                <ul className="space-y-2 text-sm text-criterion-text/80">
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Search Integration:</strong> Search terms work with all filters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Range Filters:</strong> Set specific year and runtime ranges
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Multiple Values:</strong> Add multiple genres, directors, or countries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Real-time Stats:</strong> See selection statistics update instantly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-criterion-red mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Quick Examples:</strong> One-click access to popular combinations
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
