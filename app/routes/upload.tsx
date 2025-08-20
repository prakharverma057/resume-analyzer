import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useFileUpload } from "~/hooks/useFileUpload";
import {
  useResumeAnalysis,
  type AnalyzeResumeParams,
} from "~/lib/resumeAnalysis";

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  // const [companyName, setCompanyName] = useState("");
  // const [jobTitle, setJobTitle] = useState("");
  // const [jobDescription, setJobDescription] = useState("");
  const { file, handleFileSelect } = useFileUpload();
  const { analyze } = useResumeAnalysis({ fs, ai, kv });

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!file) return;

  //   const formData = new FormData(e.currentTarget);
  //   const params: AnalyzeResumeParams = {
  //     companyName: formData.get("company-name") as string,
  //     jobTitle: formData.get("job-title") as string,
  //     jobDescription: formData.get("job-description") as string,
  //     file,
  //   };

  //   setIsProcessing(true);

  //   const result = await analyze(params, {
  //     onStatusUpdate: (status) => setStatusText(status),
  //     onError: (error) => setStatusText(error),
  //     onSuccess: (data) => {
  //       setStatusText("Analysis complete, redirecting...");
  //       navigate(`/resume/${data.id}`);
  //     },
  //   });

  //   if (!result) {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar button2="back to homepage" />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            // <form
            //   id="upload-form"
            //   onSubmit={handleSubmit}
            //   className="flex flex-col gap-4 mt-8"
            // >
            //   <div className="form-div">
            //     <label htmlFor="company-name">Company Name</label>
            //     <input
            //       type="text"
            //       name="company-name"
            //       placeholder="Company Name"
            //       id="company-name"
            //       value={companyName}
            //       onChange={(e) => setCompanyName(e.target.value)}
            //     />
            //   </div>
            //   <div className="form-div">
            //     <label htmlFor="job-title">Job Title</label>
            //     <input
            //       type="text"
            //       name="job-title"
            //       placeholder="Job Title"
            //       id="job-title"
            //       value={jobTitle}
            //       onChange={(e) => setJobTitle(e.target.value)}
            //     />
            //   </div>
            //   <div className="form-div">
            //     <label htmlFor="job-description">Job Description</label>
            //     <textarea
            //       rows={5}
            //       name="job-description"
            //       placeholder="Job Description"
            //       id="job-description"
            //       value={jobDescription}
            //       onChange={(e) => setJobDescription(e.target.value)}
            //     />
            //   </div>

            //   <div className="form-div">
            //     <label htmlFor="uploader">Upload Resume</label>
            <FileUploader
              onFileSelect={handleFileSelect}
              // companyName={companyName}
              // jobTitle={jobTitle}
              // jobDescription={jobDescription}
              onAnalysisStart={() => setIsProcessing(true)}
              onAnalysisComplete={(data) => {
                setIsProcessing(false);
                navigate(`/resume/${data.id}`);
              }}
              onAnalysisError={(error) => {
                setIsProcessing(false);
                setStatusText(error);
              }}
              onStatusUpdate={(status) => setStatusText(status)}
            />
            //   </div>

            //   <button className="primary-button" type="submit">
            //     Analyze Resume
            //   </button>
            // </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
