import React, { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createNewResume } from "@/Services/resumeAPI";  // Make sure this path is correct!

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createResume = async () => {
    setLoading(true);
    const trimmedTitle = resumetitle.trim();

    if (trimmedTitle === "") {
      console.log("Please add a title to your resume");
      setLoading(false);
      return;
    }

    const data = {
      title: trimmedTitle,
      themeColor: "#000000",
    };

    console.log(`Creating Resume ${trimmedTitle}`);

    try {
      const res = await createNewResume(data);  // Now correctly imported
      console.log("Response from Create Resume:", res);
      Navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setLoading(false);
      setResumetitle(""); // Clear input field
    }
  };

  return (
    <>
      <div
        className="p-14 py-24 flex items-center justify-center border-2 bg-secondary rounded-lg h-[380px] hover:scale-105 transition-all duration-400 cursor-pointer hover:shadow-md transform-gpu"
        onClick={() => setOpenDialog(true)}
      >
        <CopyPlus className="transition-transform duration-300" />
      </div>
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>Create a New Resume</h2>
            <p>Add a title and description to your new resume</p>
            <input
              type="text"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value)}
              placeholder="Ex: Backend Resume"
              className="my-3"
            />
            <div className="gap-2 flex justify-end">
              <button onClick={() => setOpenDialog(false)}>Cancel</button>
              <button onClick={createResume} disabled={!resumetitle || loading}>
                {loading ? <Loader className="animate-spin" /> : "Create Resume"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddResume;
