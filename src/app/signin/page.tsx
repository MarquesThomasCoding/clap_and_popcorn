"use client";

import { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import useAuth from "@/hooks/useAuth";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

export default function Page(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const router = useRouter();

  useAuth();

  const handleGoogleSignIn = async (): Promise<void> => {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          seen_movies: [],
          to_see_movies: [],
          seen_series: [],
          to_see_series: [],
        });
      }
      router.push("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError((error as Error).message);
    }
  };

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        seen_movies: [],
        to_see_movies: [],
        seen_series: [],
        to_see_series: [],
      });
      setUser(user);
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      {isSignUp ? (
        <SignUp
          handleSignUp={handleSignUp}
          handleGoogleSignIn={handleGoogleSignIn}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />
      ) : (
        <SignIn
          handleLogin={handleLogin}
          handleGoogleSignIn={handleGoogleSignIn}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />
      )}
    </div>
  );
}
