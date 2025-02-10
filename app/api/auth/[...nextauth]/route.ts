// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        // Logique pour vérifier les informations d'identification de l'utilisateur
        // Par exemple, interroger votre base de données pour valider l'utilisateur
        const user = {
          id: "1",
          name: "Admin",
          email: "admin@example.com",
          role: "admin",
        };
        if (
          credentials?.email === user.email &&
          credentials?.password === "password"
        ) {
          return user;
        }
        return null;
      },
    }),
    // Ajoutez d'autres fournisseurs si nécessaire
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
