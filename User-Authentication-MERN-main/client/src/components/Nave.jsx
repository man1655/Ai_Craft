import React, { useState, useEffect, useContext } from "react";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
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
      const { data } = await axios.post("/api/auth/logout",  { withCredentials: true });
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        toast.success("Logged out successfully");
        navigate("/");
        setIsMenuOpen(false); // Close menu after logout
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <span className="text-white font-bold text-xs sm:text-sm">C</span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent truncate">
                CareerCraft AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden xl:block">
              <div className="ml-10 flex items-baseline space-x-8 text-white font-medium">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/features/ai-resume-builder" className="nav-link">Resume Builder</Link>
                <Link to="/features/Interview-prep" className="nav-link">Interview Prep</Link>
                <Link to="/features/EmailGenerator" className="nav-link">Email Generate</Link>
              </div>
            </div>

            {/* Desktop Auth */}
            <div className="hidden xl:flex items-center space-x-4 flex-shrink-0">
              {isLoggedIn && userData ? (
                <>
                  <span className="text-gray-300 font-medium truncate max-w-32">
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
                  <Link
                    to="/login"
                    className="text-slate-300 hover:text-cyan-400 font-medium transition duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-xl hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300 border border-cyan-400/20 whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="xl:hidden flex-shrink-0">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-cyan-400 transition duration-200 p-1"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="xl:hidden absolute left-0 right-0 top-full">
              <div className="mx-3 mt-1 bg-slate-900/98 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-800/50 overflow-hidden">
                <div className="px-4 py-3 space-y-1">
                  <Link 
                    to="/" 
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/features/ai-resume-builder" 
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    Resume Builder
                  </Link>
                  <Link 
                    to="/features/Interview-prep" 
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    Interview Prep
                  </Link>
                  <Link 
                    to="/features/EmailGenerator" 
                    className="mobile-nav-link"
                    onClick={closeMenu}
                  >
                    Email Generate
                  </Link>

                  <div className="pt-3 mt-3 border-t border-slate-800/50 space-y-2">
                    {isLoggedIn && userData ? (
                      <>
                        <div className="px-3 py-2">
                          <span className="text-slate-300 font-medium text-sm">
                            Welcome, {userData.name}
                          </span>
                        </div>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-3 py-3 text-red-400 hover:text-white hover:bg-red-600/20 rounded-lg font-medium transition-all text-sm"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to="/login" 
                          className="mobile-nav-link"
                          onClick={closeMenu}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-3 rounded-lg font-medium text-center text-sm hover:shadow-lg transition-all"
                          onClick={closeMenu}
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Add CSS styles for nav links */}
      <style jsx>{`
        .nav-link {
          @apply text-slate-300 hover:text-cyan-400 transition duration-300 relative;
        }
        
        .nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);
          border-radius: 1px;
        }

        .mobile-nav-link {
          @apply block px-3 py-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg font-medium transition-all text-sm;
        }
      `}</style>
    </div>
  );
}

export default Nave;