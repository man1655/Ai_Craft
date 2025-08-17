import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    dispatch(addResumeData(response.data));
  };

 const HandleDownload = () => {
  const element = document.getElementById("printableArea");

  const opt = {
    margin:       0,
    filename:     'my_resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};

  return (
    <>
      <div className="flex flex-col justify-center items-center my-10 mx-10 ">
        {/* This div contains elements you DO NOT want to print */}
        <div id="noPrint" className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI-generated Resume is ready!{" "}
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share the unique
            resume URL with your friends and family{" "}
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello This is My resume",
                url: import.meta.env.VITE_BASE_URL + "/dashboard/view-resume/" + resume_id,
                title: "Flamingos",
              }}
              onClick={() => toast("Resume Shared Successfully")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>

        {/* This is the div that contains the resume content you WANT to print */}
        <div
          id="printableArea"
          className="bg-white rounded-lg p-16 print-area"
          style={{ width: "210mm", height: "400mm" }}
        >
          <ResumePreview />
        </div>

      </div>
    </>
  );
}

export default ViewResume;