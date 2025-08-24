import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { formatSize } from "../lib/utils";
import { CloudUpload, FileText, Lock, CloudCheck, X } from "lucide-react";
import { useResumeAnalyzer } from "./ResumeAnalyzer";
import { type AnalyzeResumeParams } from "~/lib/resumeAnalysis";
import { usePuterStore } from "~/lib/puter";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
  onAnalysisStart?: () => void;
  onAnalysisComplete?: (result: any) => void;
  onAnalysisError?: (error: string) => void;
  onStatusUpdate?: (status: string) => void;
}

const FileUploader = ({
  onFileSelect,
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  onStatusUpdate,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { analyzeResume, isAnalyzing, status, error } = useResumeAnalyzer();

  const { auth } = usePuterStore();

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
    noClick: !!file,
    noDrag: !!file,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
  };

  const handleAnalysis = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!file || isAnalyzing) return;

    const params: AnalyzeResumeParams = { file };

    try {
      await analyzeResume(params, {
        onAnalysisStart: () => onAnalysisStart?.(),
        onAnalysisComplete: (result) => {
          onAnalysisComplete?.(result);
          if (result && result.id) navigate(`/resume/${result.id}`);
        },
        onAnalysisError: (error) => onAnalysisError?.(error),
        onStatusUpdate: (status) => onStatusUpdate?.(status),
      });
    } catch (error) {
      onAnalysisError?.(`Analysis failed: ${error}`);
    }
  };

  return (
    <div className="w-full flex justify-start px-4">
      <div className="w-full max-w-xl">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div
            className={`border-2 m-8 border-dashed rounded-xl p-3 sm:p-3 text-center transition-all duration-300 ${
              isDragActive
                ? "border-emerald-400 bg-emerald-50"
                : "border-gray-300 bg-white hover:border-emerald-300 hover:bg-emerald-25"
            }`}
          >
            {file ? (
              <div onClick={(e) => e.stopPropagation()}>
                {/* File preview box */}
                <div className="flex items-center justify-between gap-4 p-5 border rounded-lg bg-green-50">
                  <div className=" flex items-center gap-3">
                    <FileText className="h-10 w-10 text-gray-400" />
                    <div className="text-left">
                      <p className="text-base font-medium text-gray-700 break-words">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-2 text-gray-500 hover:text-red-500"
                    onClick={handleRemove}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Analysis Button / Auth Button */}
                <div className="pt-6">
                  {auth.isAuthenticated ? (
                    <button
                      onClick={handleAnalysis}
                      disabled={isAnalyzing}
                      className={`w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 font-semibold rounded-lg transition-colors ${
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
                  ) : (
                    <button
                      className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
                      onClick={auth.signIn}
                    >
                      Login to See Analysis
                    </button>
                  )}
                </div>

                {/* Status / Errors */}
                <div className="flex items-center justify-center space-x-2 pt-3">
                  <CloudCheck className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {isAnalyzing && status ? status : "Chill, we got it!"}
                  </span>
                </div>
                {error && (
                  <div className="pt-2 text-sm text-red-500">{error}</div>
                )}
              </div>
            ) : (
              <div className="py-5 md:py-3 sm:py-12">
                <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 space-y-1">
                  <p className="text-lg font-medium text-gray-700">
                    Drop your resume here or choose a file.
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF only. Max 20MB file size.
                  </p>
                </div>

                <div className="pt-6">
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer inline-block"
                  >
                    <span className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                      Upload Your Resume
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-center space-x-2 pt-3">
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
    </div>
  );
};

export default FileUploader;
