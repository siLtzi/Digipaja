"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050609] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo or site name */}
        <div className="text-center mb-8">
          <h1 
            style={{ fontFamily: "var(--font-goldman)" }}
            className="text-3xl font-bold text-white mb-2"
          >
            DIGIPAJA
          </h1>
          <p className="text-zinc-400 text-sm">
            Sivusto on kehityksessä. Anna salasana jatkaaksesi.
          </p>
        </div>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Salasana"
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#ff8a3c] transition-all ${
                error ? "border-red-500" : "border-white/10"
              }`}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">Väärä salasana</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            style={{ fontFamily: "var(--font-goldman)" }}
            className="w-full py-3 bg-[#ff8a3c] text-white font-semibold rounded-lg hover:bg-[#ff9f5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Ladataan..." : "Avaa sivusto"}
          </button>
        </form>

        {/* Subtle branding */}
        <p className="mt-8 text-center text-zinc-600 text-xs">
          © {new Date().getFullYear()} Digipaja Oulu
        </p>
      </div>
    </div>
  );
}
