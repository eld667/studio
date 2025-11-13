import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[calc(100vh-theme(spacing.14))] w-full">
      <div className="container relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
          EldWorkStudio
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          Premium Web Solutions.
        </p>
        <Button
          size="lg"
          className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 hover:opacity-90 transition-opacity"
        >
          Explore Our Work
        </Button>
      </div>
    </section>
  );
}
