import React, { useState } from "react";
import {
  Mail,
  Send,
  Copy,
  CheckCircle,
  AlertCircle,
  Briefcase,
  User,
  FileText,
  Sparkles,
} from "lucide-react";

const EmailForm = () => {
  const [form, setForm] = useState({
    applicationType: "Job Application",
    position: "Software Engineer",
    jobDescription: "",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [loadingDescription, setLoadingDescription] = useState(false);

  const APPLICATION_TYPES = [
    "Job Application",
    "Follow-up",
    "Thank You",
    "Withdrawal",
    "Status Inquiry",
  ];

  const POSITIONS = [
    "Software Engineer",
    "Marketing Manager",
    "Data Analyst",
    "Graphic Designer",
    "Project Manager",
  ];
  const generateJobDescription = async () => {
    setLoadingDescription(true);
    setNotification("");
    try {
      const response = await fetch(
        "http://localhost:4000/api/email/job-description/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ position: form.position }),
        }
      );

      const data = await response.json();
      setForm((prev) => ({ ...prev, jobDescription: data.description }));
      setNotification("Job description generated successfully!");
    } catch (err) {
      console.error(err);
      setNotification("Failed to generate job description.");
    } finally {
      setLoadingDescription(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e) => {
    setGeneratedEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!form.jobDescription.trim()) {
      setNotification("Please provide a job description");
      return;
    }

    setLoading(true);
    setNotification("");
    try {
      const response = await fetch("http://localhost:4000/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          recipient: "Hiring Manager",
          subject: ` Application for ${form.position}`,
        }),
      });
      const res = await response.json();
      setGeneratedEmail(res.email.content);
      setNotification("Email generated successfully!");
    } catch (error) {
      console.error(error);
      setNotification("Failed to generate email. Please try again.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setNotification("Email copied to clipboard!");
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigi-300 to-indigo-400">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-xl relative">
            <Mail className="w-10 h-10 text-white" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Professional Email Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create compelling job application emails that make a lasting
            impression on hiring managers
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Email Configuration
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Application Type *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="applicationType"
                    value={form.applicationType}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-12 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    {APPLICATION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-12 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    {POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2 relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description *
              </label>

              <textarea
                name="jobDescription"
                value={form.jobDescription}
                onChange={handleChange}
                rows={6}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                placeholder="Paste the job description, requirements, and any other relevant details..."
                required
              />

              {/* Generate Job Description Button */}
              <button
                type="button"
                onClick={generateJobDescription}
                disabled={loadingDescription}
                className="absolute top-0 right-0 mt-9 mr-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:shadow-md transition duration-200 disabled:opacity-50"
              >
                {loadingDescription ? "Generating..." : "Generate with AI"}
              </button>

              <p className="text-xs text-gray-500 mt-1">
                Provide as much detail as possible for better results
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
                  loading ? "opacity-70 cursor-not-allowed transform-none" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating Your Professional Email...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Professional Email
                  </span>
                )}
              </button>
            </div>
          </div>

          {notification && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-medium ${
                notification.includes("success")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              <div className="flex items-center justify-center">
                {notification.includes("success") ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {notification}
              </div>
            </div>
          )}
        </div>

        {/* Generated Email Card */}
        {generatedEmail && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Generated Email
                </h2>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy to Clipboard
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <textarea
                value={generatedEmail}
                onChange={handleEmailChange}
                rows={15}
                className="w-full bg-transparent border-none resize-none focus:ring-0 text-gray-800 focus:outline-none"
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                }}
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-700 text-sm flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                You can edit the generated email above. Personal touches always
                help make your application stand out!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
