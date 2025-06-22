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
    
    setIsScrolling(true)
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
    } else if (e.deltaY < 0 && currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
    
    setTimeout(() => setIsScrolling(false), 800)
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
      case 'hero': return <HeroSection />
      case 'about': return <AboutSection />
      case 'skills': return <SkillsSection />
      case 'projects': return <ProjectsSection />
      case 'contact': return <ContactSection />
      default: return <HeroSection />
    }
  }

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: '#f6eee3' }}>
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentSection 
                ? 'scale-125 shadow-lg' 
                : 'hover:scale-110'
            }`}
            style={{ 
              backgroundColor: index === currentSection ? '#ef5d5e' : '#d4c5a9',
              boxShadow: index === currentSection ? '0 4px 15px rgba(239, 93, 94, 0.3)' : 'none'
            }}
            title={section.name}
          />
        ))}
      </div>

      {/* Section Indicator */}
      <div className="fixed top-8 left-8 z-50">
        <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full" style={{ border: '1px solid #d4c5a9' }}>
          {React.createElement(sections[currentSection].icon, { 
            className: "w-4 h-4", 
            style: { color: '#ef5d5e' }
          })}
          <span className="text-sm font-medium font-crimson" style={{ color: '#2c2c2c' }}>
            {sections[currentSection].name}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: '#e8dcc8' }}>
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.1, 0.25, 1]
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

function HeroSection() {
  return (
    <div className="h-full flex items-center justify-center px-8 relative" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Navigation */}
        <motion.div 
          className="absolute -top-16 left-0 right-0 flex justify-between items-center text-sm font-crimson"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-semibold tracking-wider" style={{ color: '#ef5d5e' }}>
            NISHAT AYUB
          </span>
          <span className="cursor-pointer hover:opacity-70 transition-opacity" style={{ color: '#8a8a8a' }}>
            CONTACT ME
          </span>
        </motion.div>

        {/* Main Hero Content */}
        <div className="text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-8xl md:text-9xl font-playfair font-light leading-none mb-6" style={{ color: '#2c2c2c' }}>
              Hello
            </h1>
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="h-px flex-1" style={{ backgroundColor: '#d4c5a9' }}></div>
              <p className="text-xl font-crimson text-center max-w-md" style={{ color: '#8a8a8a' }}>
                I'm a Full Stack Developer creating beautiful digital experiences
              </p>
              <div className="h-px flex-1" style={{ backgroundColor: '#d4c5a9' }}></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-6"
          >
            <Button 
              className="px-8 py-3 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: '#ef5d5e', 
                color: 'white',
                border: 'none'
              }}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-3 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300"
              style={{ 
                borderColor: '#ef5d5e', 
                color: '#ef5d5e',
                backgroundColor: 'transparent'
              }}
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="h-full flex items-center justify-center px-8" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-playfair font-light mb-8" style={{ color: '#2c2c2c' }}>
            About Me
          </h2>
          <div className="prose prose-lg mx-auto font-crimson" style={{ color: '#8a8a8a' }}>
            <p className="text-xl leading-relaxed mb-6">
              I'm a passionate Full Stack Developer with expertise in modern web technologies. 
              I love creating digital experiences that are both beautiful and functional.
            </p>
            <p className="text-lg leading-relaxed">
              With a strong foundation in the MERN stack and a keen eye for design, 
              I bridge the gap between technical excellence and aesthetic appeal.
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
    <div className="h-full flex items-center justify-center px-8" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-playfair font-light mb-4" style={{ color: '#2c2c2c' }}>
            Skills
          </h2>
          <p className="text-xl font-crimson" style={{ color: '#8a8a8a' }}>
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: 'white', border: '1px solid #d4c5a9' }}>
                <CardContent className="p-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-crimson font-semibold" style={{ color: '#2c2c2c' }}>
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
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: '#ef5d5e' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                  <p className="text-sm mt-2 font-crimson" style={{ color: '#8a8a8a' }}>
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
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack MERN application with payment integration',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates',
      tech: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
      link: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'Responsive portfolio with smooth animations',
      tech: ['React', 'Framer Motion', 'Tailwind CSS'],
      link: '#'
    }
  ]

  return (
    <div className="h-full flex items-center justify-center px-8" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-playfair font-light mb-4" style={{ color: '#2c2c2c' }}>
            Projects
          </h2>
          <p className="text-xl font-crimson" style={{ color: '#8a8a8a' }}>
            Some of my recent work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group" style={{ backgroundColor: 'white', border: '1px solid #d4c5a9' }}>
                <CardContent className="p-0">
                  <h3 className="text-xl font-playfair font-semibold mb-3" style={{ color: '#2c2c2c' }}>
                    {project.title}
                  </h3>
                  <p className="font-crimson mb-4" style={{ color: '#8a8a8a' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
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
                  <Button 
                    className="w-full font-crimson group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: '#ef5d5e', color: 'white' }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Project
                  </Button>
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
      value: 'nishatayub@example.com',
      icon: Mail,
      link: 'mailto:nishatayub@example.com'
    },
    {
      platform: 'GitHub',
      value: 'github.com/nishatayub',
      icon: Github,
      link: 'https://github.com/nishatayub'
    },
    {
      platform: 'LinkedIn',
      value: 'linkedin.com/in/nishatayub',
      icon: Linkedin,
      link: 'https://linkedin.com/in/nishatayub'
    }
  ]

  return (
    <div className="h-full flex items-center justify-center px-8" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-6xl font-playfair font-light mb-4" style={{ color: '#2c2c2c' }}>
            Get In Touch
          </h2>
          <p className="text-xl font-crimson" style={{ color: '#8a8a8a' }}>
            Let's work together on your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.platform}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer" style={{ backgroundColor: 'white', border: '1px solid #d4c5a9' }}>
                <CardContent className="p-0 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#ef5d5e' }}>
                    {React.createElement(contact.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <h3 className="font-playfair font-semibold mb-2" style={{ color: '#2c2c2c' }}>
                    {contact.platform}
                  </h3>
                  <p className="font-crimson text-sm" style={{ color: '#8a8a8a' }}>
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
          className="mt-12"
        >
          <Button 
            size="lg" 
            className="px-8 py-4 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: '#ef5d5e', color: 'white' }}
          >
            Send Message
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
