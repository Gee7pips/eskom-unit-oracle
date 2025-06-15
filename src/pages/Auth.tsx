
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/components/ui/sonner";

// You can swap out the image below for another Unsplash photo later
const loginImage =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80";

type Mode = "login" | "signup";

const Auth: React.FC = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/");
    // eslint-disable-next-line
  }, [user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else toast.success("Logged in successfully!");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (error) toast.error(error.message);
      else toast.success("Signup successful! Check your email to confirm.");
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-[75vh] flex flex-col md:flex-row justify-center items-center bg-gradient-to-br from-blue-900 via-slate-900 to-green-600/80 px-2 py-8">
      <div className="hidden md:flex w-1/2 flex-col justify-center">
        <img
          src={loginImage}
          alt="Login"
          className="rounded-3xl shadow-2xl max-w-full max-h-[430px] object-cover border-4 border-white/40 bg-slate-100 bg-opacity-60"
          style={{
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 50px 0 rgba(24, 31, 62, 0.14)"
          }}
        />
      </div>
      <div className="bg-white/80 dark:bg-slate-900/85 p-8 rounded-2xl shadow-2xl border border-white/30 max-w-sm w-full flex flex-col justify-center glassy-auth-form">
        <h2 className="text-3xl font-playfair font-bold mb-4 text-center text-primary">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h2>
        <form
          onSubmit={handleAuth}
          className="space-y-5"
        >
          <div>
            <Input
              required
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={processing}
            />
          </div>
          <div>
            <Input
              required
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              minLength={6}
              onChange={e => setPassword(e.target.value)}
              disabled={processing}
            />
          </div>
          <Button 
            type="submit"
            className="w-full text-lg font-semibold bg-gradient-to-r from-blue-700 to-green-500 shadow-xl hover:from-green-500 hover:to-blue-700"
            disabled={processing}
          >
            {processing ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
          <div className="text-center text-sm pt-2">
            {mode === "login" ? (
              <>
                Not registered?{" "}
                <button type="button" className="text-primary underline" onClick={() => setMode("signup")}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" className="text-primary underline" onClick={() => setMode("login")}>
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
