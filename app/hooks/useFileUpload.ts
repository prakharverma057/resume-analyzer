import { useState } from "react";

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
  };

  return {
    file,
    handleFileSelect,
    clearFile,
  };
};