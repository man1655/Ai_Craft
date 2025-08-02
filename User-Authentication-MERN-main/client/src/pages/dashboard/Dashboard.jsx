import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { Sparkles } from "lucide-react";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);

  // Floating particles effect
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full bg-white';

      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.3 + 0.1;
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * 30;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
      particle.style.setProperty('--x-rand', (Math.random() - 0.5) * 2);
      particle.style.setProperty('--y-rand', (Math.random() - 0.5) * 2);

      particlesContainer.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => {
        if (particlesContainer.contains(p)) {
          particlesContainer.removeChild(p);
        }
      });
    };
  }, []);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      const data = resumes?.data;
      setResumeList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error from dashboard:", error.message);
      setResumeList([]); // prevent crash on failure
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden md:mt-16">
      {/* Background Particles */}
      <div className="particles-container absolute inset-0 w-full h-full pointer-events-none"></div>

      {/* Gradient Orbs */}
      <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -right-20 bottom-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
      <div className="absolute right-1/3 top-1/4 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 p-10 md:px-20 lg:px-32 my-18">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-cyan-400" size={24} />
          <h2 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            My Resume
          </h2>
        </div>

        <p className="text-slate-300 pb-6">Start creating your AI resume for the next job role</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6">
          <AddResume />
          {Array.isArray(resumeList) && resumeList.length > 0 ? (
            resumeList.map((resume) => (
              <div
                key={resume._id}
                className="bg-white/5 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 hover:border-cyan-500/30 hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <ResumeCard resume={resume} refreshData={fetchAllResumeData} />
              </div>
            ))
          ) : (
            <div className="text-slate-400 col-span-full text-center">
              No resumes found. Start by creating a new one!
            </div>
          )}
        </div>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(calc(var(--x-rand) * 50px), calc(var(--y-rand) * 30px));
          }
          50% {
            transform: translate(calc(var(--x-rand) * 80px), calc(var(--y-rand) * 50px));
          }
          75% {
            transform: translate(calc(var(--x-rand) * 30px), calc(var(--y-rand) * 70px));
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
