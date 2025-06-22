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
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault()
    
    if (isScrolling) return
    
    // Increase threshold for scroll sensitivity
    const scrollThreshold = 50
    if (Math.abs(e.deltaY) < scrollThreshold) return
    
    setIsScrolling(true)
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
    } else if (e.deltaY < 0 && currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
    
    setTimeout(() => setIsScrolling(false), 500)
  }, [currentSection, isScrolling])

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [handleScroll])

  const navigateToSection = (index: number) => {
    if (!isScrolling) {
      setCurrentSection(index)
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
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.1, 0.25, 1],
            opacity: { duration: 0.3 },
            scale: { duration: 0.4 }
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
        initial={{ opacity: 1 }}
        animate={{ opacity: currentSection === 0 ? 1 : 0 }}
      >
        Scroll to navigate
      </motion.div>
    </div>
  )
}

function HeroSection({ onNavigate }: { onNavigate: (index: number) => void }) {
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
                  <span>22 June</span>
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
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Nishat
                </motion.h1>
                <motion.h1 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-light leading-none"
                  style={{ color: '#ef5d5e' }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Ayub
                </motion.h1>
              </div>

              {/* Description Paragraph */}
              <motion.div 
                className="max-w-lg mb-4 sm:mb-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
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
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-light mb-4 sm:mb-6 lg:mb-8" style={{ color: '#2c2c2c' }}>
            About Me
          </h2>
          <div className="prose prose-lg mx-auto font-crimson" style={{ color: '#8a8a8a' }}>
            <p className="text-sm sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-4 lg:mb-6">
              I'm a passionate Full Stack Developer from India with expertise in modern web technologies. 
              I love building robust applications and solving complex technical challenges.
            </p>
            <p className="text-xs sm:text-base md:text-lg leading-relaxed">
              With a strong foundation in the MERN stack, 
              I focus on creating scalable solutions with clean code and efficient architecture. 
              While UI/UX is part of my skillset, my main expertise lies in technical development roles.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function SkillsSection() {
  const skills = [
    { name: 'MongoDB', category: 'Database', level: 85 },
    { name: 'Express.js', category: 'Backend', level: 90 },
    { name: 'React', category: 'Frontend', level: 95 },
    { name: 'Node.js', category: 'Backend', level: 88 },
    { name: 'Python', category: 'Programming', level: 82 },
    { name: 'C++', category: 'Programming', level: 75 },
    { name: 'Tailwind CSS', category: 'Styling', level: 92 },
    { name: 'Figma', category: 'Design', level: 85 },
    { name: 'Framer Motion', category: 'Animation', level: 80 }
  ]

  return (
    <div className="h-screen flex flex-col justify-center px-4 sm:px-8 py-4 sm:py-8 overflow-y-auto" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-light mb-2 sm:mb-3" style={{ color: '#2c2c2c' }}>
            Skills
          </h2>
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-crimson" style={{ color: '#8a8a8a' }}>
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 max-h-[60vh] overflow-y-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: 'white', border: '1px solid #d4c5a9' }}>
                <CardContent className="p-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-crimson font-semibold text-xs sm:text-sm lg:text-base" style={{ color: '#2c2c2c' }}>
                      {skill.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="font-crimson text-xs"
                      style={{ backgroundColor: '#e8dcc8', color: '#2c2c2c' }}
                    >
                      {skill.category}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 sm:h-2">
                    <motion.div
                      className="h-1 sm:h-2 rounded-full"
                      style={{ backgroundColor: '#ef5d5e' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                  <p className="text-xs sm:text-sm mt-1 sm:mt-2 font-crimson" style={{ color: '#8a8a8a' }}>
                    {skill.level}%
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
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
      title: 'ChattIe',
      description: 'A modern frontend UI for real-time messaging with Socket.io integration, featuring a sleek chat interface and responsive design',
      tech: ['React', 'Express.js', 'Socket.io', 'MongoDB'],
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
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-light mb-2 sm:mb-3" style={{ color: '#2c2c2c' }}>
            Projects
          </h2>
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-crimson" style={{ color: '#8a8a8a' }}>
            Some of my recent work
          </p>
        </motion.div>

        {/* Project Navigation Buttons - Only show if not all projects fit */}
        {maxScrollIndex > 0 && (
          <div className="flex justify-center items-center gap-4 mb-4 sm:mb-6">
            <button
              onClick={prevProject}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: '#ef5d5e', color: 'white' }}
            >
              ←
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxScrollIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setScrollIndex(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === scrollIndex ? 'scale-125' : ''
                  }`}
                  style={{ 
                    backgroundColor: index === scrollIndex ? '#ef5d5e' : '#d4c5a9'
                  }}
                />
              ))}
            </div>
            <button
              onClick={nextProject}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
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
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-4 sm:p-6 h-full hover:shadow-xl transition-all duration-300 group" style={{ backgroundColor: 'white', border: '1px solid #d4c5a9' }}>
                <CardContent className="p-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-playfair font-semibold mb-3 sm:mb-4" style={{ color: '#2c2c2c' }}>
                    {project.title}
                  </h3>
                  <p className="font-crimson mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: '#8a8a8a' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className="font-crimson text-xs"
                        style={{ backgroundColor: '#e8dcc8', color: '#2c2c2c' }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      className="w-full font-crimson group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base py-2 sm:py-3"
                      style={{ backgroundColor: '#ef5d5e', color: 'white' }}
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    {project.live && (
                      <Button 
                        variant="outline"
                        className="w-full font-crimson group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base py-2 sm:py-3"
                        style={{ borderColor: '#ef5d5e', color: '#ef5d5e', backgroundColor: 'transparent' }}
                        onClick={() => window.open(project.live, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
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
      link: 'mailto:nishatayub702@gmail.com'
    },
    {
      platform: 'GitHub',
      value: 'github.com/nishatayub',
      icon: Github,
      link: 'https://github.com/nishatayub'
    },
    {
      platform: 'LinkedIn',
      value: 'linkedin.com/in/nishat-ayub',
      icon: Linkedin,
      link: 'https://linkedin.com/in/nishat-ayub'
    }
  ]

  return (
    <div className="h-screen flex flex-col justify-center px-4 sm:px-8 py-4 sm:py-8" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-4xl mx-auto text-center w-full">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-light mb-2 sm:mb-3 lg:mb-4" style={{ color: '#2c2c2c' }}>
            Get In Touch
          </h2>
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-crimson" style={{ color: '#8a8a8a' }}>
            Let's work together on your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.platform}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card 
                className="p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer" 
                style={{ backgroundColor: 'white', border: '1px solid #d4c5a9' }}
                onClick={() => window.open(contact.link, '_blank')}
              >
                <CardContent className="p-0 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#ef5d5e' }}>
                    {React.createElement(contact.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" })}
                  </div>
                  <h3 className="font-playfair font-semibold mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg" style={{ color: '#2c2c2c' }}>
                    {contact.platform}
                  </h3>
                  <p className="font-crimson text-xs sm:text-sm" style={{ color: '#8a8a8a' }}>
                    {contact.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 sm:mt-6 lg:mt-8"
        >
          <Button 
            size="sm"
            className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
            style={{ backgroundColor: '#ef5d5e', color: 'white' }}
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nishatayub702@gmail.com&subject=Portfolio%20Inquiry&body=Hello%20Nishat,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0D%0A%0D%0ABest%20regards,', '_blank')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
