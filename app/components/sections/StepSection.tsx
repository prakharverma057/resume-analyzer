import React from "react";

const StepSection = () => {
  return (
    <div className="w-full bg-transparent">
      <section className="relative px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-20 w-full">
        {/* Background decorations */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-green-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-10 transform -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-pink-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16"
            style={{ minHeight: "100vh" }}
          >
            {/* Sticky Image Column */}
            <div className="w-full lg:w-1/2 xl:w-2/5">
              <div
                className="hidden lg:block"
                style={{
                  position: "sticky",
                  top: "8rem",
                  height: "fit-content",
                }}
              >
                <img
                  src="https://enhancv.com/_next/static/images/resume-348c033dc738da343f6621e474f48a87.svg"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg mx-auto"
                  alt="Resume stack"
                />
              </div>
              {/* Mobile/Tablet Image */}
              <div className="block lg:hidden">
                <img
                  src="https://enhancv.com/_next/static/images/resume-348c033dc738da343f6621e474f48a87.svg"
                  className="w-full max-w-sm sm:max-w-md h-auto rounded-lg mx-auto"
                  alt="Resume stack"
                />
              </div>
            </div>
            {/* Content Column */}
            <div className="w-full lg:w-1/2 xl:w-3/5">
              <div className="flex flex-col gap-6 sm:gap-8 pb-20">
                <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-wide text-center lg:text-left">
                  Get an ATS Understanding Check
                </h2>
                <p className="text-gray-500 font-medium text-sm sm:text-base lg:text-lg text-center lg:text-left leading-relaxed">
                  Part of the resume checker score we assign is based on the
                  parsability rate of your resume. We've reverse-engineered the
                  most popular applicant tracking systems currently used and we
                  look for signs of ATS compatibility.
                  <br />
                  <br />
                  For each resume uploaded, we look for skills and keywords
                  connected to the job and industry you're applying for,
                  readable contact information, file type, and length. Then,
                  we'll give you suggestions on how to improve your resume.
                </p>

                {/* Step-by-step process */}
                <div className="flex flex-col gap-12 mt-12">
                  <h3 className="text-xl lg:text-2xl font-semibold">
                    How It Works
                  </h3>

                  <div className="space-y-12">
                    <div className="relative pl-16">
                      <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        1
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl">
                        <h4 className="font-bold text-xl mb-4 text-blue-900">
                          Document Upload & Analysis
                        </h4>
                        <p className="text-blue-800 leading-relaxed mb-4">
                          Simply upload your resume in any format (PDF, DOC,
                          DOCX, TXT). Our system immediately begins a
                          comprehensive analysis, examining everything from file
                          structure to content organization. We simulate how
                          major ATS systems like Workday, Greenhouse, and Lever
                          would process your document.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-700 mb-2">
                              File Format Check
                            </h5>
                            <p className="text-blue-600 text-sm">
                              Ensures compatibility across all major ATS
                              platforms
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-700 mb-2">
                              Structure Analysis
                            </h5>
                            <p className="text-blue-600 text-sm">
                              Examines layout, sections, and formatting
                              consistency
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-16">
                      <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        2
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl">
                        <h4 className="font-bold text-xl mb-4 text-green-900">
                          Keyword & Content Optimization
                        </h4>
                        <p className="text-green-800 leading-relaxed mb-4">
                          Our AI analyzes your content against industry
                          standards and job market trends. We identify missing
                          keywords, suggest improvements for impact statements,
                          and ensure your achievements are quantified and
                          ATS-friendly. The analysis covers hard skills, soft
                          skills, and industry-specific terminology.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-2">
                              Keyword Density
                            </h5>
                            <p className="text-green-600 text-sm">
                              Optimal keyword placement and frequency analysis
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-green-700 mb-2">
                              Impact Metrics
                            </h5>
                            <p className="text-green-600 text-sm">
                              Quantified achievements and measurable results
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-16">
                      <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        3
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-xl">
                        <h4 className="font-bold text-xl mb-4 text-purple-900">
                          Score & Recommendations
                        </h4>
                        <p className="text-purple-800 leading-relaxed mb-4">
                          Receive a comprehensive ATS compatibility score
                          (0-100) along with detailed, actionable
                          recommendations. Our system prioritizes suggestions by
                          impact level, so you know exactly which changes will
                          make the biggest difference in your job application
                          success rate.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-700 mb-2">
                              Priority Fixes
                            </h5>
                            <p className="text-purple-600 text-sm">
                              High-impact changes ranked by importance
                            </p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-700 mb-2">
                              Success Tracking
                            </h5>
                            <p className="text-purple-600 text-sm">
                              Monitor improvements with before/after comparisons
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepSection;
