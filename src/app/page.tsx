import Link from 'next/link'
import Image from 'next/image'
import { getAllContent } from '@/lib/markdown'
import NetworkBackground from '@/components/NetworkBackground'
import CursorTracker from '@/components/CursorTracker'

export default function Home() {
  const papers = getAllContent('papers')
  const blogs = getAllContent('blogs')
  
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CursorTracker />
      <NetworkBackground />
      
      <nav className="relative z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Parth K. Thaker
            </Link>
            <div className="flex gap-8">
              <Link href="/papers" className="relative group">
                <span className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Papers
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/blogs" className="relative group">
                <span className="text-slate-700 hover:text-orange-600 transition-colors duration-300 font-medium">
                  Blog
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="/hobbies" className="relative group">
                <span className="text-slate-700 hover:text-green-600 transition-colors duration-300 font-medium">
                  Hobbies
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Split Layout */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center min-h-[80vh]">
            
            {/* Left Side - Photo and Contact */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative">
                {/* Professional Profile Photo */}
                <div className="relative w-64 h-64 mx-auto">
                  {/* Subtle geometric frame */}
                  <div className="absolute inset-0">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-400 to-transparent"></div>
                      <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-slate-400 to-transparent"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8">
                      <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-slate-400 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-slate-400 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-8 h-8">
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-400 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-slate-400 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8">
                      <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-slate-400 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-slate-400 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Main photo container */}
                  <div className="relative w-56 h-56 mx-auto mt-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 p-2 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
                      <Image
                        src="/profile_photo.png"
                        alt="Parth K. Thaker - AI Research Engineer at Intuitive Surgical, Ph.D. in Electrical Engineering"
                        width={224}
                        height={224}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 text-center">Connect</h3>
                <div className="flex justify-center gap-4">
                  <a 
                    href="mailto:parneh@gmail.com" 
                    className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                    title="Email"
                  >
                    <svg className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/parththaker1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6 text-slate-600 group-hover:text-blue-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://twitter.com/ParthKThaker" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                    title="Twitter"
                  >
                    <svg className="w-6 h-6 text-slate-600 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://github.com/parththaker" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                    title="GitHub"
                  >
                    <svg className="w-6 h-6 text-slate-600 group-hover:text-slate-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold gradient-text leading-tight">
                  Parth K. Thaker
                </h1>
                
                <div className="space-y-4">
                  <p className="text-2xl text-slate-600 font-medium">
                    AI Research Engineer
                  </p>
                  <p className="text-lg text-slate-500">
                    Intuitive Surgical | Ph.D. in Electrical Engineering
                  </p>
                </div>
                
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                
                <p className="text-xl text-slate-700 leading-relaxed max-w-2xl">
                  <span className="font-semibold text-green-600">AI Research Engineer</span> at <span className="font-semibold text-blue-600">Intuitive Surgical</span>, 
                  where I craft secure and privacy-safe LLM workflows that make humans more productive (and occasionally wonder if the robots will thank me later 🤖). 
                  From document-whispering chatbots to security-paranoid AI analyzers, I&apos;m building the future of developer productivity—one algorithm at a time.
                </p>
              </div>

              {/* Research Interests */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-700">Research Interests</h3>
                <div className="space-y-3">
                  {[
                    { name: "Nonconvex Optimization", desc: "Developing algorithms for complex optimization landscapes" },
                    { name: "Graph Theory", desc: "Mathematical foundations and algorithmic applications" },
                    { name: "Bandit Learning", desc: "Sequential decision making under uncertainty" },
                    { name: "Reinforcement Learning", desc: "Learning optimal policies through interaction" }
                  ].map((interest) => (
                    <div 
                      key={interest.name}
                      className="p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200 hover:bg-white/80 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">{interest.name}</h4>
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{interest.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education & Experience Section */}
      <div className="relative z-10 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Education */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold gradient-text">Education</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-indigo-500"></div>
                
                <div className="space-y-8">
                  {[
                    { 
                      degree: "Ph.D. Electrical Engineering", 
                      school: "Arizona State University", 
                      year: "May 2024", 
                      desc: "Dissertation on Graph Theory and Optimization under Prof. Gautam Dasarathy",
                      location: "Phoenix, AZ",
                      type: "doctorate"
                    },
                    { 
                      degree: "M.Tech Communication", 
                      school: "IIT Madras", 
                      year: "2016", 
                      desc: "Specialized in communication systems and signal processing",
                      location: "Chennai, India",
                      type: "masters"
                    },
                    { 
                      degree: "B.Tech Electrical Engineering", 
                      school: "IIT Madras", 
                      year: "2015", 
                      desc: "Foundation in electrical engineering and mathematical optimization",
                      location: "Chennai, India",
                      type: "bachelors"
                    }
                  ].map((edu, index) => (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline node */}
                      <div className={`relative z-10 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                        edu.type === 'doctorate' ? 'bg-green-500' :
                        edu.type === 'masters' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}></div>
                      
                      {/* Education card */}
                      <div className="flex-1 network-card p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-slate-800 text-lg">{edu.degree}</h3>
                              <p className="text-blue-600 font-semibold">{edu.school}</p>
                              <p className="text-slate-500 text-sm">{edu.location}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              edu.type === 'doctorate' ? 'bg-green-100 text-green-700' :
                              edu.type === 'masters' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                            }`}>
                              {edu.year}
                            </div>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{edu.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Professional Experience Timeline */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold gradient-text">Professional Experience</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500"></div>
                
                <div className="space-y-8">
                  {[
                    { 
                      role: "AI Research Engineer", 
                      company: "Intuitive Surgical", 
                      year: "Jul 2024 - Present", 
                      desc: "Developing secure and privacy-safe LLM workflows for enhanced worker productivity. Built document + image chatbots, security analyzers for LLM models, and LLM + CI/CD integration tools for developer productivity.",
                      location: "Sunnyvale, CA",
                      type: "current"
                    },
                    { 
                      role: "Summer Intern - Algorithms", 
                      company: "Mitsubishi Electric Research Labs", 
                      year: "May 2022 - Aug 2022", 
                      desc: "Worked on the intersection of Robotics and Bandits for solving resource monitoring problems.",
                      location: "Boston, MA",
                      type: "internship"
                    },
                    { 
                      role: "Systems Engineer", 
                      company: "NetraDyne", 
                      year: "Sep 2016 - May 2017", 
                      desc: "Developed driver safety features using sensor information from mobile devices and IMU chips to analyze driving behavior.",
                      location: "Bengaluru, India",
                      type: "fulltime"
                    },
                    { 
                      role: "Summer Research Intern", 
                      company: "Indian Institute of Science (IISc)", 
                      year: "May 2015 - Aug 2015", 
                      desc: "Researched linear Bandit algorithms in perturbed scenarios and developed learning algorithms for multi-user bandwidth sharing.",
                      location: "Bangalore, India",
                      type: "research"
                    },
                    { 
                      role: "Summer Intern", 
                      company: "Securifi Embedded Systems", 
                      year: "May 2014 - Jul 2014", 
                      desc: "Database performance analysis and cloud automation using Cloud-init and Puppet.",
                      location: "Hyderabad, India",
                      type: "internship"
                    },
                    { 
                      role: "Engineering Intern", 
                      company: "Cisco Systems", 
                      year: "May 2013 - Jul 2013", 
                      desc: "Created DHCP client testing tools for BNG session controllers with high call rates for 1M+ subscriber sessions.",
                      location: "Bangalore, India",
                      type: "internship"
                    }
                  ].map((exp, index) => (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline node */}
                      <div className={`relative z-10 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                        exp.type === 'current' ? 'bg-green-500' :
                        exp.type === 'research' ? 'bg-purple-500' :
                        exp.type === 'fulltime' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}></div>
                      
                      {/* Experience card */}
                      <div className="flex-1 network-card p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-slate-800 text-lg">{exp.role}</h3>
                              <p className="text-blue-600 font-semibold">{exp.company}</p>
                              <p className="text-slate-500 text-sm">{exp.location}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              exp.type === 'current' ? 'bg-green-100 text-green-700' :
                              exp.type === 'research' ? 'bg-purple-100 text-purple-700' :
                              exp.type === 'fulltime' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
                            }`}>
                              {exp.year}
                            </div>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{exp.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Research & Blog Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">Research & Insights</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Exploring ideas, sharing discoveries, and connecting thoughts in the world of research
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Papers Section */}
            <div className="network-card p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Research Papers</h3>
                    <p className="text-blue-600 font-medium">{papers.length} papers available</p>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed">
                  Published works including arXiv preprints and peer-reviewed papers. 
                  Each includes my personal insights on what made the research exciting and impactful.
                </p>
                
                <Link 
                  href="/papers"
                  className="group inline-flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <span className="font-medium">Explore Papers</span>
                  <div className="w-5 h-5 group-hover:translate-x-1 transition-transform">→</div>
                </Link>
              </div>
            </div>

            {/* Blog Section */}
            <div className="network-card p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white rounded-lg"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Blog Posts</h3>
                    <p className="text-orange-600 font-medium">{blogs.length} posts available</p>
                  </div>
                </div>
                
                <p className="text-slate-700 leading-relaxed">
                  Thoughts on research trends, paper reviews, and insights from the field. 
                  A space for informal discussions and explorations of emerging ideas.
                </p>
                
                <Link 
                  href="/blogs"
                  className="group inline-flex items-center gap-3 px-6 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <span className="font-medium">Read Blog</span>
                  <div className="w-5 h-5 group-hover:translate-x-1 transition-transform">→</div>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
