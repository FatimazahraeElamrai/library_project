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
      name: email.split("@")[0], // ✅ Affichage plus propre du nom
      role: foundUser.role,
      email: foundUser.email,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ Persistance de l'utilisateur

    console.log("🔍 Utilisateur après setUser :", userData);

    // ✅ Ajout d'une légère attente pour que `setUser` se mette à jour avant la redirection
    setTimeout(() => {
      router.push("/");
    }, 50);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100">
      <div className="p-6">
        <Card className="w-96 shadow-lg p-8 bg-white rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Connexion 🔑</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center">
              <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleLogin}>
                Se connecter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
