import { useState, forwardRef, useImperativeHandle } from "react";
import { usePuterStore } from "~/lib/puter";
import { useResumeAnalysis, type AnalyzeResumeParams } from "~/lib/resumeAnalysis";

interface ResumeAnalyzerProps {
  onAnalysisStart?: () => void;
  onAnalysisComplete?: (result: any) => void;
  onAnalysisError?: (error: string) => void;
  onStatusUpdate?: (status: string) => void;
  className?: string;
}

export interface ResumeAnalyzerRef {
  analyze: (params: AnalyzeResumeParams) => Promise<any>;
  isAnalyzing: boolean;
  status: string;
  error: string;
}

const ResumeAnalyzer = forwardRef<ResumeAnalyzerRef, ResumeAnalyzerProps>(
  ({ onAnalysisStart, onAnalysisComplete, onAnalysisError, onStatusUpdate, className = "" }, ref) => {
    const { fs, ai, kv } = usePuterStore();
    const { analyze: analyzeResume } = useResumeAnalysis({ fs, ai, kv });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const handleAnalyze = async (params: AnalyzeResumeParams) => {
      setIsAnalyzing(true);
      setError("");
      setStatus("");
      onAnalysisStart?.();

      const result = await analyzeResume(params, {
        onStatusUpdate: (status) => {
          setStatus(status);
          setError("");
          onStatusUpdate?.(status);
        },
        onError: (error) => {
          setError(error);
          setStatus("");
          setIsAnalyzing(false);
          onAnalysisError?.(error);
        },
        onSuccess: (data) => {
          setStatus("Analysis completed successfully!");
          setIsAnalyzing(false);
          onAnalysisComplete?.(data);
        },
      });

      if (!result) {
        setIsAnalyzing(false);
      }

      return result;
    };

    useImperativeHandle(ref, () => ({
      analyze: handleAnalyze,
      isAnalyzing,
      status,
      error,
    }));

    return (
      <div className={`resume-analyzer ${className}`}>
        {isAnalyzing && status && (
          <div className="analysis-status">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500 mr-2"></div>
            <p className="text-sm text-gray-600">{status}</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {!isAnalyzing && !error && status && (
          <div className="success-message">
            <p className="text-green-500 text-sm">{status}</p>
          </div>
        )}
      </div>
    );
  }
);

ResumeAnalyzer.displayName = "ResumeAnalyzer";

export default ResumeAnalyzer;

// Hook version for simpler usage
export const useResumeAnalyzer = () => {
  const { fs, ai, kv } = usePuterStore();
  const { analyze } = useResumeAnalysis({ fs, ai, kv });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const analyzeResume = async (
    params: AnalyzeResumeParams,
    callbacks?: {
      onAnalysisStart?: () => void;
      onAnalysisComplete?: (result: any) => void;
      onAnalysisError?: (error: string) => void;
      onStatusUpdate?: (status: string) => void;
    }
  ) => {
    try {
      setIsAnalyzing(true);
      setError("");
      setStatus("");
      callbacks?.onAnalysisStart?.();

      console.log("Starting resume analysis with params:", params);

      const result = await analyze(params, {
        onStatusUpdate: (status) => {
          console.log("Analysis status update:", status);
          setStatus(status);
          setError("");
          callbacks?.onStatusUpdate?.(status);
        },
        onError: (error) => {
          console.error("Analysis error callback:", error);
          setError(error);
          setStatus("");
          setIsAnalyzing(false);
          callbacks?.onAnalysisError?.(error);
        },
        onSuccess: (data) => {
          console.log("Analysis success callback:", data);
          setStatus("Analysis completed successfully!");
          setIsAnalyzing(false);
          callbacks?.onAnalysisComplete?.(data);
        },
      });

      if (!result) {
        console.log("Analysis returned null result");
        setIsAnalyzing(false);
        if (!error) {
          const errorMsg = "Analysis failed - no result returned";
          setError(errorMsg);
          callbacks?.onAnalysisError?.(errorMsg);
        }
      }

      return result;
    } catch (error) {
      console.error("ResumeAnalyzer hook error:", error);
      const errorMessage = error instanceof Error ? error.message : "Analysis hook failed";
      setError(errorMessage);
      setIsAnalyzing(false);
      callbacks?.onAnalysisError?.(errorMessage);
      return null;
    }
  };

  return {
    analyzeResume,
    isAnalyzing,
    status,
    error,
  };
};