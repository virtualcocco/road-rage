import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-bold text-lg mb-2">
              <span className="text-red-500">You Suck</span>{" "}
              <span className="text-zinc-400">At Driving</span>
            </p>
            <p className="text-sm text-zinc-500">
              A humor and pattern-tracking project. Not to start a mob. Not to
              dox anybody. Just to turn everyday traffic insanity into stories,
              patterns, and possibly a T-shirt.
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-300 mb-2">Pages</p>
            <div className="space-y-1">
              <Link href="/report" className="block text-sm text-zinc-500 hover:text-white transition-colors">Report a Driver</Link>
              <Link href="/archetypes" className="block text-sm text-zinc-500 hover:text-white transition-colors">Driver Types</Link>
              <Link href="/trends" className="block text-sm text-zinc-500 hover:text-white transition-colors">Trends</Link>
              <Link href="/merch" className="block text-sm text-zinc-500 hover:text-white transition-colors">Merch</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-zinc-300 mb-2">Follow Us</p>
            <div className="space-y-1">
              <a href="https://www.tiktok.com/@yousuckatdrivingnet" target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-500 hover:text-red-400 transition-colors">TikTok</a>
              <a href="https://www.instagram.com/usuckatdriving/" target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-500 hover:text-red-400 transition-colors">Instagram</a>
              <a href="https://x.com/Usuckatdriving" target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-500 hover:text-red-400 transition-colors">X (Twitter)</a>
              <a href="https://www.threads.com/@usuckatdriving" target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-500 hover:text-red-400 transition-colors">Threads</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-sm text-zinc-600">
            Drive better. Or become content. &copy; {new Date().getFullYear()} yousuckatdriving.net
          </p>
        </div>
      </div>
    </footer>
  );
}
