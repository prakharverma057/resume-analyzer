import React from "react";

const IntroSection = () => {
  const introPoints: {
    id: number;
    title: string;
    description: string;
  }[] = [
    {
      id: 1,
      title: "Who are we?",
      description:
        "Pathora is a student led project aimed to helping job seekers and students get their dream company by optimizing their resumes as per the company's ATS.",
    },
    {
      id: 2,
      title: "How do we do it?",
      description:
        "We are backed by AI models which are trained on various ATS and generate a results. We use leading NLP models like sonnet-4 and GPT-4 with custom fine tuning to get the accurate score.",
    },
    {
      id: 3,
      title: "What you get?",
      description:
        "You get a detailed report on how well your resume is optimized for ATS, along with AI-powered suggestions to improve it. You also get a score out of 100 which indicates how well your resume is optimized for ATS.",
    },
    {
      id: 4,
      title: "What we base our interpretation on?",
      description:
        "Similar to an ATS, we analyze and attempt to comprehend your resume. The greater our understanding of your resume, the more effectively it aligns with a company's ATS.",
    },
    {
      id: 5,
      title: "What our analyzer identifies",
      description:
        "Although an ATS doesn't look for spelling mistakes and poorly crafted content, recruitment managers certainly do. The second part of our score is based on the quantifiable achievements you have in your resume and the quality of the written content.",
    },
  ];

  return (
    <div className="w-full bg-transparent">
      {/* First Section */}
      <section className="px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-20 w-full">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16"
            style={{ minHeight: "100vh" }}
          >
            {/* Content Column */}
            <div className="w-full lg:w-1/2 xl:w-3/5 order-2 lg:order-1">
              <div className="flex flex-col gap-6 sm:gap-8 pb-20">
                <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-wide text-center lg:text-left">
                  Who are we? What is Pathora's Resume Analyzer?
                </h1>
                <p className="text-gray-500 font-medium text-sm sm:text-base lg:text-lg leading-relaxed">
                  Getting rejected after applying even having apt skills and
                  experience? This could be due to low score of your resume
                  given by company's ATS. <br />
                  <br />
                  That's why the success of your resume is highly dependent on
                  how optimized your resume is for the job you're applying for,
                  the resume template you're using, and what skills and keywords
                  you have included. <br />
                  <br />A Resume Checker is a tool or software used to evaluate
                  and improve resumes. It checks for proper formatting, relevant
                  keywords (important for Application Tracking Systems), grammar
                  and spelling errors, and content relevance.
                </p>

                {/* Dynamic rendering */}
                <div className="flex flex-col gap-6 sm:gap-8 mt-4">
                  {introPoints.map(({ id, title, description }) => (
                    <div key={id} className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex rounded-full bg-[#CDF0E4] w-12 h-12 sm:w-14 sm:h-14 items-center justify-center text-xl sm:text-2xl text-[#329A71] font-semibold">
                        {id}
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-medium">
                        {title}
                      </h2>
                      <p className="text-gray-500 font-medium text-sm sm:text-base lg:text-lg leading-relaxed">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Extra content to create scroll height */}
                <div className="flex flex-col gap-8 mt-12">
                  <h3 className="text-xl lg:text-2xl font-semibold">
                    Advanced Features
                  </h3>

                  <div className="grid gap-6">
                    <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm">
                      <h4 className="font-semibold text-lg mb-3 text-blue-600">
                        Smart Parsing Technology
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Our advanced parsing engine can handle complex resume
                        layouts, tables, columns, and graphics that often break
                        standard ATS systems.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          PDF Support
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          Complex Layouts
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          Multi-column
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm">
                      <h4 className="font-semibold text-lg mb-3 text-green-600">
                        Industry-Specific Analysis
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Get targeted feedback based on your specific industry,
                        role level, and career goals with our comprehensive
                        industry database.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Tech Industry
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Healthcare
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Finance
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Marketing
                        </span>
                      </div>
                    </div>

                    <div className="border border-gray-200 p-6 rounded-xl bg-white shadow-sm">
                      <h4 className="font-semibold text-lg mb-3 text-purple-600">
                        Real-time Optimization
                      </h4>
                      <p className="text-gray-600 mb-4">
                        See instant results as you make changes, with live
                        scoring and suggestions that update in real-time as you
                        optimize your resume.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Live Scoring
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Instant Feedback
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Progress Tracking
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Image Column */}
            <div className="w-full lg:w-1/2 xl:w-2/5 order-1 lg:order-2">
              <div
                className="hidden lg:block"
                style={{
                  position: "sticky",
                  top: "8rem",
                  height: "fit-content",
                }}
              >
                <img
                  src="https://enhancv.com/_next/static/images/ats-checker-716fd8ba725f0a2f6ed622ea30fb0538.svg"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg mx-auto"
                  alt="ATS Checker"
                />
              </div>
              {/* Mobile/Tablet Image */}
              <div className="block lg:hidden">
                <img
                  src="https://enhancv.com/_next/static/images/ats-checker-716fd8ba725f0a2f6ed622ea30fb0538.svg"
                  className="w-full max-w-sm sm:max-w-md h-auto rounded-lg mx-auto"
                  alt="ATS Checker"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroSection;
