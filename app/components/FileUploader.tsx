import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { formatSize } from "../lib/utils";
import {
  CloudUpload,
  FileText,
  Upload,
  Lock,
  CloudCheck,
  X,
} from "lucide-react";
import { useResumeAnalyzer } from "./ResumeAnalyzer";
import { type AnalyzeResumeParams } from "~/lib/resumeAnalysis";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
  // companyName?: string;
  // jobTitle?: string;
  // jobDescription?: string;
  onAnalysisStart?: () => void;
  onAnalysisComplete?: (result: any) => void;
  onAnalysisError?: (error: string) => void;
  onStatusUpdate?: (status: string) => void;
}

const FileUploader = ({
  onFileSelect,
  // companyName = "",
  // jobTitle = "",
  // jobDescription = "",
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  onStatusUpdate,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { analyzeResume, isAnalyzing, status, error } = useResumeAnalyzer();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0] || null;
      setFile(selected);
      onFileSelect?.(selected);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
    noClick: !!file, // Prevent opening file dialog if a file is already selected
    noDrag: !!file, // Prevent drag if a file is already selected
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
  };

  const handleAnalysis = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Analysis button clicked!", {
      file,
      isAnalyzing,
      // companyName,
      // jobTitle,
      // jobDescription,
    });

    if (!file || isAnalyzing) {
      console.log("Early return:", { file: !!file, isAnalyzing });
      return;
    }

    // // Check if required analysis parameters are provided
    // if (!companyName || !jobTitle || !jobDescription) {
    //   const errorMsg =
    //     "Please provide company name, job title, and job description to analyze the resume.";
    //   console.log("Missing parameters:", {
    //     companyName,
    //     jobTitle,
    //     jobDescription,
    //   });
    //   onAnalysisError?.(errorMsg);
    //   return;
    // }

    const params: AnalyzeResumeParams = {
      // companyName,
      // jobTitle,
      // jobDescription,
      file,
    };

    console.log("Starting analysis with params:", params);

    try {
      await analyzeResume(params, {
        onAnalysisStart: () => {
          console.log("Analysis started");
          onAnalysisStart?.();
        },
        onAnalysisComplete: (result) => {
          console.log("Analysis completed successfully:", result);
          onAnalysisComplete?.(result);

          // Auto redirect to resume results page
          if (result && result.id) {
            console.log(`Redirecting to /resume/${result.id}`);
            navigate(`/resume/${result.id}`);
          } else {
            console.error("No result ID found for redirect");
          }
        },
        onAnalysisError: (error) => {
          console.error("Analysis failed:", error);
          onAnalysisError?.(error);
        },
        onStatusUpdate: (status) => {
          console.log("Status update:", status);
          onStatusUpdate?.(status);
        },
      });
    } catch (error) {
      console.error("Analysis error:", error);
      onAnalysisError?.(`Analysis failed: ${error}`);
    }
  };

  return (
    <div className=" rounded-xl">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragActive
              ? "border-emerald-400 bg-emerald-50"
              : "border-gray-300 bg-white hover:border-emerald-300 hover:bg-emerald-25"
          }`}
        >
          {file ? (
            <div onClick={(e) => e.stopPropagation()}>
              <div className=" flex flex-row items-center justify-between py-3 px-10 border-dashed border-1 rounded-xl">
                <div className="flex flex-row gap-2 items-center justify-between ">
                  <FileText className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="space-y-2">
                    <p className="text-lg text-gray-700">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>
                <button className="p-2 cursor-pointer" onClick={handleRemove}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAnalysis}
                  disabled={isAnalyzing}
                  className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                    isAnalyzing
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    "Get Analysis"
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 pt-2">
                <CloudCheck className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {isAnalyzing && status ? status : "Chill, we got it!"}
                </span>
              </div>

              {error && (
                <div className="flex items-center justify-center space-x-2 pt-2">
                  <span className="text-sm text-red-500">{error}</span>
                </div>
              )}
            </div>
          ) : (
            <div className=" py-10">
              <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="space-y-2">
                <p className="text-lg text-gray-700">
                  Drop your resume here or choose a file.
                </p>
                <p className="text-sm text-gray-500">
                  PDF & DOCX only. Max 2MB file size.
                </p>
              </div>

              <div className="pt-4">
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <span className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                    Upload Your Resume
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-center space-x-2 pt-2">
                <Lock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Privacy guaranteed
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileUploader;
