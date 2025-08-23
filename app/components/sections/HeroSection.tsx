import { Link } from "react-router";
import FileUploader from "~/components/FileUploader";
import { useFileUpload } from "~/hooks/useFileUpload";
const HeroSection = () => {
  const { file, handleFileSelect } = useFileUpload();
  return (
    <>
      {" "}
      <div className="bg-[url('https://enhancv.com/_next/static/images/background-new-356c805786f29eb394b6aca8abadb225.svg')] bg-cover w-full min-h-screen overflow-hidden">
        <div className="p-20">
          <div className="flex flex-row justify-between gap-16 mb-10">
            <div className="flex flex-col justify-start content-center max-w-3xl ">
              <p className="tracking-wide font-semibold text-7xl">
                Is Your Resume good enough??
              </p>
              <p className="mt-3 font-semibold text-2xl text-gray-500">
                Wanna know how accurate is your Resume for your next dream job?
                Upload to know the AI-powered score and suggestions.
              </p>
              <div className="mt-14">
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
            </div>
            <img
              src="https://enhancv.com/_next/static/images/resume-checker-45626345c378d9776f3413e1bb91006a.svg"
              className="w-[600px] md:translate-x-50"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
