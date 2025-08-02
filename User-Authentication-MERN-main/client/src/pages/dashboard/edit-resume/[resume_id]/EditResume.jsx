import React, { useEffect } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  // Create white floating particles
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full bg-white';
      
      // Random properties
      const size = Math.random() * 3 + 4;
      const opacity = Math.random() * 0.3 + 0.2;
      const duration = Math.random() * 30 + 1;
      const delay = Math.random() * 30;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
      
      // Random movement direction
      particle.style.setProperty('--x-rand', (Math.random() - 0.5) * 2);
      particle.style.setProperty('--y-rand', (Math.random() - 0.5) * 2);
      
      particlesContainer.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(particle => {
        if (particlesContainer.contains(particle)) {
          particlesContainer.removeChild(particle);
        }
      });
    };
  }, []);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const data = await getResumeData(resume_id);
        dispatch(addResumeData(data.data));
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };
    fetchResumeData();
  }, [resume_id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden p-4 md:p-8 md:mt-16">
      {/* White floating particles */}
      <div className="particles-container fixed inset-0 w-full h-full pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-slate-200 rounded-xl p-6">
          <ResumeForm />
        </div>

        {/* Preview Section */}
        <div className="bg-slate-200 rounded-xl p-6">
          <PreviewPage />
        </div>
      </div>

      {/* CSS for floating animation */}
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
      `}</style>
    </div>
  );
}

export default EditResume;