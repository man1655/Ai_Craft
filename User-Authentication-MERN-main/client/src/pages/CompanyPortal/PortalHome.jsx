import React, { useState, useRef } from 'react';
import { Search, Upload, MapPin, Users, Calendar, Star, Building2, Filter, X, FileText, CheckCircle, Clock, Briefcase } from 'lucide-react';

const PortalHome = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "🚀",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: "1000-5000",
      founded: 2015,
      rating: 4.5,
      description: "Leading software development company specializing in AI and machine learning solutions.",
      openPositions: 15,
      benefits: ["Health Insurance", "Remote Work", "Stock Options", "Learning Budget"]
    },
    {
      id: 2,
      name: "Green Energy Corp",
      logo: "🌱",
      industry: "Energy",
      location: "Austin, TX",
      employees: "500-1000",
      founded: 2018,
      rating: 4.3,
      description: "Renewable energy solutions provider focused on solar and wind power technologies.",
      openPositions: 8,
      benefits: ["Health Insurance", "401k Match", "Flexible Hours", "Gym Membership"]
    },
    {
      id: 3,
      name: "FinanceFlow",
      logo: "💳",
      industry: "Finance",
      location: "New York, NY",
      employees: "2000-10000",
      founded: 2012,
      rating: 4.2,
      description: "Innovative fintech company providing digital banking and payment solutions.",
      openPositions: 22,
      benefits: ["Health Insurance", "Bonus Program", "Stock Options", "Commuter Benefits"]
    },
    {
      id: 4,
      name: "HealthTech Innovations",
      logo: "⚕️",
      industry: "Healthcare",
      location: "Boston, MA",
      employees: "100-500",
      founded: 2020,
      rating: 4.6,
      description: "Digital health platform revolutionizing patient care through technology.",
      openPositions: 12,
      benefits: ["Health Insurance", "Remote Work", "Professional Development", "Wellness Program"]
    },
    {
      id: 5,
      name: "EduLearn Platform",
      logo: "📚",
      industry: "Education",
      location: "Seattle, WA",
      employees: "200-500",
      founded: 2019,
      rating: 4.4,
      description: "Online learning platform providing courses for professional development.",
      openPositions: 6,
      benefits: ["Health Insurance", "Learning Credits", "Flexible Schedule", "Team Retreats"]
    },
    {
      id: 6,
      name: "RetailNext",
      logo: "🛍️",
      industry: "Retail",
      location: "Los Angeles, CA",
      employees: "5000+",
      founded: 2010,
      rating: 4.1,
      description: "Modern retail technology company transforming shopping experiences.",
      openPositions: 18,
      benefits: ["Health Insurance", "Employee Discount", "Career Growth", "Flexible PTO"]
    }
  ];

  const jobMatches = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      match: 95,
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      skills: ["React", "Node.js", "Python", "AWS"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "HealthTech Innovations",
      match: 88,
      location: "Boston, MA",
      salary: "$100k - $130k",
      type: "Full-time",
      skills: ["JavaScript", "React", "MongoDB", "Express"]
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "EduLearn Platform",
      match: 82,
      location: "Seattle, WA",
      salary: "$90k - $120k",
      type: "Full-time",
      skills: ["React", "TypeScript", "CSS", "Next.js"]
    }
  ];

  const industries = ["all", "Technology", "Finance", "Healthcare", "Education", "Energy", "Retail"];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setIsAnalyzing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setResumeUploaded(true);
        setMatchedJobs(jobMatches);
        setIsAnalyzing(false);
        setShowMatches(true);
      }, 3000);
    }
  };

  const getMatchColor = (match) => {
    if (match >= 90) return 'text-green-600 bg-green-100';
    if (match >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CompanyHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Upload className="h-4 w-4" />
                  <span>{resumeUploaded ? 'Resume Uploaded' : 'Upload Resume'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resume Status & Job Matches */}
        {isAnalyzing && (
          <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-indigo-600 animate-spin" />
              <div>
                <h3 className="text-lg font-semibold text-indigo-900">Analyzing Your Resume</h3>
                <p className="text-indigo-700">Our AI is matching your skills with available positions...</p>
              </div>
            </div>
          </div>
        )}

        {showMatches && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-green-900">Job Matches Found!</h3>
              </div>
              <button
                onClick={() => setShowMatches(false)}
                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {matchedJobs.map((job) => (
                <div key={job.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(job.match)}`}>
                      {job.match}% Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Briefcase className="h-3 w-3 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-indigo-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search companies, locations, or industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-indigo-500" />
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="border border-indigo-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry === 'all' ? 'All Industries' : industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-indigo-100 hover:border-indigo-200 group"
              onClick={() => setSelectedCompany(company)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-200">{company.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">{company.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium">{company.industry}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{company.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-400" />
                    {company.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-indigo-400" />
                    {company.employees} employees
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
                    Founded {company.founded}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-indigo-100">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{company.rating}</span>
                  </div>
                  <div className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
                    {company.openPositions} open positions
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-indigo-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedCompany.logo}</div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{selectedCompany.name}</h2>
                    <p className="text-indigo-600 font-medium">{selectedCompany.industry}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Company Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-indigo-400" />
                      {selectedCompany.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-indigo-400" />
                      {selectedCompany.employees} employees
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-indigo-400" />
                      Founded {selectedCompany.founded}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                      {selectedCompany.rating} rating
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.benefits.map((benefit, index) => (
                      <span key={index} className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm rounded-full border border-indigo-200">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{selectedCompany.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-indigo-600">
                  {selectedCompany.openPositions} Open Positions
                </div>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                  View Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalHome;