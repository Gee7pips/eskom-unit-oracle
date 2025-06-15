import { useUser } from "@/contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, User as UserIcon, LogOut as LogOutIcon, LogIn as LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as React from "react";
import { Sparkle } from "lucide-react";

const navLinks = [
  { label: "Calculator", to: "/" },
  { label: "Tariffs Explained", to: "/tariffs" },
  { label: "Blog", to: "/blog" },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { user, signOut } = useUser();

  // "Premium" look: add gradient bar, drop shadows, more polish, subtle hover, active indicator, and a special logo icon.
  return (
    <nav className="fixed top-0 w-full z-40">
      {/* Premium top bar shimmer & highlight */}
      <div className="h-[4px] w-full bg-gradient-to-r from-blue-400 via-green-300 to-teal-400 animate-fade-in" />
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/75 shadow-2xl border-b border-primary/10 rounded-b-2xl mx-auto max-w-none px-0 py-2 transition-all duration-200">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-playfair font-extrabold tracking-tight drop-shadow-lg text-primary dark:text-white"
            aria-label="EskomCalc Pro Home"
            style={{ textShadow: "0 2px 8px rgba(26,74,132,0.16),0 1.5px 6px rgba(8,110,50,0.14)" }}
          >
            <span className="inline-block bg-gradient-to-tr from-blue-300 to-green-300/60 rounded-full p-2 mr-2 shadow-md animate-fade-in">
              <Sparkle className="w-6 h-6 text-primary drop-shadow" />
            </span>
            EskomCalc <span className="font-bold bg-gradient-to-tr from-green-400 to-blue-400 bg-clip-text text-transparent ml-1">Pro</span>
          </Link>
          <div className="hidden md:flex gap-2 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-xl text-lg font-semibold font-playfair transition-all hover:opacity-100
                  ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-blue-700/90 to-green-500/90 text-white shadow-xl border border-white/60 backdrop-blur after:content-[''] after:absolute after:bottom-1 after:left-5 after:w-2/3 after:h-1 after:bg-green-300 after:rounded-full after:animate-pulse"
                      : "text-primary/95 dark:text-white/80 hover:bg-white/20 hover:backdrop-blur-[2px] hover:scale-[1.06]"
                  }
                `}
                style={{ transition: "box-shadow 0.18s, transform 0.12s" }}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90 font-semibold transition-all">
                  <UserIcon className="w-5 h-5" /> Profile
                </Link>
                <Button
                  variant="ghost"
                  onClick={signOut}
                  className="text-primary dark:text-white flex gap-2 items-center rounded-xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-300/80"
                >
                  <LogOutIcon className="w-4 h-4" /> Logout
                </Button>
              </>
            ) : (
              <Link to="/auth" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90 font-semibold transition-all">
                <LogInIcon className="w-5 h-5" /> Login
              </Link>
            )}
          </div>
          {/* Mobile */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                  className="text-primary dark:text-white"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white/95 dark:bg-slate-900/90 text-primary dark:text-white w-60 pt-12 shadow-2xl backdrop-blur-2xl border-r-2 border-primary/10">
                <nav className="flex flex-col gap-4 mt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`relative px-4 py-2 rounded-xl text-base font-medium font-playfair transition-all
                        ${
                          location.pathname === link.to
                            ? "bg-gradient-to-br from-blue-300/70 to-green-200/60 text-blue-900 shadow after:content-[''] after:absolute after:bottom-1 after:left-9 after:w-14 after:h-1 after:bg-green-300 after:rounded-full"
                            : "hover:bg-primary/10 hover:scale-[1.05]"
                        }
                      `}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {user ? (
                    <>
                      <Link to="/profile" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90 font-semibold transition-all" onClick={() => setOpen(false)}>
                        <UserIcon className="w-4 h-4" /> Profile
                      </Link>
                      <Button variant="ghost" onClick={() => { signOut(); setOpen(false); }} className="text-primary dark:text-white flex gap-2 items-center rounded-xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-300/80">
                        <LogOutIcon className="w-4 h-4" /> Logout
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90 font-semibold transition-all" onClick={() => setOpen(false)}>
                      <LogInIcon className="w-5 h-5" /> Login
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
