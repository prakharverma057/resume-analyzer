import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import HeroSection from "~/components/sections/HeroSection";
import IntroSection from "~/components/sections/IntroSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  // Handle redirect after authentication
  useEffect(() => {
    if (auth.isAuthenticated) {
      const next = location.search.split("next=")[1];
      if (next && next !== "/") {
        navigate(decodeURIComponent(next));
      }
    }
  }, [auth.isAuthenticated, location.search, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className=" bg-cover">
      <Navbar />

      <section className=" flex flex-col justify-center items-center">
        <HeroSection />
        <IntroSection />
        <IntroSection />
        <IntroSection />
        <IntroSection />
      </section>
    </main>
  );
}
