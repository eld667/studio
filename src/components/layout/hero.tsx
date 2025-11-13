import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center h-screen">
      <div className="container relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent [filter:drop-shadow(0_0_10px_rgba(59,130,246,0.5))]">
          EldWorkStudio
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          Premium Web Solutions.
        </p>
        <Button
          size="lg"
          className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 shadow-lg shadow-blue-500/40 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-500/70 hover:scale-105"
        >
          Explore Our Work
        </Button>
      </div>
    </section>
  );
}
