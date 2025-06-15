import { useUser } from "@/contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, User as UserIcon, LogOut as LogOutIcon, LogIn as LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import * as React from "react";

const navLinks = [
  { label: "Calculator", to: "/" },
  { label: "Tariffs Explained", to: "/tariffs" },
];

export function Navbar() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { user, signOut } = useUser();

  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 via-primary to-green-600/80 shadow-xl border-b border-primary/15">
      <div className="mx-auto max-w-6xl px-4 py-3 md:py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-playfair font-extrabold tracking-tight text-white drop-shadow-glow"
          style={{
            textShadow:
              "0 2px 8px rgba(26,74,132,0.14),0 1.5px 6px rgba(8,110,50,0.12)",
          }}
        >
          <span className="inline-block bg-white/20 rounded-full px-2 py-0.5 mr-2 animate-fade-in">
            ⚡
          </span>
          EskomCalc Pro
        </Link>
        <div className="hidden md:flex gap-3 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-lg font-semibold font-playfair transition-all ${
                location.pathname === link.to
                  ? "bg-primary/90 text-white shadow"
                  : "text-white/80 hover:bg-white/10 hover:text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/profile" className="px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 text-white/90">
                <UserIcon className="w-5 h-5" /> Profile
              </Link>
              <Button variant="ghost" onClick={signOut} className="text-white flex gap-2 items-center">
                <LogOutIcon className="w-4 h-4" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/auth" className="px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 text-white/90">
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
                className="text-white"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-primary text-white w-60 pt-12">
              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-lg text-base font-medium font-playfair transition-all ${
                      location.pathname === link.to
                        ? "bg-white/20 text-white shadow"
                        : "hover:bg-primary/30"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link to="/profile" className="px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 text-white/90" onClick={() => setOpen(false)}>
                      <UserIcon className="w-4 h-4" /> Profile
                    </Link>
                    <Button variant="ghost" onClick={() => { signOut(); setOpen(false); }} className="text-white flex gap-2 items-center">
                      <LogOutIcon className="w-4 h-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" className="px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 text-white/90" onClick={() => setOpen(false)}>
                    <LogInIcon className="w-4 h-4" /> Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
