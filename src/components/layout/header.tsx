import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onGetInTouchClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Header({ onGetInTouchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/eldwork-logo.png"
            alt="EldWorkStudio Logo"
            width={140}
            height={32}
            className="relative z-10"
          />
        </Link>
        <nav className="flex items-center gap-4">
          <Button
            onClick={onGetInTouchClick}
            className="font-semibold text-primary-foreground bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_rgba(192,132,252,0.7)] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_10px_rgba(192,132,252,1)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          >
            Get in Touch
          </Button>
        </nav>
      </div>
    </header>
  );
}
