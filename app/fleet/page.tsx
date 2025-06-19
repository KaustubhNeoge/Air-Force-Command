"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plane,
  Shield,
  Target,
  Zap,
  Users,
  Globe,
  Award,
  ChevronRight,
  Search,
  ArrowUp,
  Star,
  Eye,
  Calendar,
  Gauge,
  MapPin,
  Radar,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Define the Aircraft type
interface Aircraft {
  id: number
  name: string
  type: string
  category: string
  maxSpeed: string
  range: string
  ceiling: string
  crew: string
  firstFlight: string
  status: string
  rating: number
  missions: number
  description: string
  image: string
  specs: {
    length: string
    wingspan?: string
    rotorDiameter?: string
    height: string
    weight: string
    engines: string
    armament?: string
    payload?: string
  }
}

export default function FleetExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const aircraft: Aircraft[] = [
    {
      id: 1,
      name: "F-22 Raptor",
      type: "Air Superiority Fighter",
      category: "fighter",
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
      specs: {
        length: "18.9 m",
        wingspan: "13.6 m",
        height: "5.1 m",
        weight: "19,700 kg",
        engines: "2x Pratt & Whitney F119",
        armament: "1x M61A2 Vulcan, AIM-120, AIM-9",
      },
    },
    {
      id: 2,
      name: "F-35 Lightning II",
      type: "Multirole Fighter",
      category: "fighter",
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
      specs: {
        length: "15.7 m",
        wingspan: "10.7 m",
        height: "4.4 m",
        weight: "13,300 kg",
        engines: "1x Pratt & Whitney F135",
        armament: "1x GAU-22/A, Various missiles",
      },
    },
    {
      id: 3,
      name: "B-2 Spirit",
      type: "Strategic Bomber",
      category: "bomber",
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
      specs: {
        length: "21.0 m",
        wingspan: "52.4 m",
        height: "5.2 m",
        weight: "71,700 kg",
        engines: "4x General Electric F118",
        armament: "Up to 23,000 kg ordnance",
      },
    },
    {
      id: 4,
      name: "A-10 Thunderbolt II",
      type: "Close Air Support",
      category: "attack",
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
      specs: {
        length: "16.3 m",
        wingspan: "17.5 m",
        height: "4.5 m",
        weight: "11,321 kg",
        engines: "2x General Electric TF34",
        armament: "1x GAU-8/A Avenger 30mm",
      },
    },
    {
      id: 5,
      name: "C-130 Hercules",
      type: "Transport Aircraft",
      category: "transport",
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
      specs: {
        length: "29.8 m",
        wingspan: "40.4 m",
        height: "11.8 m",
        weight: "34,400 kg",
        engines: "4x Allison T56-A-15",
        payload: "19,356 kg",
      },
    },
    {
      id: 6,
      name: "AH-64 Apache",
      type: "Attack Helicopter",
      category: "helicopter",
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
      specs: {
        length: "17.7 m",
        rotorDiameter: "14.6 m",
        height: "4.9 m",
        weight: "5,165 kg",
        engines: "2x General Electric T700",
        armament: "1x M230 Chain Gun, Hellfire missiles",
      },
    },
  ]

  const categories = [
    { id: "all", name: "All Aircrafts", icon: Plane },
    { id: "fighter", name: "Fighters", icon: Zap },
    { id: "bomber", name: "Bombers", icon: Target },
    { id: "attack", name: "Attack", icon: Shield },
    { id: "transport", name: "Transport", icon: Globe },
    { id: "helicopter", name: "Helicopters", icon: Users },
  ]

  const filteredAircraft = aircraft.filter((plane) => {
    const matchesCategory = selectedCategory === "all" || plane.category === selectedCategory
    const matchesSearch =
      plane.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plane.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-blue-600/30 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-blue-400 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Initializing Fleet Systems</h2>
            <p className="text-slate-400">Accessing classified aircraft database...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl animate-ping delay-2000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">USAF Command</h1>
              <p className="text-xs text-slate-400">Fleet Explorer</p>
            </div>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Base
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-600/10 animate-bounce">
              <Award className="w-4 h-4 mr-2" />
              Advanced Fleet Database
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Explore Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse">
                {" "}
                Elite Fleet
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover detailed specifications, mission history, and capabilities of our advanced military aircraft
              fleet.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search aircraft..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-600 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-blue-600"
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Aircraft Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAircraft.map((plane, index) => (
              <Card
                key={plane.id}
                className={`bg-slate-800/50 border-slate-700 hover:border-blue-600/50 transition-all duration-500 group cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                  hoveredCard === plane.id ? "shadow-2xl shadow-blue-600/20" : ""
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredCard(plane.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedAircraft(plane)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={plane.image || "/placeholder.svg"}
                    alt={plane.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className={`${plane.status === "Active" ? "bg-green-600 animate-pulse" : "bg-yellow-600"} text-white shadow-lg`}
                    >
                      {plane.status}
                    </Badge>
                  </div>

                  {/* Rating Stars */}
                  <div className="absolute top-4 left-4 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < plane.rating ? "text-yellow-400 fill-current" : "text-slate-400"
                        } animate-pulse`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <Button size="sm" variant="secondary" className="bg-blue-600/80 hover:bg-blue-600 text-white">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <div className="text-white text-sm font-medium bg-slate-900/80 px-2 py-1 rounded">
                      {plane.missions} Missions
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors duration-300">
                        {plane.name}
                      </CardTitle>
                      <CardDescription className="text-blue-400 font-medium">{plane.type}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">{plane.description}</p>

                  {/* Animated Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center group-hover:animate-pulse">
                        <span className="text-slate-400 flex items-center">
                          <Gauge className="w-3 h-3 mr-1" />
                          Max Speed:
                        </span>
                        <span className="text-white font-medium">{plane.maxSpeed}</span>
                      </div>
                      <div
                        className="flex justify-between items-center group-hover:animate-pulse"
                        style={{ animationDelay: "100ms" }}
                      >
                        <span className="text-slate-400 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Range:
                        </span>
                        <span className="text-white font-medium">{plane.range}</span>
                      </div>
                      <div
                        className="flex justify-between items-center group-hover:animate-pulse"
                        style={{ animationDelay: "200ms" }}
                      >
                        <span className="text-slate-400 flex items-center">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          Ceiling:
                        </span>
                        <span className="text-white font-medium">{plane.ceiling}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div
                        className="flex justify-between items-center group-hover:animate-pulse"
                        style={{ animationDelay: "300ms" }}
                      >
                        <span className="text-slate-400 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          Crew:
                        </span>
                        <span className="text-white font-medium">{plane.crew}</span>
                      </div>
                      <div
                        className="flex justify-between items-center group-hover:animate-pulse"
                        style={{ animationDelay: "400ms" }}
                      >
                        <span className="text-slate-400 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          First Flight:
                        </span>
                        <span className="text-white font-medium">{plane.firstFlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar Animation */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Mission Readiness</span>
                      <span className="text-blue-400">{plane.rating * 20}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: hoveredCard === plane.id ? `${plane.rating * 20}%` : "0%",
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    <Radar className="w-4 h-4 mr-2" />
                    Detailed Specifications
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAircraft.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center">
                <Search className="w-16 h-16 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Aircraft Found</h3>
              <p className="text-slate-400">Try adjusting your search criteria or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Aircraft Detail Modal */}
      {selectedAircraft && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 animate-scale-in">
            <div className="relative">
              <Image
                src={selectedAircraft.image || "/placeholder.svg"}
                alt={selectedAircraft.name}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAircraft(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedAircraft.name}</h2>
                  <p className="text-blue-400 text-lg font-medium">{selectedAircraft.type}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={`${selectedAircraft.status === "Active" ? "bg-green-600" : "bg-yellow-600"} text-white`}
                >
                  {selectedAircraft.status}
                </Badge>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed">{selectedAircraft.description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Performance Specs</h3>
                  <div className="space-y-3">
                    {Object.entries({
                      "Max Speed": selectedAircraft.maxSpeed,
                      Range: selectedAircraft.range,
                      "Service Ceiling": selectedAircraft.ceiling,
                      Crew: selectedAircraft.crew,
                      "First Flight": selectedAircraft.firstFlight,
                    }).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-slate-700">
                        <span className="text-slate-400">{key}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Technical Details</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedAircraft.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-slate-700">
                        <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
