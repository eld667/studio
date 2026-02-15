
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { FadeIn } from "@/app/FadeIn";

interface HeroProps {
  onExploreClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export function Hero({ onExploreClick, children }: HeroProps) {
  return (
    <section className="relative w-full flex flex-col items-center justify-center h-screen">
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20 [filter:drop-shadow(0_0_30px_rgba(59,130,246,0.5))]">
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          <Code className="w-full h-full text-blue-500 animate-pulse" />
        </div>
      </div>
      <div className="container relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent text-zinc-100 [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
            We Don't Just Build Websites. We Craft Digital Solutions.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>{children}</FadeIn>
        <FadeIn delay={0.4}>
          <Button
            size="lg"
            onClick={onExploreClick}
            className="font-bold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          >
            Explore Our Work
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
