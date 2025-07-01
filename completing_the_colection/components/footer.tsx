"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Film, Youtube, Instagram, Mail, ExternalLink } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
    alert("Thanks for subscribing! You'll be notified of new episodes and wheel results.")
  }

  return (
    <footer className="bg-criterion-card border-t-2 border-criterion-blue">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 font-light text-2xl mb-6">
              <Film className="w-8 h-8 text-criterion-red" />
              <span className="text-criterion-text tracking-tight">Completing the Collection</span>
            </Link>
            <p className="text-criterion-accent text-sm tracking-wide">Watch. Read. Play. Listen. Complete.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-criterion-red mb-6 text-lg">Quick Links</h3>
            <div className="space-y-3">
              <Link
                href="/episodes"
                className="block text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                All Episodes
              </Link>
              <Link
                href="/submit"
                className="block text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                Submit a Film
              </Link>
              <Link
                href="/about"
                className="block text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                About the Show
              </Link>
              <Link
                href="/blog"
                className="block text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                Behind the Scenes
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-medium text-criterion-red mb-6 text-lg">Follow Along</h3>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Letterboxd
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-criterion-text hover:text-criterion-red text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Podcast Platforms
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-criterion-red mb-6 text-lg">Stay Updated</h3>
            <p className="text-criterion-text/80 text-sm mb-6 leading-relaxed">
              Get notified of new episodes and wheel results.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-criterion-bg border-criterion-blue text-criterion-text placeholder:text-criterion-accent/60"
              />
              <Button
                type="submit"
                size="sm"
                className="w-full criterion-button bg-criterion-red hover:bg-criterion-blue text-white font-medium border-0"
              >
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t-2 border-criterion-blue mt-12 pt-8 text-center">
          <p className="text-criterion-accent text-sm">© 2024 Completing the Collection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
