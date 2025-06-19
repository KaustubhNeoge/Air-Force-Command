"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plane,
  Shield,
  Target,
  Zap,
  Users,
  Globe,
  Award,
  ChevronRight,
  Star,
  Eye,
  TrendingUp,
  Download,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])
  const [animatedBars, setAnimatedBars] = useState<Set<string>>(new Set())

  const aircraftSectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const fluidBackgroundRef = useRef<HTMLDivElement>(null)

  const aircraft = [
    {
      id: 1,
      name: "F-22 Raptor",
      type: "Air Superiority Fighter",
      maxSpeed: "Mach 2.25",
      range: "2,963 km",
      ceiling: "65,000 ft",
      crew: "1",
      firstFlight: "1997",
      status: "Active",
      rating: 5,
      missions: 847,
      description:
        "The world's most advanced air dominance fighter with stealth technology and supercruise capability.",
      image: "F22Raptor.jpg",
    },
    {
      id: 2,
      name: "F-35 Lightning II",
      type: "Multirole Fighter",
      maxSpeed: "Mach 1.6",
      range: "2,220 km",
      ceiling: "50,000 ft",
      crew: "1",
      firstFlight: "2006",
      status: "Active",
      rating: 5,
      missions: 1203,
      description: "Next-generation multirole fighter with advanced sensors and network-enabled operations.",
      image: "F35.jpg",
    },
    {
      id: 3,
      name: "B-2 Spirit",
      type: "Strategic Bomber",
      maxSpeed: "Mach 0.95",
      range: "11,100 km",
      ceiling: "50,000 ft",
      crew: "2",
      firstFlight: "1989",
      status: "Active",
      rating: 5,
      missions: 432,
      description: "Low-observable strategic bomber capable of penetrating dense anti-aircraft defenses.",
      image: "B2.jpg",
    },
    {
      id: 4,
      name: "A-10 Thunderbolt II",
      type: "Close Air Support",
      maxSpeed: "706 km/h",
      range: "4,150 km",
      ceiling: "45,000 ft",
      crew: "1",
      firstFlight: "1972",
      status: "Active",
      rating: 4,
      missions: 2156,
      description: "Dedicated close air support aircraft designed for attacking ground targets and tanks.",
      image: "A10.webp",
    },
    {
      id: 5,
      name: "C-130 Hercules",
      type: "Transport Aircraft",
      maxSpeed: "592 km/h",
      range: "3,800 km",
      ceiling: "33,000 ft",
      crew: "3-5",
      firstFlight: "1954",
      status: "Active",
      rating: 4,
      missions: 3421,
      description: "Versatile tactical transport aircraft capable of operating from rough airstrips.",
      image: "C130.jpg",
    },
    {
      id: 6,
      name: "AH-64 Apache",
      type: "Attack Helicopter",
      maxSpeed: "293 km/h",
      range: "476 km",
      ceiling: "21,000 ft",
      crew: "2",
      firstFlight: "1975",
      status: "Active",
      rating: 5,
      missions: 1876,
      description: "Twin-turboshaft attack helicopter with advanced fire control and night vision systems.",
      image: "Ah64.jpg",
    },
  ]

  const capabilities = [
    {
      icon: Shield,
      title: "Air Superiority",
      description: "Maintaining control of airspace through advanced fighter aircraft and integrated defense systems.",
    },
    {
      icon: Target,
      title: "Precision Strike",
      description:
        "Delivering accurate and effective strikes against high-value targets with minimal collateral damage.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Rapid deployment and sustained operations anywhere in the world through strategic airlift capabilities.",
    },
    {
      icon: Zap,
      title: "Electronic Warfare",
      description: "Advanced electronic countermeasures and signals intelligence for information dominance.",
    },
  ]

  // Customer countries data
  const customerCountries = [
    {
      name: "United States",
      flag: "🇺🇸",
      aircraft: 1247,
      contracts: "Active",
      since: 1947,
      primaryAircraft: ["F-22", "F-35", "B-2", "A-10"],
      totalValue: "$847B",
    },
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      aircraft: 138,
      contracts: "Active",
      since: 1952,
      primaryAircraft: ["F-35", "C-130"],
      totalValue: "$23.4B",
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      aircraft: 72,
      contracts: "Active",
      since: 1963,
      primaryAircraft: ["F-35", "C-130"],
      totalValue: "$18.7B",
    },
    {
      name: "Japan",
      flag: "🇯🇵",
      aircraft: 147,
      contracts: "Active",
      since: 1954,
      primaryAircraft: ["F-35", "C-130"],
      totalValue: "$31.2B",
    },
    {
      name: "South Korea",
      flag: "🇰🇷",
      aircraft: 89,
      contracts: "Active",
      since: 1950,
      primaryAircraft: ["F-35", "AH-64"],
      totalValue: "$19.8B",
    },
    {
      name: "Netherlands",
      flag: "🇳🇱",
      aircraft: 46,
      contracts: "Active",
      since: 1949,
      primaryAircraft: ["F-35", "AH-64"],
      totalValue: "$12.1B",
    },
    {
      name: "Italy",
      flag: "🇮🇹",
      aircraft: 90,
      contracts: "Active",
      since: 1949,
      primaryAircraft: ["F-35", "C-130"],
      totalValue: "$21.5B",
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      aircraft: 76,
      contracts: "Active",
      since: 1949,
      primaryAircraft: ["F-35", "C-130"],
      totalValue: "$16.9B",
    },
  ]

  // Stats data for military aviation
  const statsData = [
    {
      title: "Fleet Operational Readiness",
      value: "94.7",
      unit: "%",
      change: 8,
      changeType: "increase" as const,
      fromYear: 2019,
      data: [
        { year: 2019, value: 87.8, percentage: 75 },
        { year: 2020, value: 89.2, percentage: 78 },
        { year: 2021, value: 91.5, percentage: 85 },
        { year: 2022, value: 94.7, percentage: 100 },
      ],
    },
    {
      title: "Mission Success Rate",
      value: "98.3",
      unit: "%",
      change: 12,
      changeType: "increase" as const,
      fromYear: 2019,
      data: [
        { year: 2019, value: 87.6, percentage: 65 },
        { year: 2020, value: 92.1, percentage: 78 },
        { year: 2021, value: 95.8, percentage: 88 },
        { year: 2022, value: 98.3, percentage: 100 },
      ],
    },
    {
      title: "Annual Flight Hours",
      value: "2,847,392",
      unit: "hrs",
      change: 15,
      changeType: "increase" as const,
      fromYear: 2019,
      data: [
        { year: 2019, value: 2476543, percentage: 70 },
        { year: 2020, value: 2198765, percentage: 55 },
        { year: 2021, value: 2654321, percentage: 85 },
        { year: 2022, value: 2847392, percentage: 100 },
      ],
    },
  ]

  // Cursor ripple effect
  const createRipple = useCallback((e: MouseEvent) => {
    const newRipple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    }
    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 1000)
  }, [])

  // Enhanced mouse tracking with fluid background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      const normalizedX = (x / window.innerWidth) * 100
      const normalizedY = (y / window.innerHeight) * 100

      setMousePosition({ x, y })

      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`
        cursorRef.current.style.top = `${y}px`
      }

      // Update fluid background
      if (fluidBackgroundRef.current) {
        const intensity = 0.3
        const offsetX = (normalizedX - 50) * intensity
        const offsetY = (normalizedY - 50) * intensity

        fluidBackgroundRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.1)`
        fluidBackgroundRef.current.style.background = `
          radial-gradient(circle at ${normalizedX}% ${normalizedY}%, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(37, 99, 235, 0.1) 25%, 
            rgba(29, 78, 216, 0.05) 50%, 
            transparent 70%),
          radial-gradient(circle at ${100 - normalizedX}% ${100 - normalizedY}%, 
            rgba(6, 182, 212, 0.1) 0%, 
            rgba(8, 145, 178, 0.05) 30%, 
            transparent 60%),
          linear-gradient(${normalizedX + normalizedY}deg, 
            rgba(59, 130, 246, 0.03) 0%, 
            rgba(37, 99, 235, 0.02) 50%, 
            rgba(6, 182, 212, 0.03) 100%)
        `
      }
    }

    const handleClick = (e: MouseEvent) => {
      createRipple(e)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [createRipple])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))

            // Trigger bar animations for stats
            if (entry.target.id.includes("stats-")) {
              setTimeout(() => {
                setAnimatedBars((prev) => new Set([...prev, entry.target.id]))
              }, 300)
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Enhanced particle system with cursor interaction
  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      }))
      setParticles(newParticles)
    }

    createParticles()
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          // Add cursor attraction effect
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const attraction = distance < 200 ? ((200 - distance) / 200) * 0.02 : 0

          return {
            ...particle,
            x: (particle.x + particle.vx + dx * attraction + window.innerWidth) % window.innerWidth,
            y: (particle.y + particle.vy + dy * attraction + window.innerHeight) % window.innerHeight,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [mousePosition])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll progress and parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!aircraftSectionRef.current) return

      const section = aircraftSectionRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      // Enhanced parallax effect for hero
      if (heroRef.current) {
        const heroParallax = scrollY * 0.5
        heroRef.current.style.transform = `translateY(${heroParallax}px)`
      }

      // Fluid background parallax
      if (fluidBackgroundRef.current) {
        const fluidParallax = scrollY * 0.1
        fluidBackgroundRef.current.style.transform += ` translateY(${fluidParallax}px)`
      }

      // Calculate the scroll range for horizontal effect
      const triggerStart = sectionTop - windowHeight * 0.2
      const triggerEnd = sectionTop + sectionHeight - windowHeight * 0.8

      if (scrollY >= triggerStart && scrollY <= triggerEnd) {
        const totalScrollDistance = triggerEnd - triggerStart
        const currentScrollInZone = scrollY - triggerStart
        const progress = Math.max(0, Math.min(1, currentScrollInZone / totalScrollDistance))
        setScrollProgress(progress)
      } else {
        if (scrollY < triggerStart) {
          setScrollProgress(0)
        } else if (scrollY > triggerEnd) {
          setScrollProgress(1)
        }
      }
    }

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", throttledScroll)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-blue-600/30 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-blue-400 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white animate-pulse">Initializing Flight Systems</h2>
            <p className="text-slate-400 animate-pulse">Accessing classified aircraft database...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      {/* Fluid Background Layer */}
      <div
        ref={fluidBackgroundRef}
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(37, 99, 235, 0.05) 25%, 
              rgba(29, 78, 216, 0.02) 50%, 
              transparent 70%),
            radial-gradient(circle at 20% 80%, 
              rgba(6, 182, 212, 0.08) 0%, 
              rgba(8, 145, 178, 0.04) 30%, 
              transparent 60%),
            radial-gradient(circle at 80% 20%, 
              rgba(147, 51, 234, 0.06) 0%, 
              rgba(126, 34, 206, 0.03) 40%, 
              transparent 70%),
            linear-gradient(45deg, 
              rgba(59, 130, 246, 0.02) 0%, 
              rgba(37, 99, 235, 0.01) 50%, 
              rgba(6, 182, 212, 0.02) 100%)
          `,
          filter: "blur(40px)",
        }}
      />

      {/* Animated Mesh Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              conic-gradient(from ${mousePosition.x * 0.1}deg at 50% 50%, 
                rgba(59, 130, 246, 0.1) 0deg, 
                rgba(6, 182, 212, 0.1) 120deg, 
                rgba(147, 51, 234, 0.1) 240deg, 
                rgba(59, 130, 246, 0.1) 360deg)
            `,
            transform: `rotate(${mousePosition.x * 0.02}deg) scale(1.2)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Enhanced Particle Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              animation: `twinkle 3s infinite ${particle.id * 0.1}s`,
              boxShadow: "0 0 6px rgba(59, 130, 246, 0.5)",
            }}
          />
        ))}
      </div>

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-4 h-4 bg-blue-500/30 rounded-full animate-ping" />
        </div>
      ))}

      {/* Animated Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-blue-600/8 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${20 + mousePosition.y * 0.02}%`,
            right: `${10 + mousePosition.x * 0.01}%`,
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            transition: "transform 0.6s ease-out",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-cyan-600/6 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            bottom: `${15 + mousePosition.x * 0.02}%`,
            left: `${5 + mousePosition.y * 0.01}%`,
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            transition: "transform 0.8s ease-out",
          }}
        />
        <div
          className="absolute w-72 h-72 bg-purple-600/4 rounded-full blur-3xl animate-ping delay-2000"
          style={{
            top: `${50 + Math.sin(mousePosition.x * 0.01) * 10}%`,
            left: `${50 + Math.cos(mousePosition.y * 0.01) * 10}%`,
            transform: `translate(-50%, -50%) scale(${1 + mousePosition.x * 0.0001})`,
            transition: "transform 0.4s ease-out",
          }}
        />
      </div>

      {/* Header with Glass Effect */}
      <header className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
              <Plane className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Air Force Command
              </h1>
              <p className="text-xs text-slate-400">Global Air Force</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {["Aircraft", "Capabilities", "Customers", "Stats", "Mission", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-blue-400 transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover-shadow-blue-500/25"
          >
            Classified Access
          </Button>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-950 to-blue-950/30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="space-y-8"
              data-animate
              id="hero-content"
              style={{
                animation: visibleElements.has("hero-content") ? "slideInLeft 1s ease-out" : "none",
              }}
            >
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="border-blue-600 text-blue-400 bg-blue-600/10 animate-bounce hover:scale-110 transition-transform duration-300"
                >
                  <Award className="w-4 h-4 mr-2 animate-spin" />
                  Elite Aviation Command
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Defending the Skies with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 animate-pulse">
                    {" "}
                    Advanced Aviation
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Explore the world's most advanced military aircraft fleet. From air superiority fighters to strategic
                  bombers, discover the technology that protects our airspace and projects power globally.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/fleet">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                  >
                    Explore Aircraft Fleet
                    <ChevronRight className="w-5 h-5 ml-2 animate-pulse" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:scale-105 transition-all duration-300"
                >
                  Mission Overview
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-800">
                {[
                  { value: "200+", label: "Active Aircraft" },
                  { value: "24/7", label: "Air Defense" },
                  { value: "50+", label: "Years Service" },
                ].map((stat, index) => (
                  <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-bold text-blue-400 group-hover:text-cyan-400 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="relative"
              data-animate
              id="hero-image"
              style={{
                animation: visibleElements.has("hero-image") ? "slideInRight 1s ease-out" : "none",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 rounded-3xl blur-3xl animate-pulse" />
              <Image
                src="formation.jpg"
                alt="Military Aircraft Formation"
                width={800}
                height={600}
                className="relative rounded-2xl shadow-2xl border border-slate-700 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Aircraft Fleet Section with Enhanced Cards */}
      <section ref={aircraftSectionRef} id="aircraft" className="relative py-24 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="text-center mb-16"
            data-animate
            id="aircraft-header"
            style={{
              animation: visibleElements.has("aircraft-header") ? "fadeInUp 1s ease-out" : "none",
            }}
          >
            <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-600/10 mb-4 animate-bounce">
              Aircraft Fleet
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Advanced Military Aircraft
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our fleet represents the pinnacle of aviation technology, featuring cutting-edge aircraft designed for air
              superiority, ground support, and strategic operations.
            </p>
          </div>

          {/* Enhanced Horizontal Scrolling Cards */}
          <div ref={containerRef} className="relative w-full h-[650px] overflow-hidden mb-16">
            <div
              className="flex gap-12 transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(calc(-${scrollProgress * 100}% + ${100 - scrollProgress * 15}%))`,
                width: `${aircraft.length * 500}px`,
              }}
            >
              {aircraft.map((plane, index) => (
                <Card
                  key={plane.id}
                  className="flex-shrink-0 w-[450px] bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 group backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105"
                  onMouseEnter={() => setHoveredCard(plane.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    transform: hoveredCard === plane.id ? "rotateY(5deg) rotateX(5deg)" : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={plane.image || "/placeholder.svg"}
                      alt={plane.name}
                      width={450}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className={`${
                          plane.status === "Active" ? "bg-green-600 animate-pulse" : "bg-yellow-600"
                        } text-white shadow-lg`}
                      >
                        {plane.status}
                      </Badge>
                    </div>

                    {/* Rating Stars */}
                    <div className="absolute top-4 left-4 flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < plane.rating ? "text-yellow-400 fill-current" : "text-slate-400"
                          } animate-pulse`}
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <Button size="sm" className="bg-blue-600/80 hover:bg-blue-600 text-white backdrop-blur-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <div className="text-white text-sm font-medium bg-slate-900/80 px-3 py-1 rounded backdrop-blur-sm">
                        {plane.missions} Missions
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-2xl group-hover:text-blue-400 transition-colors duration-300">
                          {plane.name}
                        </CardTitle>
                        <CardDescription className="text-blue-400 font-medium text-lg">{plane.type}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-slate-300 text-base leading-relaxed">{plane.description}</p>

                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        {[
                          { label: "Max Speed", value: plane.maxSpeed, icon: "🚀" },
                          { label: "Range", value: plane.range, icon: "📍" },
                          { label: "Ceiling", value: plane.ceiling, icon: "⬆️" },
                        ].map((stat, i) => (
                          <div
                            key={stat.label}
                            className="flex justify-between items-center py-2 px-3 bg-slate-800/30 rounded-lg group-hover:bg-slate-700/30 transition-colors duration-300"
                          >
                            <span className="text-slate-400 flex items-center gap-2">
                              <span>{stat.icon}</span>
                              {stat.label}:
                            </span>
                            <span className="text-white font-medium">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "Crew", value: plane.crew, icon: "👥" },
                          { label: "First Flight", value: plane.firstFlight, icon: "📅" },
                          { label: "Rating", value: `${plane.rating}/5`, icon: "⭐" },
                        ].map((stat, i) => (
                          <div
                            key={stat.label}
                            className="flex justify-between items-center py-2 px-3 bg-slate-800/30 rounded-lg group-hover:bg-slate-700/30 transition-colors duration-300"
                          >
                            <span className="text-slate-400 flex items-center gap-2">
                              <span>{stat.icon}</span>
                              {stat.label}:
                            </span>
                            <span className="text-white font-medium">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mission Readiness Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Mission Readiness</span>
                        <span className="text-blue-400">{plane.rating * 20}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-cyan-400 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{
                            width: hoveredCard === plane.id ? `${plane.rating * 20}%` : "0%",
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                      <Target className="w-4 h-4 mr-2" />
                      Detailed Specifications
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Progress Indicator */}
          <div className="flex justify-center">
            <div className="w-80 h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${scrollProgress * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Capabilities Section */}
      <section id="capabilities" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="text-center mb-16"
            data-animate
            id="capabilities-header"
            style={{
              animation: visibleElements.has("capabilities-header") ? "fadeInUp 1s ease-out" : "none",
            }}
          >
            <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-600/10 mb-4 animate-bounce">
              Core Capabilities
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Mission-Critical Operations
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our aviation capabilities span the full spectrum of military operations, from air-to-air combat to
              strategic bombing and humanitarian missions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 text-center group backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                data-animate
                id={`capability-${index}`}
                style={{
                  animation: visibleElements.has(`capability-${index}`)
                    ? `fadeInUp 1s ease-out ${index * 0.2}s both`
                    : "none",
                }}
              >
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-600/40 group-hover:to-cyan-600/40 transition-all duration-300 group-hover:scale-110">
                    <capability.icon className="w-10 h-10 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors duration-300">
                    {capability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Customers Section */}
      <section id="customers" className="py-24 bg-slate-900/50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="text-center mb-16"
            data-animate
            id="customers-header"
            style={{
              animation: visibleElements.has("customers-header") ? "fadeInUp 1s ease-out" : "none",
            }}
          >
            <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-600/10 mb-4 animate-bounce">
              Global Partners
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Trusted Worldwide
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our advanced military aircraft serve allied nations across the globe, ensuring collective security and
              defense capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {customerCountries.map((country, index) => (
              <div
                key={country.name}
                className="relative group"
                onMouseEnter={() => setHoveredCountry(country.name)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <Card className="bg-gradient-to-br from-slate-800/85 to-slate-900/90 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 group backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {country.flag}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {country.name}
                    </h3>
                    <div className="text-2xl font-bold text-blue-400 mb-1">{country.aircraft}</div>
                    <div className="text-sm text-slate-400">Active Aircraft</div>
                  </CardContent>
                </Card>

                {/* Hover Card */}
                {hoveredCountry === country.name && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50 animate-fade-in">
                    <Card className="w-80 bg-slate-800/95 border-blue-500/50 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{country.flag}</span>
                          <div>
                            <CardTitle className="text-white text-lg">{country.name}</CardTitle>
                            <CardDescription className="text-blue-400">Partner since {country.since}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-400">Total Aircraft</div>
                            <div className="text-white font-semibold">{country.aircraft}</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Contract Value</div>
                            <div className="text-green-400 font-semibold">{country.totalValue}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-sm mb-2">Primary Aircraft</div>
                          <div className="flex flex-wrap gap-1">
                            {country.primaryAircraft.map((aircraft) => (
                              <Badge
                                key={aircraft}
                                variant="secondary"
                                className="bg-blue-600/20 text-blue-400 text-xs"
                              >
                                {aircraft}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                          <span className="text-sm text-slate-400">Status</span>
                          <Badge className="bg-green-600 text-white">{country.contracts}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Global Reach Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "47", label: "Allied Nations", icon: "🌍" },
              { value: "1,905", label: "Total Aircraft Deployed", icon: "✈️" },
              { value: "$952B", label: "Combined Contract Value", icon: "💰" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-800/85 to-slate-900/90 border-slate-700/50 text-center group hover:border-blue-500/50 transition-all duration-500"
              >
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-slate-300">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Stats Dashboard */}
      <section id="stats" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="text-center mb-16"
            data-animate
            id="stats-header"
            style={{
              animation: visibleElements.has("stats-header") ? "fadeInUp 1s ease-out" : "none",
            }}
          >
            <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-600/10 mb-4 animate-bounce">
              Performance Analytics
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Mission Performance Dashboard
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real-time analytics and performance metrics showcasing our operational excellence and continuous
              improvement.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/95 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20"
                data-animate
                id={`stats-${index}`}
                style={{
                  animation: visibleElements.has(`stats-${index}`)
                    ? `fadeInUp 1s ease-out ${index * 0.2}s both`
                    : "none",
                }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-slate-300 text-sm font-medium mb-2">{stat.title}</CardTitle>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-bold text-white">{stat.value}</span>
                        <span className="text-lg text-slate-400">{stat.unit}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {stat.changeType === "increase" ? (
                        <ArrowUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-400" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "increase" ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stat.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">from {stat.fromYear}</div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Animated Bar Chart */}
                  <div className="space-y-4">
                    {stat.data.map((yearData, yearIndex) => (
                      <div key={yearData.year} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">{yearData.year}</span>
                          <span className="text-white font-medium">
                            {typeof yearData.value === "number" && yearData.value > 1000000
                              ? (yearData.value / 1000000).toFixed(1) + "M"
                              : yearData.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                            style={{
                              width: animatedBars.has(`stats-${index}`) ? `${yearData.percentage}%` : "0%",
                              transitionDelay: `${yearIndex * 200}ms`,
                            }}
                          >
                            {/* Animated shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                            {/* Pulsing overlay */}
                            <div className="absolute inset-0 bg-white/10 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Performance Metrics */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Average Response Time", value: "4.2", unit: "min", trend: "down", trendValue: "15%" },
              { title: "Fuel Efficiency", value: "87.3", unit: "%", trend: "up", trendValue: "23%" },
              { title: "Maintenance Uptime", value: "96.8", unit: "%", trend: "up", trendValue: "8%" },
              { title: "Training Hours", value: "847K", unit: "hrs", trend: "up", trendValue: "31%" },
            ].map((metric, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-800/85 to-slate-900/90 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-slate-400 uppercase tracking-wide">{metric.title}</div>
                    <div
                      className={`flex items-center space-x-1 ${
                        metric.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      <span className="text-xs">{metric.trendValue}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {metric.value}
                    </span>
                    <span className="text-sm text-slate-400">{metric.unit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section id="mission" className="py-24 bg-slate-900/50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className="space-y-8"
              data-animate
              id="mission-content"
              style={{
                animation: visibleElements.has("mission-content") ? "slideInLeft 1s ease-out" : "none",
              }}
            >
              <div>
                <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-600/10 mb-4 animate-bounce">
                  Our Mission
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Protecting Freedom Through Air Power
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  The Air Force delivers rapid, flexible, and precise air and space power to defend America and its
                  interests. We fly, fight, and win in air, space, and cyberspace.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Air and Space Superiority",
                    description: "Maintaining control of air and space to enable freedom of action for all forces.",
                  },
                  {
                    icon: Target,
                    title: "Global Strike",
                    description: "Delivering precise, rapid, and decisive effects against any target, anywhere.",
                  },
                  {
                    icon: Users,
                    title: "Rapid Global Mobility",
                    description: "Providing agile combat support and rapid deployment capabilities worldwide.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 group hover:bg-slate-800/30 p-4 rounded-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              >
                Learn More About Our Mission
                <ChevronRight className="w-5 h-5 ml-2 animate-pulse" />
              </Button>
            </div>

            <div
              className="relative"
              data-animate
              id="mission-image"
              style={{
                animation: visibleElements.has("mission-image") ? "slideInRight 1s ease-out" : "none",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 rounded-3xl blur-3xl animate-pulse" />
              <Image
                src="mission.jpg"
                alt="Air Force Mission"
                width={600}
                height={600}
                className="relative rounded-2xl shadow-2xl border border-slate-700 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-950/80 border-t border-slate-800/50 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                  <Plane className="w-5 h-5 text-white animate-pulse" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Air Force Command
                </span>
              </div>
              <p className="text-slate-400 text-sm">
              Ginger Air Force - Defending freedom through air and space power since birth!!
              </p>
            </div>

            {[
              {
                title: "Aircraft",
                links: ["Fighter Aircraft", "Bombers", "Transport", "Helicopters"],
              },
              {
                title: "Operations",
                links: ["Air Superiority", "Global Strike", "Mobility", "Intelligence"],
              },
              {
                title: "Resources",
                links: ["News & Updates", "Career Opportunities", "Contact Us", "Security"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()}Ginger Air Force Command. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Accessibility"].map((link, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-slate-400 hover:text-blue-400 text-sm transition-all duration-300 hover:scale-105"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        html {
          cursor: none;
        }
        
        * {
          cursor: none !important;
        }
      `}</style>
    </div>
  )
}
