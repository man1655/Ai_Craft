import React, { useState, useEffect, useContext } from "react";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Nave() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, userData, backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-slate-800/50"
            : "bg-slate-950/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                CareerCraft AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 text-white font-medium">
                <a href="/" className="nav-link">Home</a>
                <a href="/features/ai-resume-builder" className="nav-link">ResumeBuilder</a>
                <a href="/features/Interview-prep" className="nav-link">InterviewPrep</a>
                <a href="/features/EmailGenerator" className="nav-link">EmailGenerate</a>
              </div>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && userData ? (
                <>
                  <span className="text-gray-300 font-medium">
                    Welcome, {userData.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-slate-300 hover:text-cyan-400 font-medium transition duration-300"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-xl hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300 border border-cyan-400/20"
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-cyan-400 transition duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-xl rounded-xl mt-2 shadow-2xl border border-slate-800/50">
                <a href="/" className="mobile-nav-link">Home</a>
                <a href="/dashboard" className="mobile-nav-link">ResumeBuilder</a>
                <a href="#testimonials" className="mobile-nav-link">InterviewPrep</a>
                <a href="#pricing" className="mobile-nav-link">Pricing</a>

                <div className="pt-2 space-y-2">
                  {isLoggedIn && userData ? (
                    <>
                      <span className="block px-3 py-2 text-slate-300 font-medium">
                        Welcome, {userData.name}
                      </span>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-3 py-2 text-red-500 hover:text-white hover:bg-red-600 rounded-lg font-medium transition-all"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a href="/login" className="mobile-nav-link">Sign In</a>
                      <a
                        href="/register"
                        className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-2 rounded-lg font-medium text-center"
                      >
                        Get Started
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nave;
