import Link from 'next/link'
import { getAllContent } from '@/lib/markdown'

export default function Home() {
  const papers = getAllContent('papers')
  const blogs = getAllContent('blogs')
  
  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Parth K. Thaker
            </Link>
            <div className="flex gap-6">
              <Link href="/papers" className="hover:text-blue-600 transition-colors">
                Papers
              </Link>
              <Link href="/blogs" className="hover:text-green-600 transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Parth K. Thaker
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            Ph.D. Student in Electrical Engineering
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Arizona State University
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="mailto:parneh@gmail.com" className="text-blue-600 hover:underline">
              parneh@gmail.com
            </a>
            <a href="https://twitter.com/ParthKThaker" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              @ParthKThaker
            </a>
            <a href="https://github.com/parththaker" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center">About Me</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I am currently pursuing my Ph.D. in Electrical Engineering at Arizona State University, 
                working with Prof. Gautam Dasarathy on fascinating problems at the intersection of 
                Graph Theory and Optimization.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Research Interests</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Nonconvex Optimization</li>
                    <li>• Graph Theory</li>
                    <li>• Bandit Learning</li>
                    <li>• Reinforcement Learning</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-800">Education</h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <div className="font-medium">Ph.D. Electrical Engineering</div>
                      <div className="text-sm text-gray-600">Arizona State University (2017 - Present)</div>
                    </div>
                    <div>
                      <div className="font-medium">M.Tech Communication</div>
                      <div className="text-sm text-gray-600">IIT Madras (2016)</div>
                    </div>
                    <div>
                      <div className="font-medium">B.Tech Electrical Engineering</div>
                      <div className="text-sm text-gray-600">IIT Madras (2015)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Professional Experience</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">Summer Intern - Algorithms</h3>
                <span className="text-gray-500 text-sm">May 2022 - Aug 2022</span>
              </div>
              <p className="text-blue-600 font-medium mb-2">Mitsubishi Electric Research Laboratories</p>
              <p className="text-gray-700">
                Worked on the intersection of Robotics and Bandits for solving resource monitoring problems.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">Systems Engineer</h3>
                <span className="text-gray-500 text-sm">Sep 2016 - May 2017</span>
              </div>
              <p className="text-blue-600 font-medium mb-2">NetraDyne</p>
              <p className="text-gray-700">
                Worked on using sensor information from mobile devices/IMU chips to analyze driving behavior 
                and develop better driver safety features.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">Summer Research Intern</h3>
                <span className="text-gray-500 text-sm">May 2015 - Aug 2015</span>
              </div>
              <p className="text-blue-600 font-medium mb-2">Indian Institute of Science (IISc)</p>
              <p className="text-gray-700">
                Worked on understanding the behavior of linear Bandit algorithms in perturbed scenarios. 
                Developed learning algorithms for multi-user bandwidth sharing setups.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">Summer Intern</h3>
                  <span className="text-gray-500 text-sm">May 2014 - Jul 2014</span>
                </div>
                <p className="text-blue-600 font-medium mb-2">Securifi Embedded Systems</p>
                <p className="text-gray-700 text-sm">
                  Database performance analysis and cloud automation using Cloud-init and Puppet.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">Engineering Intern</h3>
                  <span className="text-gray-500 text-sm">May 2013 - Jul 2013</span>
                </div>
                <p className="text-blue-600 font-medium mb-2">Cisco</p>
                <p className="text-gray-700 text-sm">
                  Created DHCP client testing tools for BNG session controllers with high call rates.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Research Papers</h2>
            <p className="text-gray-700 mb-6">
              Explore my published works, including arXiv preprints and peer-reviewed papers. 
              Each paper includes my personal insights on what made it exciting.
            </p>
            <div className="mb-6">
              <span className="text-sm text-gray-600">{papers.length} papers available</span>
            </div>
            <Link 
              href="/papers"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Papers →
            </Link>
          </div>

          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Blog Posts</h2>
            <p className="text-gray-700 mb-6">
              My thoughts on research trends, paper reviews, and insights from the field. 
              A space for more informal discussions and explorations.
            </p>
            <div className="mb-6">
              <span className="text-sm text-gray-600">{blogs.length} posts available</span>
            </div>
            <Link 
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Read Blog →
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Get Started</h3>
          <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-gray-700 mb-4">
              This website automatically renders content from markdown files. To add your content:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">For Papers:</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Add <code className="bg-gray-200 px-1 rounded">.md</code> files to{' '}
                  <code className="bg-gray-200 px-1 rounded">content/papers/</code>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For Blog Posts:</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Add <code className="bg-gray-200 px-1 rounded">.md</code> files to{' '}
                  <code className="bg-gray-200 px-1 rounded">content/blogs/</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
