import { Github, Coffee, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto flex flex-col items-center gap-6 py-10">
      
      {/* 1. 社交連結區 (Icon Bar) */}
      <div className="flex items-center gap-6">
        
        {/* GitHub */}
        <a
          href="https://github.com/el2k6xjp6/Coffee-Recipes"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-zinc-600 transition-colors hover:text-white"
          aria-label="GitHub Repo"
        >
          <Github size={20} />
        </a>

        {/* Buy Me a Coffee (重點強調) */}
        <a
          href="https://www.buymeacoffee.com/el2k6xjp6"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center rounded-full bg-amber-500/10 p-2 text-amber-500 transition-all hover:scale-110 hover:bg-amber-500 hover:text-zinc-950"
          aria-label="Buy me a coffee"
        >
          <Coffee size={20} strokeWidth={2.5} />
        </a>

        {/* Email 或 個人網站 */}
        <a
          href="mailto:deron@el2k6xjp6.com"
          className="group text-zinc-600 transition-colors hover:text-white"
          aria-label="Contact Me"
        >
          <Mail size={20} />
        </a>
      </div>

      {/* 2. 版權宣告 & 版本號 */}
      <div className="flex flex-col items-center gap-1 text-[10px] tracking-widest text-zinc-600 uppercase">
        <p>© 2026 Coffee Timer. Open Source Project.</p>
        <p className="opacity-50">v1.0.0 • Made with ❤️ by el2k6xjp6</p>
      </div>
    </footer>
  );
}