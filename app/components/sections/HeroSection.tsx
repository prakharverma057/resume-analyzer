import { Link } from "react-router";
import FileUploader from "~/components/FileUploader";
import { useFileUpload } from "~/hooks/useFileUpload";
const HeroSection = () => {
  const { file, handleFileSelect } = useFileUpload();
  return (
    <>
      {" "}
      <div className="relative bg-transparent bg-cover w-full min-h-screen flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-pink-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-800/20 rounded-full blur-3xl" />
        </div>

        {/* Main Content */}
        <div className="z-10 p-4 sm:p-8 lg:p-20 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 mb-10">
            {/* Text Content */}
            <div className="flex flex-col justify-start max-w-full lg:max-w-3xl text-center lg:text-left">
              <h1 className="tracking-wide font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight">
                Is Your Resume good enough??
              </h1>
              <p className="mt-6 lg:mt-10 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 max-w-2xl mx-auto lg:mx-0">
                Wanna know how accurate is your Resume for your next dream job?
                Upload to know the AI-powered score and suggestions.
              </p>
              <div className="mt-8 lg:mt-14 max-w-lg mx-auto lg:mx-0">
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center lg:justify-end w-full lg:w-auto">
              <img
                src="https://enhancv.com/_next/static/images/resume-checker-45626345c378d9776f3413e1bb91006a.svg"
                alt="Resume checker illustration"
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none lg:w-[600px] h-auto lg:translate-x-20"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
