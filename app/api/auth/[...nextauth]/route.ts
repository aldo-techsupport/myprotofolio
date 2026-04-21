import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || "";

        console.log("Login attempt:", credentials.username);
        console.log("Expected username:", adminUsername);
        console.log("Hash exists:", !!adminPasswordHash);

        if (credentials.username === adminUsername) {
          const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
          console.log("Password valid:", isValid);
          
          if (isValid) {
            return {
              id: "1",
              name: "Admin",
              email: "admin@localhost"
            };
          }
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
