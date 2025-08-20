import { convertPdfToImage } from "./pdf2img";
import { generateUUID } from "./utils";
import { getGenericInstructions } from "../../constants";

export interface AnalyzeResumeParams {
  // companyName: string;
  // jobTitle: string;
  // jobDescription: string;
  file: File;
}

export interface AnalyzeResumeResult {
  id: string;
  resumePath: string;
  imagePath: string;
  // companyName: string;
  // jobTitle: string;
  // jobDescription: string;
  feedback: any;
}

export interface ResumeAnalysisCallbacks {
  onStatusUpdate?: (status: string) => void;
  onError?: (error: string) => void;
  onSuccess?: (result: AnalyzeResumeResult) => void;
}

export const analyzeResume = async (
  params: AnalyzeResumeParams,
  services: {
    fs: any;
    ai: any;
    kv: any;
  },
  callbacks?: ResumeAnalysisCallbacks
): Promise<AnalyzeResumeResult | null> => {
  // const { companyName, jobTitle, jobDescription, file } = params;
  const { file } = params;
  const { fs, ai, kv } = services;
  const { onStatusUpdate, onError, onSuccess } = callbacks || {};

  // Validate required services
  if (!fs || !ai || !kv) {
    const error = "Error: Required services (fs, ai, kv) are not available. Please ensure you're authenticated.";
    console.error("Missing services:", { fs: !!fs, ai: !!ai, kv: !!kv });
    onError?.(error);
    return null;
  }

  // Validate file
  if (!file) {
    const error = "Error: No file provided for analysis";
    console.error("Missing file parameter");
    onError?.(error);
    return null;
  }

  console.log("Starting analysis with file:", file.name, "size:", file.size);

  try {
    onStatusUpdate?.("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) {
      const error = "Error: Failed to upload file";
      onError?.(error);
      return null;
    }

    onStatusUpdate?.("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) {
      const error = "Error: Failed to convert PDF to image";
      onError?.(error);
      return null;
    }

    onStatusUpdate?.("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      const error = "Error: Failed to upload image";
      onError?.(error);
      return null;
    }

    onStatusUpdate?.("Preparing data...");
    const uuid = generateUUID();
    const data: AnalyzeResumeResult = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      // companyName,
      // jobTitle,
      // jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    onStatusUpdate?.("Analyzing...");
    // Use generic instructions without specific job details
    const feedback = await ai.feedback(
      uploadedFile.path,
      // prepareInstructions({ jobTitle, jobDescription })
      getGenericInstructions()
    );
    
    console.log("AI feedback response:", feedback);
    
    if (!feedback) {
      const error = "Error: Failed to analyze resume - no response from AI service";
      onError?.(error);
      return null;
    }

    // Check if the AI response indicates an error
    if (feedback.success === false) {
      let errorMessage = "AI Analysis failed";
      
      if (feedback.error) {
        if (feedback.error.delegate === "usage-limited-chat") {
          errorMessage = "AI usage limit reached. Please try again later or upgrade your account.";
        } else if (feedback.error.message) {
          errorMessage = `AI Error: ${feedback.error.message}`;
        } else {
          errorMessage = `AI Error: ${JSON.stringify(feedback.error)}`;
        }
      }
      
      console.error("AI service error:", feedback.error);
      onError?.(errorMessage);
      return null;
    }

    if (!feedback.message || !feedback.message.content) {
      const error = "Error: AI analysis returned empty response";
      onError?.(error);
      return null;
    }

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    try {
      data.feedback = JSON.parse(feedbackText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", feedbackText);
      const error = "Error: AI returned invalid response format";
      onError?.(error);
      return null;
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    
    onStatusUpdate?.("Analysis complete!");
    onSuccess?.(data);
    
    return data;
  } catch (error) {
    console.error("Resume analysis error:", error);
    let errorMessage = "Unknown error occurred";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      errorMessage = JSON.stringify(error);
    }
    
    console.error("Detailed error:", {
      error,
      errorType: typeof error,
      errorMessage,
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    onError?.(errorMessage);
    return null;
  }
};

// Hook version for React components
export const useResumeAnalysis = (services: { fs: any; ai: any; kv: any }) => {
  const analyze = async (
    params: AnalyzeResumeParams,
    callbacks?: ResumeAnalysisCallbacks
  ) => {
    return analyzeResume(params, services, callbacks);
  };

  return { analyze };
};