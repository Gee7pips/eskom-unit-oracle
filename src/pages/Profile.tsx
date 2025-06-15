
import React, { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

export default function Profile() {
  const { user, profile, updateProfile, loading } = useUser();
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
  }, [profile?.first_name, profile?.last_name]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!user) return <div className="text-center p-8 text-red-500">Not logged in</div>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await updateProfile({ first_name: firstName, last_name: lastName });
    setSaving(false);
    if (error) toast.error(error);
    else toast.success("Profile updated.");
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <form onSubmit={handleUpdate} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold mb-3 text-center">Your Profile</h2>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email-profile">
            Email
          </label>
          <Input id="email-profile" value={profile?.email || ""} disabled />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="first-name-profile">
            First Name
          </label>
          <Input
            id="first-name-profile"
            value={firstName}
            placeholder="First Name"
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="last-name-profile">
            Last Name
          </label>
          <Input
            id="last-name-profile"
            value={lastName}
            placeholder="Last Name"
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <Button className="w-full" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
}
