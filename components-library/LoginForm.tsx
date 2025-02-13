"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/app/providers";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "reader@example.com", password: "reader123", role: "reader" },
  ];

  const handleLogin = () => {
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    console.log("✅ Utilisateur trouvé :", foundUser);

    const userData = {
      id: Date.now(),
      name: email.split("@")[0],
      role: foundUser.role,
      email: foundUser.email,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    setTimeout(() => {
      router.push("/");
    }, 50);
  };

  return (


    


    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-90 backdrop-blur-md">
    <div className="w-full sm:w-1/2 h-1/2 max-w-3xl p-6 sm:p-10 rounded-xl shadow-xl bg-white flex flex-col justify-center">
  
  <Card className="w-full h-full shadow-lg p-12 bg-white rounded-xl flex flex-col justify-center">

          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold flex items-center justify-center gap-3">
              Connexion <span className="text-yellow-500 text-4xl">🔑</span> {/* ✅ Icône plus grande */}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow justify-center">
  {error && <p className="text-red-500 text-center">{error}</p>}

  {/* ✅ Regroupe tous les champs + bouton avec espacement homogène */}
  <div className="flex flex-col gap-6 mt-4">  
    <Input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="p-4 text-lg border border-gray-300 rounded-lg focus:outline-none"
    />
    <Input
      type="password"
      placeholder="Mot de passe"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="p-4 text-lg border border-gray-300 rounded-lg focus:outline-none"
    />
    <Button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg"
      onClick={handleLogin}
    >
      Se connecter
    </Button>
  </div>
</CardContent>


        </Card>
      </div>
    </div>
  );
}
