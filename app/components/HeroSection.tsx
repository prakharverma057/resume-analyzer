import { Link } from "react-router";
import FileUploader from "~/components/FileUploader";
import { useFileUpload } from "~/hooks/useFileUpload";
const HeroSection = () => {
  const { file, handleFileSelect } = useFileUpload();
  return (
    <>
      <div className="bg-[url(https://enhancv.com/_next/static/images/background-new-356c805786f29eb394b6aca8abadb225.svg)] bg-cover w-full min-h-screen  -translate-y-10">
        <div className="flex flex-row justify-between items-center ">
          <div className="page-heading py-16 w-3xl">
            <h1>Is Your Resume good enough??</h1>
            <p className="mt-3 font-semibold text-2xl text-gray-500">
              Wanna know how accurate is your Resume for your next dream job?
              Upload to know the AI-powered score and suggestions.
            </p>
          </div>
          <img
            src="https://enhancv.com/_next/static/images/resume-checker-45626345c378d9776f3413e1bb91006a.svg"
            className="w-[700px] translate-y-20 translate-x-70 "
          />
        </div>
        <div className="w-3xl mt-10 gap-4">
          {/* <Link to="/upload" className=" w-fit text-xl font-semibold">
            Upload Resume
          </Link> */}
          <FileUploader onFileSelect={handleFileSelect} />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
