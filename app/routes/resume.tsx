import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Navbar from "~/components/Navbar";

export const meta = () => [
  { title: "PathoraCV | Review " },
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
    };

    loadResume();
  }, [id]);

  return (
    <>
      <Navbar button1="Back to Homepage" link1="/" />
      <main className="py-16 sm:py-20 md:py-24 px-3 sm:px-6 md:px-10 lg:px-16 min-h-screen bg-blue-100/20">
        <div className="flex flex-col lg:flex-row w-full items-start justify-center gap-6 lg:gap-8">
          {/* Resume Preview Section */}
          <section className="w-full lg:w-2/5 flex justify-center p-1 lg:sticky lg:top-20">
            {imageUrl && resumeUrl ? (
              <div className="relative group w-full max-w-sm sm:max-w-md mx-auto lg:mx-0">
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/50 hover:shadow-3xl transition-all group-hover:scale-[1.01]">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden rounded-lg sm:rounded-xl"
                  >
                    <img
                      src={imageUrl}
                      className="w-full max-h-[70vh] object-contain transition-transform duration-500 group-hover:scale-105"
                      alt="Resume preview"
                    />
                  </a>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg"
                    >
                      Open
                    </a>
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/90 text-gray-700 text-sm font-medium rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg border border-gray-200">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center text-center w-full max-w-sm sm:max-w-md mx-auto lg:mx-0">
                <h3 className="text-base sm:text-lg font-semibold">
                  Loading Preview...
                </h3>
              </div>
            )}
          </section>

          {/* Feedback Section */}
          <section className="w-full lg:w-3/5 bg-gray-100/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Result
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Go through your score-sheet
              </p>
            </div>

            {feedback ? (
              <div className="space-y-6 sm:space-y-8">
                <Summary feedback={feedback} />
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />

                {/* CTA */}
                <div className="mt-8 sm:mt-10 p-4 sm:p-5 bg-green-100/80 rounded-lg sm:rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                    Ready to improve?
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3">
                    Apply these suggestions to make your resume more effective
                    and ATS-friendly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        console.log("Feature yet to be implemented")
                      }
                      className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                    >
                      Download Report
                    </button>
                    <button
                      onClick={() =>
                        console.log("Feature yet to be implemented")
                      }
                      className="w-full sm:w-auto px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200"
                    >
                      Analyze Another
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 sm:py-14">
                <img
                  src="/images/resume-scan-2.gif"
                  className="w-56 sm:w-72 max-w-full h-auto rounded-lg sm:rounded-xl shadow-2xl"
                  alt="Analyzing resume"
                />
                <h3 className="text-lg sm:text-xl font-bold mt-4">
                  Analyzing Your Resume
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:max-w-md text-center mt-2">
                  Our AI is carefully reviewing your resume to provide
                  personalized feedback.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Resume;
