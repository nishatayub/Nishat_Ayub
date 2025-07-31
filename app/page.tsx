'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, ExternalLink, User, Briefcase, Award, MessageCircle } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

const sections = [
  { id: 'hero', name: 'Home', icon: User },
  { id: 'about', name: 'About', icon: User },
  { id: 'skills', name: 'Skills', icon: Award },
  { id: 'projects', name: 'Projects', icon: Briefcase },
  { id: 'contact', name: 'Contact', icon: MessageCircle }
]

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0)
  const [prevSection, setPrevSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault()
    
    if (isScrolling) return
    
    // Increase threshold for scroll sensitivity
    const scrollThreshold = 50
    if (Math.abs(e.deltaY) < scrollThreshold) return
    
    setIsScrolling(true)
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      setPrevSection(currentSection)
      setCurrentSection(prev => prev + 1)
    } else if (e.deltaY < 0 && currentSection > 0) {
      setPrevSection(currentSection)
      setCurrentSection(prev => prev - 1)
    }
    
    // Longer transition time to allow for smoother animations
    setTimeout(() => setIsScrolling(false), 800)
  }, [currentSection, isScrolling])

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    
    if (isScrolling) return
    
    const distance = touchStart - touchEnd
    const isUpSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < -minSwipeDistance

    // Smoother transition when swiping
    if (isUpSwipe && currentSection < sections.length - 1) {
      setIsScrolling(true)
      // Add small delay before changing sections for smoother feel
      setTimeout(() => {
        setPrevSection(currentSection)
        setCurrentSection(prev => prev + 1)
        setTimeout(() => setIsScrolling(false), 800)
      }, 100)
    }
    if (isDownSwipe && currentSection > 0) {
      setIsScrolling(true)
      setTimeout(() => {
        setPrevSection(currentSection)
        setCurrentSection(prev => prev - 1)
        setTimeout(() => setIsScrolling(false), 800)
      }, 100)
    }
  }, [touchStart, touchEnd, currentSection, isScrolling])

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [handleScroll, onTouchEnd])

  const navigateToSection = (index: number) => {
    if (!isScrolling) {
      setIsScrolling(true)
      // Gentle fade transition with smaller delay
      setTimeout(() => {
        setPrevSection(currentSection)
        setCurrentSection(index)
        setTimeout(() => {
          setIsScrolling(false)
        }, 800)
      }, 800) // Reduced delay before navigation
    }
  }

  const renderCurrentSection = () => {
    switch (sections[currentSection].id) {
      case 'hero': return <HeroSection onNavigate={navigateToSection} />
      case 'about': return <AboutSection />
      case 'skills': return <SkillsSection />
      case 'projects': return <ProjectsSection />
      case 'contact': return <ContactSection />
      default: return <HeroSection onNavigate={navigateToSection} />
    }
  }

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: '#f6eee3' }}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40" style={{ backgroundColor: '#e8dcc8' }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: '#ef5d5e' }}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ 
            opacity: 0, 
            y: currentSection > prevSection ? 50 : -50 // Enter from bottom when scrolling down, from top when scrolling up
          }}
          animate={{ 
            opacity: 1, 
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            y: currentSection > prevSection ? -50 : 50, // Exit to top when scrolling down, to bottom when scrolling up
            transition: { 
              duration: 0.6, 
              ease: "easeInOut"
            }
          }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut"
          }}
          className="h-full"
        >
          {renderCurrentSection()}
        </motion.div>
      </AnimatePresence>

      {/* Scroll Hint */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-crimson"
        style={{ color: '#8a8a8a' }}
        initial={{ opacity: 1, y: 20 }}
        animate={{ 
          opacity: currentSection === 0 ? 1 : 0,
          y: currentSection === 0 ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to navigate
        </motion.div>
      </motion.div>
    </div>
  )
}

function HeroSection({ onNavigate }: { onNavigate: (index: number) => void }) {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long' 
      }
      setCurrentDate(now.toLocaleDateString('en-US', options))
    }
    
    updateDate()
    // Update every minute to keep it current
    const interval = setInterval(updateDate, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex items-center px-8 relative" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-center h-full max-h-screen px-4 sm:px-0 py-4 sm:py-8">
          {/* Left Column - Main Typography */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Small Labels */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-4 sm:mb-8">
                <motion.div 
                  className="flex items-center gap-2 text-xs sm:text-sm font-crimson"
                  style={{ color: '#8a8a8a' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef5d5e' }}></div>
                  <span>{currentDate}</span>
                </motion.div>
                <motion.span 
                  className="text-xs sm:text-sm font-crimson"
                  style={{ color: '#8a8a8a' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Available for work
                </motion.span>
              </div>

              {/* Large Nishat Ayub Text */}
              <div className="mb-4 sm:mb-8">
                <motion.h1 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-light leading-none"
                  style={{ color: '#ef5d5e' }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                  Nishat
                </motion.h1>
                <motion.h1 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-light leading-none"
                  style={{ color: '#ef5d5e' }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                  Ayub
                </motion.h1>
              </div>

              {/* Description Paragraph */}
              <motion.div 
                className="max-w-lg mb-4 sm:mb-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              >
                <p className="text-xs sm:text-base font-crimson leading-relaxed" style={{ color: '#8a8a8a' }}>
                  I AM A DEVELOPER AND FULL STACK ENGINEER BASED IN INDIA. 
                  I SPECIALIZE IN CREATING ROBUST WEB APPLICATIONS. 
                  MY EXPERTISE FOCUSES ON TECHNICAL DEVELOPMENT WITH THE MERN STACK.
                </p>
              </motion.div>

              {/* Large Creative Developer Text at Bottom */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-4 sm:mt-8"
              >
                <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light" style={{ color: '#ef5d5e' }}>
                  Creative Developer
                </h2>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Image Space and Labels */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-1 lg:order-2">
            <motion.div 
              className="text-center lg:text-right mb-3 sm:mb-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-xs sm:text-sm font-crimson mb-1 sm:mb-2" style={{ color: '#8a8a8a' }}>Developer</div>
              <div className="text-xs sm:text-sm font-crimson mb-1 sm:mb-2" style={{ color: '#8a8a8a' }}>MERN Stack</div>
              <div className="text-xs sm:text-sm font-crimson" style={{ color: '#8a8a8a' }}>India</div>
            </motion.div>

            {/* Picture - Circular Style */}
            <motion.div 
              className="w-32 h-32 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-2 sm:border-4 flex items-center justify-center mb-3 sm:mb-8 relative overflow-hidden shadow-2xl"
              style={{ 
                borderColor: '#d4c5a9',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Circular Cutout Effect Background */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(239, 93, 94, 0.1) 0%, 
                    rgba(246, 238, 227, 0.3) 50%, 
                    rgba(212, 197, 169, 0.2) 100%)`
                }}
              />
              <div className="w-full h-full relative z-10 rounded-full overflow-hidden">
                <img 
                  src="/profile.png" 
                  alt="Nishat Ayub - Full Stack Developer"
                  className="w-full h-full object-cover"
                  style={{ 
                    filter: 'brightness(1.05) contrast(1.1) saturate(0.95)',
                  }}
                  onLoad={() => console.log('Image loaded successfully')}
                  onError={(e) => console.error('Image failed to load:', e)}
                />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto"
            >
              <Button 
                onClick={() => onNavigate(3)}
                className="px-3 sm:px-6 py-2 sm:py-3 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300 text-xs sm:text-base"
                style={{ 
                  backgroundColor: '#ef5d5e', 
                  color: 'white',
                  border: 'none'
                }}
              >
                View Projects
              </Button>
              <Button 
                onClick={() => onNavigate(4)}
                variant="outline" 
                className="px-3 sm:px-6 py-2 sm:py-3 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300 text-xs sm:text-base"
                style={{ 
                  borderColor: '#ef5d5e', 
                  color: '#ef5d5e',
                  backgroundColor: 'transparent'
                }}
              >
                Contact Me
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="h-screen flex items-center justify-center px-4 sm:px-8" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.2
          }}
          className="mb-6 sm:mb-8"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-playfair font-light mb-4 sm:mb-6" 
            style={{ color: '#2c2c2c' }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            About Me
          </motion.h2>
          
          <div className="prose prose-lg mx-auto font-crimson" style={{ color: '#8a8a8a' }}>
            <motion.p 
              className="text-sm sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-4 lg:mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              I'm a passionate Full Stack Developer from India with expertise in modern web technologies. 
              I love building robust applications and solving complex technical challenges.
            </motion.p>
            
            <motion.p 
              className="text-xs sm:text-base md:text-lg leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              With a strong foundation in the MERN stack, 
              I focus on creating scalable solutions with clean code and efficient architecture. 
              While UI/UX is part of my skillset, my main expertise lies in technical development roles.
            </motion.p>
          </div>
          
          {/* Subtle accent line */}
          <motion.div
            className="w-20 h-1 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: '#ef5d5e' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  )
}

function SkillsSection() {
  // Skills with percentages for visual bars
  const skillCategories = [
    {
      category: "Core Technologies",
      skills: [
        { name: 'MongoDB', level: 'Advanced', percentage: 88 },
        { name: 'Express.js', level: 'Advanced', percentage: 90 },
        { name: 'React', level: 'Intermediate', percentage: 90 },
        { name: 'Node.js', level: 'Advanced', percentage: 92 }
      ]
    },
    {
      category: "Languages & Frameworks",
      skills: [
        { name: 'Python', level: 'Advanced', percentage: 82 },
        { name: 'C++', level: 'Intermediate', percentage: 70 },
        { name: 'NextJs', level: 'Intermediate', percentage: 75 }
      ]
    },
    {
      category: "Design & Tools",
      skills: [
        { name: 'Tailwind CSS', level: 'Advanced', percentage: 85 },
        { name: 'Figma', level: 'Advanced', percentage: 80 }
      ]
    }
  ];

  return (
    <div className="h-screen flex flex-col justify-center px-4 sm:px-8 py-8 sm:py-12 overflow-y-auto" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-5xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.2
          }}
          className="text-center mb-6"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-light mb-2" 
            style={{ color: '#2c2c2c' }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            My Skills
          </motion.h2>
        </motion.div>

        {/* Minimal skill section with progress bars - more compact for mobile */}
        <motion.div 
          className="max-h-[65vh] overflow-y-auto py-3 px-1 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Skill bars section - minimal and clean - now in rows of three */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
            {skillCategories.flatMap((category) => 
              category.skills.map((skill, skillIndex) => {
                const delay = skillIndex * 0.12;
                return (
                  <motion.div
                    key={skill.name}
                    className="relative"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + delay }}
                  >
                    <div 
                      className="p-2 sm:p-3 rounded-md" 
                      style={{ 
                        backgroundColor: 'white', 
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)', 
                        border: '1px solid rgba(212, 197, 169, 0.3)' 
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-crimson text-xs sm:text-sm font-medium text-[#2c2c2c] truncate mr-1">
                          {skill.name}
                        </span>
                        <span className="font-crimson text-xs font-medium whitespace-nowrap" style={{ color: '#ef5d5e' }}>
                          {skill.percentage}%
                        </span>
                      </div>
                      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(212, 197, 169, 0.3)' }}>
                        <motion.div 
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ backgroundColor: '#ef5d5e' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, delay: 1 + delay, ease: "easeOut" }}
                        />
                      </div>
                      
                      {/* Simpler level indicator */}
                      <div className="flex justify-end mt-1">
                        <span className="text-xs font-crimson tracking-wide" style={{ color: '#8a8a8a' }}>
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [scrollIndex, setScrollIndex] = React.useState(0)
  const [visibleCount, setVisibleCount] = React.useState(3)
  
  const projects = [
    {
      title: 'CodeUnity',
      description: 'A web-based collaborative IDE where developers can code together in real-time, share projects, and learn from each other',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      github: 'https://github.com/kalviumcommunity/S65_Nishat_Capstone_CodeUnity',
      live: 'https://cuni.vercel.app'
    },
    {
      title: 'ChattyBatty',
      description: 'React + Tailwind dreams up chat magic—auto-replies, group chaos, zero servers, just pure frontend wizardry in your browser.',
      tech: ['React', 'Vite', 'LocalStorage API', 'Tailwind'],
      github: 'https://github.com/nishatayub/ChattyBatty',
      live: 'https://chattybatty.vercel.app'
    },
    {
      title: 'Affirmo',
      description: 'Personal development platform for tracking daily affirmations, habits, and goals with progress analytics',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/kalviumcommunity/S65_Compliment_Generator',
      live: 'https://affirmo.vercel.app'
    }
  ]

  React.useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const nextProject = () => {
    setScrollIndex((prev) => {
      const maxIndex = Math.max(0, projects.length - visibleCount)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const prevProject = () => {
    setScrollIndex((prev) => {
      const maxIndex = Math.max(0, projects.length - visibleCount)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const getVisibleProjects = () => {
    return projects.slice(scrollIndex, scrollIndex + visibleCount)
  }

  const maxScrollIndex = Math.max(0, projects.length - visibleCount)

  return (
    <div className="h-screen flex flex-col justify-center px-4 sm:px-8 py-4 sm:py-8 pt-20" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.2
          }}
          className="text-center mb-4 sm:mb-6"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-light mb-2 sm:mb-3" 
            style={{ color: '#2c2c2c' }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Projects
          </motion.h2>
          
          <motion.p 
            className="text-xs sm:text-sm md:text-base font-crimson" 
            style={{ color: '#8a8a8a' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            Some of my recent work
          </motion.p>
          
          {/* Subtle accent line */}
          <motion.div
            className="w-20 h-1 mx-auto mt-3 rounded-full"
            style={{ backgroundColor: '#ef5d5e' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Project Navigation Buttons - Only show if not all projects fit */}
        {maxScrollIndex > 0 && (
          <div className="flex justify-center items-center gap-4 mb-4 sm:mb-6">
            <button
              onClick={prevProject}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: '#ef5d5e', color: 'white' }}
            >
              ←
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxScrollIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setScrollIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200`}
                  style={{ 
                    backgroundColor: index === scrollIndex ? '#ef5d5e' : '#d4c5a9'
                  }}
                />
              ))}
            </div>
            <button
              onClick={nextProject}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ backgroundColor: '#ef5d5e', color: 'white' }}
            >
              →
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {getVisibleProjects().map((project, index) => (
            <motion.div
              key={`${scrollIndex}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 + 0.4, ease: "easeOut" }}
              whileHover={{ 
                y: -5, 
                scale: 1.02, 
                zIndex: 10,
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
            >
              <Card className="p-4 sm:p-6 h-full hover:shadow-2xl transition-all duration-300 group relative overflow-hidden backdrop-blur-sm" style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #d4c5a9',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transform: 'translateZ(0)'
              }}>
                {/* Subtle highlight effect on hover instead of gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    boxShadow: 'inset 0 0 40px rgba(212, 197, 169, 0.15)'
                  }}
                />
                
                {/* Top accent border */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1.5 rounded-t-2xl group-hover:h-2 transition-all duration-300"
                  style={{ backgroundColor: '#ef5d5e' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                />
                
                <CardContent className="p-0 relative z-10">
                  <motion.h3 
                    className="text-lg sm:text-xl lg:text-2xl font-playfair font-semibold mb-3 sm:mb-4" 
                    style={{ color: '#2c2c2c' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="font-crimson mb-4 sm:mb-6 text-sm sm:text-base" 
                    style={{ color: '#8a8a8a' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4 sm:mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                  >
                    {project.tech.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.2 + 0.6 + techIndex * 0.1 }}
                      >
                        <Badge 
                          variant="secondary"
                          className="font-crimson text-xs hover:scale-105 transition-transform duration-200"
                          style={{ backgroundColor: '#e8dcc8', color: '#2c2c2c' }}
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col gap-2"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full font-crimson transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 rounded-xl"
                        style={{ 
                          backgroundColor: '#ef5d5e', 
                          color: 'white',
                          boxShadow: '0 4px 15px rgba(239, 93, 94, 0.3)'
                        }}
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    </motion.div>
                    
                    {project.live && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          variant="outline"
                          className="w-full font-crimson transition-all duration-300 text-sm sm:text-base py-2 sm:py-3 rounded-xl hover:shadow-lg"
                          style={{ 
                            borderColor: '#ef5d5e', 
                            color: '#ef5d5e', 
                            backgroundColor: 'transparent'
                          }}
                          onClick={() => window.open(project.live, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactSection() {
  const contacts = [
    {
      platform: 'Email',
      value: 'nishatayub702@gmail.com',
      icon: Mail,
      link: 'mailto:nishatayub702@gmail.com',
      color: '#ef5d5e'
    },
    {
      platform: 'GitHub',
      value: 'github.com/nishatayub',
      icon: Github,
      link: 'https://github.com/nishatayub',
      color: '#ef5d5e'
    },
    {
      platform: 'LinkedIn',
      value: 'linkedin.com/in/nishat-ayub',
      icon: Linkedin,
      link: 'https://linkedin.com/in/nishat-ayub',
      color: '#ef5d5e'
    }
  ]

  return (
    <div className="h-screen flex flex-col justify-center px-4 sm:px-8 py-4 sm:py-8 relative overflow-hidden" style={{ backgroundColor: '#f6eee3' }}>
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-5"
        style={{ backgroundColor: '#ef5d5e' }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-5"
        style={{ backgroundColor: '#d4c5a9' }}
        animate={{
          y: [0, 30, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="max-w-4xl mx-auto text-center w-full relative z-10">
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.2
          }}
          className="mb-6 sm:mb-8"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-light mb-2 sm:mb-3 lg:mb-4" 
            style={{ color: '#2c2c2c' }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Get In Touch
          </motion.h2>
          
          <motion.p 
            className="text-xs sm:text-sm md:text-lg lg:text-xl font-crimson" 
            style={{ color: '#8a8a8a' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            Let's work together on your next project
          </motion.p>
          
          {/* Animated subtitle line */}
          <motion.div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: '#ef5d5e' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.platform}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.7,
                delay: index * 0.15 + 0.7,
                ease: "easeOut"
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card 
                className="p-4 sm:p-5 hover:shadow-md transition-all duration-300 group cursor-pointer relative" 
                style={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #d4c5a9',
                  borderRadius: '8px'
                }}
                onClick={() => window.open(contact.link, '_blank')}
              >
                {/* Top accent border */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 rounded-t-lg"
                  style={{ backgroundColor: '#ef5d5e' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                />
                
                <CardContent className="p-0 text-center relative z-10">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#ef5d5e' }}
                  >
                    {React.createElement(contact.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" })}
                  </div>
                  
                  <h3 
                    className="font-playfair font-semibold mb-1 sm:mb-2 text-base sm:text-lg" 
                    style={{ color: '#2c2c2c' }}
                  >
                    {contact.platform}
                  </h3>
                  
                  <p 
                    className="font-crimson text-xs sm:text-sm" 
                    style={{ color: '#8a8a8a' }}
                  >
                    {contact.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-4 sm:mt-6 lg:mt-8"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="sm"
              className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 font-crimson font-semibold tracking-wide rounded-full transition-all duration-500 text-xs sm:text-sm lg:text-base relative overflow-hidden"
              style={{ 
                backgroundColor: '#ef5d5e', 
                color: 'white',
                boxShadow: '0 4px 15px rgba(239, 93, 94, 0.3)'
              }}
              onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nishatayub702@gmail.com&subject=Portfolio%20Inquiry&body=Hello%20Nishat,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0D%0A%0D%0ABest%20regards,', '_blank')}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  width: '30%'
                }}
                animate={{
                  x: ['-30%', '130%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              />
              
              <Mail className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Send Message</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
