import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";
import { CloudUpload, FileText, Upload, Lock, CloudCheck } from "lucide-react";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

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
                  <img
                    src="/icons/cross.svg"
                    alt="remove"
                    className="w-4 h-4"
                  />
                </button>
              </div>

              <div className="pt-4">
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <span className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
                    Get Analysis
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-center space-x-2 pt-2">
                <CloudCheck className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Chill, we got it!</span>
              </div>
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
