
import { useUser } from "@/contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, User as UserIcon, LogOut as LogOutIcon, LogIn as LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as React from "react";

const navLinks = [
  { label: "Calculator", to: "/" },
  { label: "Tariffs Explained", to: "/tariffs" },
  { label: "Blog", to: "/blog" },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { user, signOut } = useUser();

  // Glassglow/Glassmorphism style
  return (
    <nav className="fixed top-0 w-full z-30">
      <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/70 shadow-xl border-b border-primary/10 rounded-b-2xl mx-auto max-w-none px-0 md:px-0 py-2">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-playfair font-extrabold tracking-tight drop-shadow-lg text-primary dark:text-white"
            style={{
              textShadow: "0 2px 8px rgba(26,74,132,0.14),0 1.5px 6px rgba(8,110,50,0.12)"
            }}
          >
            <span className="inline-block bg-gradient-to-br from-blue-300 to-green-300/40 rounded-full px-2 py-0.5 mr-2 animate-fade-in backdrop-blur">{/* icon spot */}⚡</span>
            EskomCalc Pro
          </Link>
          <div className="hidden md:flex gap-2 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-lg font-semibold font-playfair transition-all hover:opacity-100 ${
                  location.pathname === link.to
                    ? "bg-gradient-to-r from-blue-700/80 to-green-500/80 text-white shadow-lg border border-white/30 backdrop-blur"
                    : "text-primary/90 dark:text-white/80 hover:bg-white/10 hover:backdrop-blur-[2px] hover:text-blue-800/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90">
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
              <Link to="/auth" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90">
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
              <SheetContent side="left" className="bg-white/80 dark:bg-slate-900/90 text-primary dark:text-white w-60 pt-12 shadow-2xl backdrop-blur-2xl">
                <nav className="flex flex-col gap-4 mt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`px-4 py-2 rounded-xl text-base font-medium font-playfair transition-all ${
                        location.pathname === link.to
                          ? "bg-gradient-to-br from-blue-300/60 to-green-200/50 text-blue-900 shadow"
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {user ? (
                    <>
                      <Link to="/profile" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90" onClick={() => setOpen(false)}>
                        <UserIcon className="w-4 h-4" /> Profile
                      </Link>
                      <Button variant="ghost" onClick={() => { signOut(); setOpen(false); }} className="text-primary dark:text-white flex gap-2 items-center rounded-xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-300/80">
                        <LogOutIcon className="w-4 h-4" /> Logout
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" className="px-3 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 text-primary dark:text-white/90" onClick={() => setOpen(false)}>
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
