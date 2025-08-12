import { FaEye, FaEdit, FaTrashAlt, FaFileAlt, FaSpinner, FaClock } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-gray-800/90 via-gray-700/80 to-gray-900/90",
  "from-slate-800/90 via-slate-700/80 to-slate-900/90", 
  "from-zinc-800/90 via-zinc-700/80 to-zinc-900/90",
  "from-gray-800/90 via-slate-800/80 to-gray-900/90",
  "from-slate-800/90 via-zinc-800/80 to-slate-900/90",
  "from-zinc-800/90 via-gray-800/80 to-zinc-900/90",
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [gradient] = React.useState(getRandomGradient());
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    console.log("Delete Resume with ID", resume._id);
    try {
      const response = await deleteThisResume(resume._id);
    } catch (error) {
      console.error("Error deleting resume:", error.message);
      toast(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      {/* Main Card - fits perfectly in Dashboard container */}
      <div className={`h-full w-full bg-gradient-to-br ${gradient} backdrop-blur-lg rounded-xl border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 ease-out cursor-pointer overflow-hidden relative group hover:border-cyan-400/30 hover:shadow-xl`}>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full -translate-y-16 translate-x-16 group-hover:bg-cyan-400/10 transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/5 rounded-full translate-y-12 -translate-x-12 group-hover:bg-purple-400/10 transition-all duration-300"></div>
        
        {/* Header Section */}
        <div className="relative z-10 p-6 h-full flex flex-col min-h-80">
          
          {/* Icon and Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/20 transition-all duration-300">
              <FaFileAlt className="text-gray-300 text-2xl group-hover:text-cyan-300 transition-colors duration-300" />
            </div>
            <div className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <span className="text-gray-400 text-xs font-medium group-hover:text-gray-300 transition-colors duration-300">Resume</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="flex-1 mb-6">
            <h3 className="text-gray-100 font-bold text-xl leading-tight mb-3 group-hover:text-white transition-colors duration-300">
              {resume.title}
            </h3>
            
            {/* Date Info */}
            <div className="flex items-center text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
              <FaClock className="mr-2 text-cyan-400" />
              <span>Updated {formatDate(resume.updatedAt)}</span>
            </div>

            {/* Stats or Additional Info */}
            <div className="flex items-center space-x-4 text-gray-500 text-xs group-hover:text-gray-400 transition-colors duration-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-1 animate-pulse"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-1 animate-pulse"></div>
                <span>Ready</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
              className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-cyan-500/20 hover:border-cyan-400/40 text-slate-200 hover:text-white border border-white/10 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <FaEye className="mr-2" />
              View
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
              className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-blue-500/20 hover:border-blue-400/40 text-slate-200 hover:text-white border border-white/10 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <FaEdit className="mr-2" />
              Edit
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenAlert(true)}
              className="p-3 bg-white/10 backdrop-blur-sm hover:bg-red-500/20 hover:border-red-400/40 text-slate-200 hover:text-white border border-white/10 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
            >
              <FaTrashAlt />
            </Button>
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl font-bold">
              Delete Resume?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              This action cannot be undone. This will permanently delete "{resume.title}" 
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel 
              onClick={() => setOpenAlert(false)}
              className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-sm rounded-xl px-6 transition-all duration-300"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={loading}
              className="bg-red-500/80 hover:bg-red-500 text-white border border-red-400/40 hover:border-red-400/60 backdrop-blur-sm rounded-xl px-6 min-w-24 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
            >
              {loading ? (
                <div className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ResumeCard;