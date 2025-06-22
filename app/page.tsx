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

function HeroSection() {
  return (
    <div className="h-full flex items-center px-8 relative" style={{ backgroundColor: '#f6eee3' }}>
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Navigation */}
        <motion.div 
          className="absolute top-8 left-0 right-0 flex justify-between items-center text-sm font-crimson z-10 px-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-6">
            <span className="font-semibold tracking-wider" style={{ color: '#ef5d5e' }}>
              NISHAT AYUB
            </span>
          </div>
          <span className="cursor-pointer hover:opacity-70 transition-opacity" style={{ color: '#8a8a8a' }}>
            CONTACT ME
          </span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh] mt-8">
          {/* Left Column - Main Typography */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Small Labels */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className="flex items-center gap-2 text-sm font-crimson"
                  style={{ color: '#8a8a8a' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef5d5e' }}></div>
                  <span>22 June</span>
                </motion.div>
                <motion.span 
                  className="text-sm font-crimson"
                  style={{ color: '#8a8a8a' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Available for work
                </motion.span>
              </div>

              {/* Large Creative Developer Text */}
              <div className="mb-8">
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-playfair font-light leading-none"
                  style={{ color: '#ef5d5e' }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Creative
                </motion.h1>
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-playfair font-light leading-none"
                  style={{ color: '#ef5d5e' }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Developer
                </motion.h1>
              </div>

              {/* Description Paragraph */}
              <motion.div 
                className="max-w-lg mb-12"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <p className="text-base font-crimson leading-relaxed" style={{ color: '#8a8a8a' }}>
                  I AM A DEVELOPER AND FULL STACK ENGINEER BASED IN INDIA. 
                  I SPECIALIZE IN CREATING ROBUST WEB APPLICATIONS. 
                  MY EXPERTISE FOCUSES ON TECHNICAL DEVELOPMENT WITH THE MERN STACK.
                </p>
              </motion.div>

              {/* Large Designer Text at Bottom */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-light" style={{ color: '#ef5d5e' }}>
                  Developer
                </h2>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Image Space and Labels */}
          <div className="lg:col-span-5 flex flex-col items-end">
            <motion.div 
              className="text-right mb-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-sm font-crimson mb-2" style={{ color: '#8a8a8a' }}>Developer</div>
              <div className="text-sm font-crimson mb-2" style={{ color: '#8a8a8a' }}>MERN Stack</div>
              <div className="text-sm font-crimson" style={{ color: '#8a8a8a' }}>India</div>
            </motion.div>

            {/* Picture Placeholder - Big Cutout Style */}
            <motion.div 
              className="w-72 h-96 border-2 flex items-center justify-center mb-8 relative overflow-hidden"
              style={{ 
                borderColor: '#d4c5a9',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '20px'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Cutout Effect Background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(239, 93, 94, 0.1) 0%, 
                    rgba(246, 238, 227, 0.3) 50%, 
                    rgba(212, 197, 169, 0.2) 100%)`
                }}
              />
              <div className="text-center relative z-10">
                <div className="text-5xl mb-6">�</div>
                <p className="font-crimson text-sm px-4" style={{ color: '#8a8a8a' }}>
                  Your Professional Photo<br/>
                  <span className="text-xs">(Cutout style recommended)<br/>Ideal size: 400x600px</span>
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex gap-4"
            >
              <Button 
                className="px-6 py-3 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300"
                style={{ 
                  backgroundColor: '#ef5d5e', 
                  color: 'white',
                  border: 'none'
                }}
              >
                View Projects
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-3 font-crimson font-semibold tracking-wide rounded-full hover:shadow-lg transition-all duration-300"
                style={{ 
                  borderColor: '#ef5d5e', 
                  color: '#ef5d5e',
                  backgroundColor: 'transparent'
                }}
              >
                Download CV
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
              I'm a passionate Full Stack Developer from India with expertise in modern web technologies. 
              I love building robust applications and solving complex technical challenges.
            </p>
            <p className="text-lg leading-relaxed">
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
      title: 'CodeUnity',
      description: 'A web-based collaborative IDE where developers can code together in real-time, share projects, and learn from each other',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      link: 'https://codeunity.com'
    },
    {
      title: 'ChattIe',
      description: 'Real-time messaging application with modern UI and seamless communication',
      tech: ['React', 'Express.js', 'Socket.io', 'MongoDB'],
      link: 'https://chattie.com'
    },
    {
      title: 'Affirmo',
      description: 'Personal development platform for tracking daily affirmations, habits, and goals with progress analytics',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://affirmo.com'
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
                    onClick={() => window.open(project.link, '_blank')}
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
