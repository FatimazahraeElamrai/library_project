"use client";

import { useAuth } from "@/app/providers"; // ✅ Importation de l'authentification
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GuardProps {
  allowedRoles: ("admin" | "reader")[]; // ✅ Définition des rôles autorisés
  children: React.ReactNode;
}

export default function Guard({ allowedRoles, children }: GuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("🔍 Vérification d'accès :", user);

    if (!user) {
      console.log("🚨 Redirection vers `/login` car l'utilisateur n'est pas connecté !");
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      console.log("⛔ Accès refusé, redirection vers `/` !");
      router.replace("/");
      return;
    }
  }, [user, router, allowedRoles]);

  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
