import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance1 from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import CreateSessionForm from "./CreateSessionForm";
import Modal from '../../components/Modal';
import moment from "moment";
import DeleteAlertContent from "../../components/DeleteAlertContent";

function Dashboard1() {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // Create all background elements (particles + orbs)
  useEffect(() => {
    // Create particles container if it doesn't exist
    let particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles-container fixed inset-0 w-full h-full pointer-events-none z-0';
      document.body.appendChild(particlesContainer);
    }

    // Create 50 white floating particles
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full bg-white';
      
      const size = Math.random() * 3 + 3;
      const opacity = Math.random() * 0.3 + 0.1;
      const duration = Math.random() * 30 + 10;
      const delay = Math.random() * 5;
      
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

    // Create gradient orbs
    const orbs = [];
    const orbColors = [
      'from-cyan-500/20 to-purple-500/20',
      'from-purple-500/20 to-blue-500/20',
      'from-blue-500/20 to-cyan-500/20'
    ];
    const orbPositions = [
      { left: '-left-20', top: '-top-20', size: 'w-64 h-64', delay: '' },
      { left: '-right-20', top: 'bottom-1/3', size: 'w-72 h-72', delay: 'animation-delay-2000' },
      { left: 'right-1/3', top: 'top-1/4', size: 'w-56 h-56', delay: 'animation-delay-4000' }
    ];

    orbPositions.forEach((pos, index) => {
      const orb = document.createElement('div');
      orb.className = `absolute ${pos.left} ${pos.top} ${pos.size} rounded-full bg-gradient-to-r ${orbColors[index]} blur-3xl opacity-70 animate-pulse ${pos.delay}`;
      particlesContainer.appendChild(orb);
      orbs.push(orb);
    });

    return () => {
      particles.forEach(p => particlesContainer.contains(p) && particlesContainer.removeChild(p));
      orbs.forEach(o => particlesContainer.contains(o) && particlesContainer.removeChild(o));
      if (particlesContainer && particlesContainer.children.length === 0) {
        document.body.removeChild(particlesContainer);
      }
    };
  }, []);

  const fetchAllSessions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance1.get(API_PATH.SESSIONS.GET_ALL);
      setSession(response.data);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      if (error?.response?.status === 401) {
        // Handle unauthorized access
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance1.delete(API_PATH.SESSIONS.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Failed to delete session");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 mt-16 to-black relative overflow-hidden">
      {/* Background elements are created dynamically in useEffect */}

      <div className="relative z-10 container mx-auto pt-4 pb-4 px-8">
        {/* Session Cards with glassmorphism effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {loading ? (
            <div className="col-span-3 text-center py-10 text-gray-300 text-lg backdrop-blur-lg bg-white/5 rounded-xl">
              Loading sessions...
            </div>
          ) : session.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-gray-400 backdrop-blur-lg bg-white/5 rounded-xl">
              No sessions found. Click "Add New" to get started.
            </div>
          ) : (
            session.map((data, index) => (
              <div
                key={data?._id}
                className="transform hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("Do MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  className="backdrop-blur-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                />
              </div>
            ))
          )}
        </div>

        {/* Add New Session Button with gradient */}
        <button
          className="fixed bottom-10 right-10 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-7 py-2.5 rounded-full hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 z-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-xl text-white mr-2" /> Add New
        </button>

        {/* Glassmorphism Modals */}
        <Modal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
          className="backdrop-blur-lg bg-white/5 border border-white/10"
        >
          <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
            <CreateSessionForm
              onSuccess={() => {
                fetchAllSessions();
                setOpenCreateModal(false);
              }}
            />
          </div>
        </Modal>

        <Modal
          isOpen={openDeleteAlert?.open}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          title="Delete Session"
          className="backdrop-blur-lg bg-white/5 border border-white/10"
        >
          <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
            <DeleteAlertContent
              content="Are you sure you want to delete this session?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
            />
          </div>
        </Modal>
      </div>

      {/* CSS for animations */}
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
          animation-delay: 1s;
        }
        .animation-delay-4000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default Dashboard1;