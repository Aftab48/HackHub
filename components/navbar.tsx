"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Calendar,
  Users,
  Trophy,
  Home,
  Settings,
  Upload,
  Scale,
  BarChart3,
  MessageSquare,
  Award,
  Menu,
} from "lucide-react"

export function Navbar() {
  const { user } = useAuth()

  const NavigationLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        href="/"
        className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
          mobile ? "py-2" : ""
        }`}
      >
        <Home className="h-4 w-4" />
        Home
      </Link>
      <Link
        href="/events"
        className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
          mobile ? "py-2" : ""
        }`}
      >
        <Calendar className="h-4 w-4" />
        Events
      </Link>
      <Link
        href="/leaderboard"
        className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
          mobile ? "py-2" : ""
        }`}
      >
        <Trophy className="h-4 w-4" />
        Leaderboard
      </Link>
      {user && (
        <>
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
              mobile ? "py-2" : ""
            }`}
          >
            <Users className="h-4 w-4" />
            Dashboard
          </Link>
          {user.role !== "organizer" && user.role !== "judge" && (
            <Link
              href="/teams"
              className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
                mobile ? "py-2" : ""
              }`}
            >
              <Users className="h-4 w-4" />
              Teams
            </Link>
          )}
          <Link
            href="/submissions"
            className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
              mobile ? "py-2" : ""
            }`}
          >
            <Upload className="h-4 w-4" />
            Submissions
          </Link>
          <Link
            href="/chat"
            className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
              mobile ? "py-2" : ""
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </Link>
          {user.role === "judge" && (
            <Link
              href="/judging"
              className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
                mobile ? "py-2" : ""
              }`}
            >
              <Scale className="h-4 w-4" />
              Judging
            </Link>
          )}
          {user.role === "organizer" && (
            <>
              <Link
                href="/events/manage"
                className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
                  mobile ? "py-2" : ""
                }`}
              >
                <Settings className="h-4 w-4" />
                Manage Events
              </Link>
              <Link
                href="/analytics"
                className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
                  mobile ? "py-2" : ""
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                href="/certificates"
                className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${
                  mobile ? "py-2" : ""
                }`}
              >
                <Award className="h-4 w-4" />
                Certificates
              </Link>
            </>
          )}
        </>
      )}
    </>
  )

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">HackHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavigationLinks />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-primary-foreground" />
                    </div>
                    HackHub
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6 ml-4">
                  <NavigationLinks mobile />
                  {!user && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/auth/login">Sign In</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href="/auth/signup">Get Started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {!user && (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          )}

          <ThemeToggle />
          {user && <UserMenu />}
        </div>
      </div>
    </nav>
  )
}
