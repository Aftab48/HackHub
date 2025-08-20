"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Trophy,
  Zap,
  Shield,
  BarChart3,
  Github,
  Linkedin,
  Mail,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      if (!user) {
        router.push("/auth/login");
      } else if (user.role !== "organizer") {
        setShowModal(true);
      } else {
        router.push("/events/manage");
      }
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#DCF763]/30 to-[#489299]/30 dark:from-[#896978]/30 dark:to-[#DCF763]/30 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#489299]/30 to-[#0B3C49]/30 dark:from-[#489299]/30 dark:to-[#896978]/30 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-[#896978]/30 to-[#DCF763]/30 dark:from-[#DCF763]/30 dark:to-[#0B3C49]/30 rounded-full blur-xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-4 text-xs md:text-sm glass animate-glow neon-border bg-[#896978] text-[#489299] border-[#0B3C49] dark:bg-[#0B3C49] dark:text-[#DCF763] dark:border-[#896978] hover:scale-105 transition-transform"
            >
              🚀 Now with Web3 Integration
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight animate-pulse-neon text-[#0B3C49] dark:text-[#DCF763] [text-shadow:0_0_20px_#489299] dark:[text-shadow:0_0_20px_#896978]">
              Host Amazing Hackathons & Tech Events
            </h1>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed text-[#896978] dark:text-[#EFECDD]">
              Empower organizers, participants, and judges with our
              comprehensive platform featuring real-time collaboration,
              automated workflows, and seamless event management.
            </p>
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 w-full sm:w-auto animate-glow hover:scale-105 transition-transform bg-[#489299] hover:bg-[#0B3C49] text-[#EFECDD] [box-shadow:0_0_20px_#DCF763] dark:bg-[#DCF763] dark:hover:bg-[#896978] dark:text-[#0B3C49] dark:[box-shadow:0_0_20px_#489299]"
                  asChild
                >
                  <Link href="/auth/signup">Start Organizing</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 glass neon-border w-full sm:w-auto hover:scale-105 transition-transform bg-transparent border-[#489299] text-[#0B3C49] hover:bg-[#DCF763]/20 dark:border-[#896978] dark:text-[#DCF763] dark:hover:bg-[#489299]/20"
                  asChild
                >
                  <Link href="/events">Join as Participant</Link>
                </Button>
              </div>
            ) : (
              <div className="flex w-full justify-center">
                <Button
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 w-full sm:w-auto max-w-xs animate-glow hover:scale-105 transition-transform bg-[#489299] hover:bg-[#0B3C49] text-[#EFECDD] [box-shadow:0_0_20px_#DCF763] dark:bg-[#DCF763] dark:hover:bg-[#896978] dark:text-[#0B3C49] dark:[box-shadow:0_0_20px_#489299]"
                  asChild
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 neon-text">
              Everything You Need
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From event creation to certificate generation, we've got every
              aspect of hackathon management covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <Card className="glass neon-border hover:scale-105 transition-all duration-300 animate-float group">
              <CardHeader className="p-4 md:p-6">
                <Calendar className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4 group-hover:animate-pulse" />
                <CardTitle className="text-lg md:text-xl">
                  Event Management
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Configure events with themes, tracks, rules, timelines,
                  prizes, and sponsor showcases
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="glass neon-border hover:scale-105 transition-all duration-300 animate-float group"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader className="p-4 md:p-6">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-secondary mb-3 md:mb-4 group-hover:animate-pulse" />
                <CardTitle className="text-lg md:text-xl">
                  Team Formation
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Easy registration, team building, and collaboration tools with
                  invite systems
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="glass neon-border hover:scale-105 transition-all duration-300 animate-float group"
              style={{ animationDelay: "0.4s" }}
            >
              <CardHeader className="p-4 md:p-6">
                <Trophy className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4 group-hover:animate-pulse" />
                <CardTitle className="text-lg md:text-xl">
                  Project Evaluation
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Comprehensive submission system with multi-round judging and
                  real-time feedback
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="glass neon-border hover:scale-105 transition-all duration-300 animate-float group"
              style={{ animationDelay: "0.6s" }}
            >
              <CardHeader className="p-4 md:p-6">
                <Zap className="h-10 w-10 md:h-12 md:w-12 text-secondary mb-3 md:mb-4 group-hover:animate-pulse" />
                <CardTitle className="text-lg md:text-xl">
                  Real-time Updates
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Live announcements, Q&A channels, and instant notifications
                  for all participants
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="glass neon-border hover:scale-105 transition-all duration-300 animate-float group"
              style={{ animationDelay: "0.8s" }}
            >
              <CardHeader className="p-4 md:p-6">
                <Shield className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4 group-hover:animate-pulse" />
                <CardTitle className="text-lg md:text-xl">
                  Web3 Integration
                </CardTitle>
                <CardDescription className="text-sm md:text-base text-[#896978] dark:text-[#EFECDD]">
                  Proof of Participation (POAP) and NFT badges for verified
                  event participation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="glass neon-border hover:scale-105 transition-all duration-300 animate-float group"
              style={{ animationDelay: "1s" }}
            >
              <CardHeader className="p-4 md:p-6">
                <BarChart3 className="h-10 w-10 md:h-12 md:w-12 text-secondary mb-3 md:mb-4 group-hover:animate-pulse" />
                <CardTitle className="text-lg md:text-xl">
                  Analytics Dashboard
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Comprehensive insights, leaderboards, and automated
                  certificate generation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-primary via-accent to-secondary relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute bottom-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto text-white glass p-8 rounded-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 animate-shimmer">
              Ready to Host Your Next Hackathon?
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
              Join thousands of organizers who trust HackHub to deliver
              exceptional hackathon experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-base md:text-lg px-6 md:px-8 w-full sm:w-auto hover:scale-105 transition-transform animate-glow bg-[#489299] hover:bg-[#0B3C49] text-[#EFECDD] [box-shadow:0_0_20px_#DCF763] dark:bg-[#DCF763] dark:hover:bg-[#896978] dark:text-[#0B3C49] dark:[box-shadow:0_0_20px_#489299]"
                onClick={handleClick}
              >
                Create Your Event
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-6 md:px-8 border-white text-white hover:bg-white hover:text-primary glass w-full sm:w-auto hover:scale-105 transition-transform bg-transparent"
                asChild
              >
                <Link href="/events">View Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-12 md:py-16 px-4 bg-gradient-to-br from-[#896978]/20 via-[#489299]/10 to-[#0B3C49]/20 dark:from-[#0B3C49]/30 dark:via-[#896978]/20 dark:to-[#DCF763]/10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-[#DCF763]/20 to-[#489299]/20 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-[#896978]/20 to-[#0B3C49]/20 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-r from-[#489299]/20 to-[#DCF763]/20 rounded-full blur-xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="glass rounded-2xl p-6 md:p-8 neon-border bg-[#EFECDD]/10 dark:bg-[#0B3C49]/20 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#0B3C49] dark:text-[#DCF763] animate-shimmer">
                  HackHub
                </h3>
                <p className="text-sm md:text-base text-[#896978] dark:text-[#EFECDD] mb-4 leading-relaxed">
                  Empowering the next generation of innovators through seamless
                  hackathon experiences.
                </p>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 glass neon-border hover:scale-110 transition-transform bg-[#489299]/20 hover:bg-[#DCF763]/30 text-[#489299] dark:bg-[#896978]/20 dark:hover:bg-[#DCF763]/30 dark:text-[#EFECDD]"
                    asChild
                  >
                    <Link href="https://github.com/Aftab48" target="_blank">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                  {/* <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 glass neon-border hover:scale-110 transition-transform bg-[#489299]/20 hover:bg-[#DCF763]/30 text-[#489299] dark:bg-[#896978]/20 dark:hover:bg-[#DCF763]/30 dark:text-[#EFECDD]"
                    asChild
                  >
                    <Link href="https://twitter.com" target="_blank">
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button> */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 glass neon-border hover:scale-110 transition-transform bg-[#489299]/20 hover:bg-[#DCF763]/30 text-[#489299] dark:bg-[#896978]/20 dark:hover:bg-[#DCF763]/30 dark:text-[#EFECDD]"
                    asChild
                  >
                    <Link
                      href="https://www.linkedin.com/in/aftab-alam-53b521246/"
                      target="_blank"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 glass neon-border hover:scale-110 transition-transform bg-[#489299]/20 hover:bg-[#DCF763]/30 text-[#489299] dark:bg-[#896978]/20 dark:hover:bg-[#DCF763]/30 dark:text-[#EFECDD]"
                    asChild
                  >
                    <Link href="mailto:mdalam4884@gmail.com">
                      <Mail className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Platform Links */}
              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-[#0B3C49] dark:text-[#DCF763] text-sm md:text-base">
                  Platform
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/events"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Browse Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/events/manage"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Create Event
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teams"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Find Teams
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/leaderboard"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Leaderboard
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-[#0B3C49] dark:text-[#DCF763] text-sm md:text-base">
                  Resources
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/docs"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/api"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/guides"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-[#0B3C49] dark:text-[#DCF763] text-sm md:text-base">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm text-[#896978] dark:text-[#EFECDD] hover:text-[#489299] dark:hover:text-[#DCF763] transition-colors hover:underline"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-[#489299]/30 dark:border-[#896978]/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs md:text-sm text-[#896978] dark:text-[#EFECDD] text-center md:text-left">
                © 2024 HackHub. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm text-[#896978] dark:text-[#EFECDD]">
                <span>Made with</span>
                <Heart className="h-3 w-3 md:h-4 md:w-4 text-[#489299] dark:text-[#DCF763] animate-pulse" />
                <span>for innovators worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
