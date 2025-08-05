
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:5050",
});

export const { signIn, signOut, useSession } = authClient;

export const loginInWIthGoogle = async () => {
  await signIn.social({
    provider: "google",
    callbackURL: "http://localhost:5173/",            // default for existing users
    newUserCallbackURL: "http://localhost:5173/welcome", // only for new users
  });
};
