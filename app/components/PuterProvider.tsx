import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";

interface PuterProviderProps {
  children: React.ReactNode;
}

export function PuterProvider({ children }: PuterProviderProps) {
  const { init } = usePuterStore();
  
  useEffect(() => {
    init();
  }, [init]);

  return <>{children}</>;
}