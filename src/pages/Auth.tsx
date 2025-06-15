
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/components/ui/sonner";

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
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <form
        onSubmit={handleAuth}
        className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold mb-3 text-center">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h2>
        <div>
          <Input
            required
            type="email"
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
            placeholder="Password"
            value={password}
            minLength={6}
            onChange={e => setPassword(e.target.value)}
            disabled={processing}
          />
        </div>
        <Button type="submit" className="w-full" disabled={processing}>
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
  );
};

export default Auth;
