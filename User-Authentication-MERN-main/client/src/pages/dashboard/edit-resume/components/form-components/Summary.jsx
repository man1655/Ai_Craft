import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const aiPrompt =
  "Job Title: {jobTitle}. Based on the job title, provide a list of summaries for 3 experience levels: Entry Level, Mid Level, and Senior Level. Each summary should be 3–4 lines. Return an array of objects in JSON format, each with fields `summary` and `experience_level`.";

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: { summary },
    };

    try {
      if (resume_id) {
        await updateThisResume(resume_id, data);
        toast.success("Resume updated successfully.");
      }
    } catch (error) {
      toast.error("Error updating resume: " + error.message);
    } finally {
      setLoading(false);
      enanbledNext(true);
      enanbledPrev(true);
    }
  };

  const applySuggestedSummary = (text) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: text,
      })
    );
    setSummary(text);
  };

  const generateSummaryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please add a job title first.");
      return;
    }

    setLoading(true);
    const prompt = aiPrompt.replace("{jobTitle}", resumeInfo.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const text = await result.response.text();

      let parsed = JSON.parse(text);

      if (Array.isArray(parsed)) {
        setAiGeneratedSummaryList(parsed);
      } else if (Array.isArray(parsed.data)) {
        setAiGeneratedSummaryList(parsed.data);
      } else {
        throw new Error("Invalid AI response format.");
      }

      toast.success("AI summaries generated.");
    } catch (error) {
      console.error("AI Summary Error:", error);
      toast.error("Failed to generate summary from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title.</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={generateSummaryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Sparkles className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5"
            required
            value={summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {Array.isArray(aiGeneratedSummaryList) && aiGeneratedSummaryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => applySuggestedSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-muted transition"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
