"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  type Film,
  presetThemes,
  getUniqueGenres,
  getUniqueDirectors,
  getUniqueDecades,
  getUniqueCountries,
} from "@/data/films"
import { Palette, User, Calendar, Globe, FilmIcon, Sparkles } from "lucide-react"

interface ThemeSelectorProps {
  films: Film[]
  onThemeChange: (filteredFilms: Film[], themeName: string) => void
  currentTheme: string
}

export function ThemeSelector({ films, onThemeChange, currentTheme }: ThemeSelectorProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>("")
  const [selectedGenre, setSelectedGenre] = useState<string>("")
  const [selectedDirector, setSelectedDirector] = useState<string>("")
  const [selectedDecade, setSelectedDecade] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")

  const genres = getUniqueGenres(films)
  const directors = getUniqueDirectors(films)
  const decades = getUniqueDecades(films)
  const countries = getUniqueCountries(films)

  const applyPresetTheme = (presetName: string) => {
    const themeFunction = presetThemes[presetName as keyof typeof presetThemes]
    if (themeFunction) {
      const filteredFilms = themeFunction(films)
      onThemeChange(filteredFilms, presetName)
      setSelectedPreset(presetName)
      // Clear other selections
      setSelectedGenre("")
      setSelectedDirector("")
      setSelectedDecade("")
      setSelectedCountry("")
    }
  }

  const applyCustomFilter = (type: string, value: string) => {
    let filteredFilms: Film[] = []
    let themeName = ""

    switch (type) {
      case "genre":
        filteredFilms = films.filter((film) => film.genre.includes(value))
        themeName = `${value} Films`
        setSelectedGenre(value)
        break
      case "director":
        filteredFilms = films.filter((film) => film.director === value)
        themeName = `${value} Films`
        setSelectedDirector(value)
        break
      case "decade":
        const decadeNum = Number.parseInt(value)
        filteredFilms = films.filter((film) => Math.floor(film.year / 10) * 10 === decadeNum)
        themeName = `${value}s Cinema`
        setSelectedDecade(value)
        break
      case "country":
        filteredFilms = films.filter((film) => film.country.includes(value))
        themeName = `${value} Cinema`
        setSelectedCountry(value)
        break
    }

    onThemeChange(filteredFilms, themeName)
    // Clear other selections
    if (type !== "genre") setSelectedGenre("")
    if (type !== "director") setSelectedDirector("")
    if (type !== "decade") setSelectedDecade("")
    if (type !== "country") setSelectedCountry("")
    setSelectedPreset("")
  }

  const resetToAll = () => {
    onThemeChange(films, "All Films")
    setSelectedPreset("")
    setSelectedGenre("")
    setSelectedDirector("")
    setSelectedDecade("")
    setSelectedCountry("")
  }

  return (
    <Card className="bg-criterion-card border-criterion-blue mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-criterion-red">
          <Palette className="w-5 h-5" />
          Themed Wheels
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

        {/* Preset Themes */}
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

        {/* Custom Filters */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Genre Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-criterion-text mb-2">
              <FilmIcon className="w-4 h-4" />
              By Genre
            </label>
            <Select value={selectedGenre} onValueChange={(value) => applyCustomFilter("genre", value)}>
              <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                <SelectValue placeholder="Select genre..." />
              </SelectTrigger>
              <SelectContent className="bg-criterion-card border-criterion-blue">
                {genres.map((genre) => (
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
              By Director
            </label>
            <Select value={selectedDirector} onValueChange={(value) => applyCustomFilter("director", value)}>
              <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                <SelectValue placeholder="Select director..." />
              </SelectTrigger>
              <SelectContent className="bg-criterion-card border-criterion-blue max-h-60">
                {directors.map((director) => (
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
              By Decade
            </label>
            <Select value={selectedDecade} onValueChange={(value) => applyCustomFilter("decade", value)}>
              <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                <SelectValue placeholder="Select decade..." />
              </SelectTrigger>
              <SelectContent className="bg-criterion-card border-criterion-blue">
                {decades.map((decade) => (
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
              By Country
            </label>
            <Select value={selectedCountry} onValueChange={(value) => applyCustomFilter("country", value)}>
              <SelectTrigger className="bg-criterion-bg border-criterion-blue text-criterion-text">
                <SelectValue placeholder="Select country..." />
              </SelectTrigger>
              <SelectContent className="bg-criterion-card border-criterion-blue max-h-60">
                {countries.map((country) => (
                  <SelectItem key={country} value={country} className="text-criterion-text">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
