import React, { useState } from "react";
import { CopyPlus, Loader, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createNewResume } from "@/Services/resumeAPI";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    const trimmedTitle = resumetitle.trim();

    if (trimmedTitle === "") {
      alert("Please add a title to your resume");
      setLoading(false);
      return;
    }

    const data = {
      title: trimmedTitle,
      themeColor: "#000000",
    };

    try {
      const res = await createNewResume(data);
      navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setLoading(false);
      setResumetitle("");
    }
  };

  return (
    <>
      <div
        className="p-14 py-24 flex flex-col items-center justify-center border-2 border-dashed border-white/20 bg-white/5 rounded-xl h-[380px] hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30 backdrop-blur-sm gap-3 group"
        onClick={() => setOpenDialog(true)}
      >
        <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg group-hover:scale-110 transition-transform">
          <CopyPlus className="text-cyan-400" size={32} />
        </div>
        <p className="text-slate-300 text-lg font-medium">Create New Resume</p>
      </div>

      {/* Dialog Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-xl border border-white/10 p-6 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setOpenDialog(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
              Create New Resume
            </h2>
            <p className="text-slate-400 mb-6">Add a title for your new resume</p>
            
            <input
              type="text"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value)}
              placeholder="Ex: Backend Developer Resume"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:outline-none text-white placeholder-slate-400 mb-6 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && !loading && createResume()}
            />
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors text-white"
              >
                Cancel
              </button>
              <button
                onClick={createResume}
                disabled={!resumetitle.trim() || loading}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  !resumetitle.trim() || loading
                    ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/20'
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin" size={18} />
                    Creating...
                  </div>
                ) : (
                  "Create Resume"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddResume;