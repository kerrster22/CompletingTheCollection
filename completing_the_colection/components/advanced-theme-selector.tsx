"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  type Film,
  presetThemes,
  getUniqueGenres,
  getUniqueDirectors,
  getUniqueDecades,
  getUniqueCountries,
} from "@/data/films"
import { Palette, User, Calendar, Globe, FilmIcon, Sparkles, Filter, X, Search, Clock } from "lucide-react"

interface FilterCriteria {
  genres: string[]
  directors: string[]
  decades: number[]
  countries: string[]
  yearRange: { min: number; max: number }
  runtimeRange: { min: number; max: number }
  criterionOnly: boolean
}

interface AdvancedThemeSelectorProps {
  films: Film[]
  onThemeChange: (filteredFilms: Film[], themeName: string, filterSummary: string) => void
  currentTheme: string
}

export function AdvancedThemeSelector({ films, onThemeChange, currentTheme }: AdvancedThemeSelectorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [filters, setFilters] = useState<FilterCriteria>({
    genres: [],
    directors: [],
    decades: [],
    countries: [],
    yearRange: { min: 1920, max: 2024 },
    runtimeRange: { min: 0, max: 500 },
    criterionOnly: false,
  })

  const genres = getUniqueGenres(films)
  const directors = getUniqueDirectors(films)
  const decades = getUniqueDecades(films)
  const countries = getUniqueCountries(films)

  // Get year range from films
  const yearRange = {
    min: Math.min(...films.map((f) => f.year)),
    max: Math.max(...films.map((f) => f.year)),
  }

  // Get runtime range from films
  const runtimeRange = {
    min: Math.min(...films.filter((f) => f.runtime).map((f) => f.runtime!)),
    max: Math.max(...films.filter((f) => f.runtime).map((f) => f.runtime!)),
  }

  // Apply combined filters
  const applyAdvancedFilters = () => {
    let filteredFilms = films

    // Apply search term
    if (searchTerm) {
      filteredFilms = filteredFilms.filter(
        (film) =>
          film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
          film.genre.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply genre filters
    if (filters.genres.length > 0) {
      filteredFilms = filteredFilms.filter((film) => filters.genres.some((genre) => film.genre.includes(genre)))
    }

    // Apply director filters
    if (filters.directors.length > 0) {
      filteredFilms = filteredFilms.filter((film) => filters.directors.includes(film.director))
    }

    // Apply decade filters
    if (filters.decades.length > 0) {
      filteredFilms = filteredFilms.filter((film) => filters.decades.includes(Math.floor(film.year / 10) * 10))
    }

    // Apply country filters
    if (filters.countries.length > 0) {
      filteredFilms = filteredFilms.filter((film) =>
        filters.countries.some((country) => film.country.includes(country)),
      )
    }

    // Apply year range
    filteredFilms = filteredFilms.filter(
      (film) => film.year >= filters.yearRange.min && film.year <= filters.yearRange.max,
    )

    // Apply runtime range
    if (filters.runtimeRange.min > 0 || filters.runtimeRange.max < 500) {
      filteredFilms = filteredFilms.filter(
        (film) => film.runtime && film.runtime >= filters.runtimeRange.min && film.runtime <= filters.runtimeRange.max,
      )
    }

    // Apply Criterion filter
    if (filters.criterionOnly) {
      filteredFilms = filteredFilms.filter((film) => film.criterion === true)
    }

    // Generate theme name and summary
    const { themeName, filterSummary } = generateThemeDescription(filters, searchTerm, filteredFilms.length)

    onThemeChange(filteredFilms, themeName, filterSummary)
    setSelectedPreset("")
  }

  // Generate descriptive theme name and summary
  const generateThemeDescription = (filters: FilterCriteria, search: string, count: number) => {
    const parts: string[] = []
    const summaryParts: string[] = []

    if (search) {
      parts.push(`"${search}"`)
      summaryParts.push(`Search: "${search}"`)
    }

    if (filters.decades.length > 0) {
      if (filters.decades.length === 1) {
        parts.push(`${filters.decades[0]}s`)
      } else {
        parts.push(`${filters.decades.length} Decades`)
      }
      summaryParts.push(`Decades: ${filters.decades.map((d) => `${d}s`).join(", ")}`)
    }

    if (filters.genres.length > 0) {
      if (filters.genres.length === 1) {
        parts.push(filters.genres[0])
      } else {
        parts.push(`${filters.genres.length} Genres`)
      }
      summaryParts.push(`Genres: ${filters.genres.join(", ")}`)
    }

    if (filters.directors.length > 0) {
      if (filters.directors.length === 1) {
        parts.push(filters.directors[0])
      } else {
        parts.push(`${filters.directors.length} Directors`)
      }
      summaryParts.push(`Directors: ${filters.directors.join(", ")}`)
    }

    if (filters.countries.length > 0) {
      if (filters.countries.length === 1) {
        parts.push(`${filters.countries[0]} Cinema`)
      } else {
        parts.push(`${filters.countries.length} Countries`)
      }
      summaryParts.push(`Countries: ${filters.countries.join(", ")}`)
    }

    if (filters.yearRange.min > yearRange.min || filters.yearRange.max < yearRange.max) {
      parts.push(`${filters.yearRange.min}-${filters.yearRange.max}`)
      summaryParts.push(`Years: ${filters.yearRange.min}-${filters.yearRange.max}`)
    }

    if (filters.runtimeRange.min > 0 || filters.runtimeRange.max < 500) {
      summaryParts.push(`Runtime: ${filters.runtimeRange.min}-${filters.runtimeRange.max} min`)
    }

    if (filters.criterionOnly) {
      parts.push("Criterion")
      summaryParts.push("Criterion Collection only")
    }

    const themeName = parts.length > 0 ? `${parts.join(" ")} Films` : "Custom Selection"
    const filterSummary = summaryParts.length > 0 ? summaryParts.join(" • ") : "No filters applied"

    return { themeName, filterSummary }
  }

  // Apply filters whenever they change
  useEffect(() => {
    if (showAdvanced || searchTerm) {
      applyAdvancedFilters()
    }
  }, [filters, searchTerm])

  const applyPresetTheme = (presetName: string) => {
    const themeFunction = presetThemes[presetName as keyof typeof presetThemes]
    if (themeFunction) {
      const filteredFilms = themeFunction(films)
      onThemeChange(filteredFilms, presetName, `Preset theme: ${presetName}`)
      setSelectedPreset(presetName)
      resetAdvancedFilters()
    }
  }

  const resetAdvancedFilters = () => {
    setFilters({
      genres: [],
      directors: [],
      decades: [],
      countries: [],
      yearRange: { min: yearRange.min, max: yearRange.max },
      runtimeRange: { min: 0, max: 500 },
      criterionOnly: false,
    })
    setSearchTerm("")
    setShowAdvanced(false)
  }

  const resetToAll = () => {
    onThemeChange(films, "All Films", "Showing all films in collection")
    setSelectedPreset("")
    resetAdvancedFilters()
  }

  const addFilter = (type: keyof FilterCriteria, value: string | number) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (type === "genres" || type === "directors" || type === "countries") {
        const currentArray = newFilters[type] as string[]
        if (!currentArray.includes(value as string)) {
          newFilters[type] = [...currentArray, value as string]
        }
      } else if (type === "decades") {
        const currentArray = newFilters[type] as number[]
        if (!currentArray.includes(value as number)) {
          newFilters[type] = [...currentArray, value as number]
        }
      }
      return newFilters
    })
  }

  const removeFilter = (type: keyof FilterCriteria, value: string | number) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (type === "genres" || type === "directors" || type === "countries") {
        newFilters[type] = (newFilters[type] as string[]).filter((item) => item !== value)
      } else if (type === "decades") {
        newFilters[type] = (newFilters[type] as number[]).filter((item) => item !== value)
      }
      return newFilters
    })
  }

  const hasActiveFilters = () => {
    return (
      filters.genres.length > 0 ||
      filters.directors.length > 0 ||
      filters.decades.length > 0 ||
      filters.countries.length > 0 ||
      filters.yearRange.min > yearRange.min ||
      filters.yearRange.max < yearRange.max ||
      filters.runtimeRange.min > 0 ||
      filters.runtimeRange.max < 500 ||
      filters.criterionOnly ||
      searchTerm.length > 0
    )
  }

  return (
    <Card className="bg-criterion-card border-criterion-blue mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-criterion-red">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Advanced Theme Selector
          </div>
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant="outline"
            size="sm"
            className="border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvanced ? "Simple" : "Advanced"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Theme Display */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-criterion-accent">Current Theme:</span>
            <Badge variant="outline" className="ml-2 border-criterion-red text-criterion-red">
              {currentTheme}
            </Badge>
          </div>
          <Button
            onClick={resetToAll}
            variant="outline"
            size="sm"
            className="border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
          >
            Show All Films
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-criterion-accent w-4 h-4" />
          <Input
            placeholder="Search films, directors, or genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-criterion-bg border-criterion-blue text-criterion-text placeholder:text-criterion-accent/60"
          />
        </div>

        {/* Preset Themes */}
        {!showAdvanced && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-3">
              <Sparkles className="w-4 h-4" />
              Preset Themes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {Object.keys(presetThemes).map((preset) => (
                <Button
                  key={preset}
                  onClick={() => applyPresetTheme(preset)}
                  variant={selectedPreset === preset ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedPreset === preset
                      ? "bg-criterion-red text-white"
                      : "border-criterion-blue text-criterion-text hover:bg-criterion-blue hover:text-white"
                  }
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-6">
            <Separator className="bg-criterion-blue" />

            {/* Active Filters Display */}
            {hasActiveFilters() && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-criterion-text">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="bg-criterion-red/20 text-criterion-red border-criterion-red"
                    >
                      {genre}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeFilter("genres", genre)} />
                    </Badge>
                  ))}
                  {filters.directors.map((director) => (
                    <Badge
                      key={director}
                      variant="secondary"
                      className="bg-criterion-blue/20 text-criterion-accent border-criterion-blue"
                    >
                      {director}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeFilter("directors", director)} />
                    </Badge>
                  ))}
                  {filters.decades.map((decade) => (
                    <Badge
                      key={decade}
                      variant="secondary"
                      className="bg-yellow-500/20 text-yellow-600 border-yellow-500"
                    >
                      {decade}s
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeFilter("decades", decade)} />
                    </Badge>
                  ))}
                  {filters.countries.map((country) => (
                    <Badge
                      key={country}
                      variant="secondary"
                      className="bg-green-500/20 text-green-600 border-green-500"
                    >
                      {country}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeFilter("countries", country)} />
                    </Badge>
                  ))}
                  {filters.criterionOnly && (
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-600 border-purple-500">
                      Criterion Only
                      <X
                        className="w-3 h-3 ml-1 cursor-pointer"
                        onClick={() => setFilters((prev) => ({ ...prev, criterionOnly: false }))}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Filter Selectors */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-2">
                  <FilmIcon className="w-4 h-4" />
                  Add Genre
                </label>
                <Select onValueChange={(value) => addFilter("genres", value)}>
                  <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                    <SelectValue placeholder="Select genre..." />
                  </SelectTrigger>
                  <SelectContent className="bg-criterion-card border-criterion-blue">
                    {genres
                      .filter((genre) => !filters.genres.includes(genre))
                      .map((genre) => (
                        <SelectItem key={genre} value={genre} className="text-criterion-text">
                          {genre}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Director Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-2">
                  <User className="w-4 h-4" />
                  Add Director
                </label>
                <Select onValueChange={(value) => addFilter("directors", value)}>
                  <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                    <SelectValue placeholder="Select director..." />
                  </SelectTrigger>
                  <SelectContent className="bg-criterion-card border-criterion-blue max-h-60">
                    {directors
                      .filter((director) => !filters.directors.includes(director))
                      .map((director) => (
                        <SelectItem key={director} value={director} className="text-criterion-text">
                          {director}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Decade Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-2">
                  <Calendar className="w-4 h-4" />
                  Add Decade
                </label>
                <Select onValueChange={(value) => addFilter("decades", Number.parseInt(value))}>
                  <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                    <SelectValue placeholder="Select decade..." />
                  </SelectTrigger>
                  <SelectContent className="bg-criterion-card border-criterion-blue">
                    {decades
                      .filter((decade) => !filters.decades.includes(decade))
                      .map((decade) => (
                        <SelectItem key={decade} value={decade.toString()} className="text-criterion-text">
                          {decade}s
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Country Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-2">
                  <Globe className="w-4 h-4" />
                  Add Country
                </label>
                <Select onValueChange={(value) => addFilter("countries", value)}>
                  <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent className="bg-criterion-card border-criterion-blue max-h-60">
                    {countries
                      .filter((country) => !filters.countries.includes(country))
                      .map((country) => (
                        <SelectItem key={country} value={country} className="text-criterion-text">
                          {country}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Range Filters */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Year Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-3">
                  <Calendar className="w-4 h-4" />
                  Year Range: {filters.yearRange.min} - {filters.yearRange.max}
                </label>
                <div className="space-y-2">
                  <Input
                    type="range"
                    min={yearRange.min}
                    max={yearRange.max}
                    value={filters.yearRange.min}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        yearRange: { ...prev.yearRange, min: Number.parseInt(e.target.value) },
                      }))
                    }
                    className="w-full"
                  />
                  <Input
                    type="range"
                    min={yearRange.min}
                    max={yearRange.max}
                    value={filters.yearRange.max}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        yearRange: { ...prev.yearRange, max: Number.parseInt(e.target.value) },
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Runtime Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-3">
                  <Clock className="w-4 h-4" />
                  Runtime: {filters.runtimeRange.min} - {filters.runtimeRange.max} min
                </label>
                <div className="space-y-2">
                  <Input
                    type="range"
                    min={0}
                    max={500}
                    value={filters.runtimeRange.min}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        runtimeRange: { ...prev.runtimeRange, min: Number.parseInt(e.target.value) },
                      }))
                    }
                    className="w-full"
                  />
                  <Input
                    type="range"
                    min={0}
                    max={500}
                    value={filters.runtimeRange.max}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        runtimeRange: { ...prev.runtimeRange, max: Number.parseInt(e.target.value) },
                      }))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Special Filters */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="criterion"
                checked={filters.criterionOnly}
                onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, criterionOnly: checked as boolean }))}
              />
              <label htmlFor="criterion" className="text-sm text-criterion-text cursor-pointer">
                Criterion Collection films only
              </label>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters() && (
              <Button
                onClick={resetAdvancedFilters}
                variant="outline"
                className="border-criterion-accent text-criterion-accent hover:bg-criterion-accent hover:text-criterion-bg"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            )}
          </div>
        )}

        {/* Quick Filter Examples */}
        {showAdvanced && (
          <div className="bg-criterion-bg/50 p-4 rounded-lg border border-criterion-blue/50">
            <h4 className="text-sm font-medium text-criterion-text mb-3">Quick Filter Examples:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({
                    ...filters,
                    decades: [1970],
                    genres: ["Horror"],
                  })
                }}
                className="justify-start text-criterion-accent hover:text-criterion-red"
              >
                1970s Horror Films
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({
                    ...filters,
                    directors: ["Stanley Kubrick"],
                    genres: ["Sci-Fi"],
                  })
                }}
                className="justify-start text-criterion-accent hover:text-criterion-red"
              >
                Kubrick Sci-Fi
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({
                    ...filters,
                    countries: ["France"],
                    decades: [1960],
                    genres: ["New Wave"],
                  })
                }}
                className="justify-start text-criterion-accent hover:text-criterion-red"
              >
                1960s French New Wave
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({
                    ...filters,
                    genres: ["Film Noir"],
                    yearRange: { min: 1940, max: 1959 },
                  })
                }}
                className="justify-start text-criterion-accent hover:text-criterion-red"
              >
                Classic Film Noir (1940s-50s)
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
