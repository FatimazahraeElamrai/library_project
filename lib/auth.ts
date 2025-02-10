export type Role = "admin" | "reader";

export interface User {
  id: number;
  name: string;
  role: Role;
}

// ✅ Simuler un utilisateur connecté (tu pourras plus tard remplacer cela par une vraie authentification)
export const getCurrentUser = (): User => {
  return {
    id: 1,
    name: "John Doe",
    role: "admin", // 🔄 Change ici pour tester "reader" ou "admin"
  };
};
