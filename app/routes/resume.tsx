import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Navbar from "~/components/Navbar";

export const meta = () => [
  { title: "Resumind | Review " },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR mismatch

    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    // <main className="!pt-0">
    //   {/* <nav className="resume-nav">
    //     <Link to="/" className="back-button">
    //       <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
    //       <span className="text-gray-800 text-sm font-semibold">
    //         Back to Homepage
    //       </span>
    //     </Link>
    //   </nav> */}
    //   <Navbar button1="Back to Homepage" link1="/" />
    //   <div className="flex flex-row w-full max-lg:flex-col-reverse">
    //     <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
    //       {imageUrl && resumeUrl ? (
    //         <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
    //           <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
    //             <img
    //               src={imageUrl}
    //               className="w-full h-full object-contain rounded-2xl"
    //               title="resume"
    //             />
    //           </a>
    //         </div>
    //       ) : (
    //         <div className="w-full h-full flex items-center justify-center">
    //           <span>Loading preview...</span>
    //         </div>
    //       )}
    //     </section>
    //     <section className="feedback-section">
    //       <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
    //       {feedback ? (
    //         <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
    //           <Summary feedback={feedback} />
    //           <ATS
    //             score={feedback.ATS.score || 0}
    //             suggestions={feedback.ATS.tips || []}
    //           />
    //           <Details feedback={feedback} />
    //         </div>
    //       ) : (
    //         <img src="/images/resume-scan-2.gif" className="w-full" />
    //       )}
    //     </section>
    //   </div>
    // </main>
    <>
      <Navbar button1="Back to Homepage" link1="/" />
      <main className="py-28 px-20 min-h-screen bg-blue-100/40 ">
        <div className="flex flex-row w-full max-lg:flex-col-reverse items-start justify-center">
          {/* Enhanced Resume Preview Section */}
          <section className="w-2/5  justify-center sticky top-28 flex p-8  max-lg:py-12">
            {imageUrl && resumeUrl ? (
              <div className="relative z-10 group">
                {/* Main preview container */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/50 animate-in fade-in duration-1000 hover:shadow-3xl transition-all transform group-hover:scale-[1.02]">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden rounded-xl"
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-end justify-center pb-6">
                      <div className="flex items-center gap-3 text-white">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          Click to view full size
                        </span>
                      </div>
                    </div>

                    <img
                      src={imageUrl}
                      className="w-full max-w-md h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                      title="resume preview"
                      alt="Resume preview"
                    />
                  </a>

                  {/* Action buttons */}
                  <div className="flex items-center justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Open
                    </a>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                {/* Enhanced loading state */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-12 h-12 text-white animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-500/30 to-blue-600/30 rounded-full blur-xl animate-pulse" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Loading Preview
                  </h3>
                  <p className="text-gray-600">
                    Preparing your resume for analysis...
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Enhanced Feedback Section */}
          <section className="w-3/5 max-lg:w-full bg-blue-100/50 backdrop-blur-sm p-8 lg:p-12 rounded-4xl max-lg:rounded-t-3xl max-lg:-mt-8 max-lg:relative max-lg:z-10">
            {/* Enhanced header */}
            <div className="mb-12 max-lg:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <img src="/icons/checked.svg" className="w-17" />

                <div className="ml-4">
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent">
                    Result
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Go through your score-sheet
                  </p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                <div className="bg-green-500 h-1 rounded-full transition-all duration-1000 ease-out w-full" />
              </div>
            </div>

            {feedback ? (
              <div className="space-y-10 bg-white p-8 -mt-5 rounded-3xl">
                {/* Content wrapper with enhanced styling */}
                <div className="animate-in fade-in duration-1000 space-y-6">
                  <div className="transform hover:scale-[1.01] transition-all duration-300">
                    <Summary feedback={feedback} />
                  </div>

                  <div className="transform hover:scale-[1.01] transition-all duration-300">
                    <ATS
                      score={feedback.ATS.score || 0}
                      suggestions={feedback.ATS.tips || []}
                    />
                  </div>

                  <div className="transform hover:scale-[1.01] transition-all duration-300">
                    <Details feedback={feedback} />
                  </div>
                </div>

                {/* Call to action */}
                <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      Ready to improve?
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Apply these suggestions to make your resume more effective
                    and ATS-friendly.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg  hover:green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Download Report
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200">
                      Analyze Another
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                {/* Enhanced loading animation */}
                <div className="relative mb-8">
                  <img
                    src="/images/resume-scan-2.gif"
                    className="w-80 max-w-full h-auto opacity-90 rounded-2xl shadow-2xl"
                    alt="Analyzing resume"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl" />
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Analyzing Your Resume
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Our AI is carefully reviewing your resume to provide
                    personalized feedback and recommendations.
                  </p>

                  {/* Loading progress */}
                  <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    This usually takes 30-60 seconds...
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Resume;
