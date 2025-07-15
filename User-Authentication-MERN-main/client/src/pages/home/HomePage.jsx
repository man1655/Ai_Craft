import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaCircle, FaInfoCircle, FaRocket, FaCheckCircle, FaStar, FaUsers, FaDownload, FaCog } from "react-icons/fa";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  


  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log(
          "Printing from Home Page there was a error ->",
          error.message
        );
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
    if (user) {
      console.log("Printing from Homepage User is There ");
      navigate("/dashboard");
    } else {
      console.log("Printing for Homepage User Not Found");
      navigate("/dashboard");
    }
  };

  const features = [
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description: "Leverage advanced AI to create compelling resume content tailored to your industry and role."
    },
    {
      icon: <FaCog className="w-6 h-6" />,
      title: "Smart Customization",
      description: "Intelligent templates that adapt to your experience level and career objectives."
    },
    {
      icon: <FaDownload className="w-6 h-6" />,
      title: "Multiple Formats",
      description: "Export your resume in various formats including PDF, Word, and more."
    }
  ];

  const stats = [
    { number: "10K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9", label: "User Rating" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 pt-16 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-100/10 to-blue-100/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50/80 to-purple-50/80 px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-blue-200/30 mb-8 backdrop-blur-sm">
              <FaStar className="w-4 h-4 mr-2 text-yellow-500" />
              #1 AI Resume Builder - Professional Grade
            </div>

            {/* Main Heading */}
            <h1 className="mb-8 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              <span className="block">Create Your</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Perfect Resume
              </span>
              <span className="block">in Minutes</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-8 text-gray-600">
              Harness the power of AI to build professional resumes that get noticed. 
              Stand out from the competition with intelligent design and compelling content.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-16">
              <button
                onClick={hadnleGetStartedClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                <FaRocket className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                Get Started Free
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity -z-10"></div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-purple-500/20 rounded-3xl blur-3xl transform rotate-1"></div>
              <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl ring-1 ring-gray-900/10">
                {/* Browser Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-400 to-purple-500">
                  <div className="flex space-x-2">
                    <FaCircle className="w-3 h-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer" />
                    <FaCircle className="w-3 h-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer" />
                    <FaCircle className="w-3 h-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer" />
                  </div>
                  <div className="text-white/90 text-sm font-medium">AI Resume Builder</div>
                  <FaInfoCircle className="w-4 h-4 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer" />
                </div>
                
                {/* Screenshot */}
                <div className="p-2 bg-gray-50">
                  <img
                    className="w-full h-auto rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                    src={heroSnapshot}
                    alt="AI Resume Builder Dashboard"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              Why Choose Our AI Resume Builder?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the future of resume creation with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            

      {/* Footer */}
      <footer className="bg-gradient-to-t from-white to-gray-50/30 border-t border-gray-200/50">
        <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500">
                &copy; 2025 Ai-Resume-Builder. All rights reserved. Man Patel
              </p>
              <div className="flex items-center space-x-1">
                <FaCheckCircle className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;