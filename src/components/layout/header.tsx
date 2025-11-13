import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">
            EldWorkStudio
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button
            className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 shadow-lg shadow-blue-500/40 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-500/70 hover:scale-105"
          >
            Get in Touch
          </Button>
        </nav>
      </div>
    </header>
  );
}
