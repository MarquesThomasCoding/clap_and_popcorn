"use client";

import { useState, useEffect } from "react";
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

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const router = useRouter();

  useAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists) {
        await setDoc(userDocRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          seen_movies: [],
          to_see_movies: [],
        });
      }
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        seen_movies: [],
        to_see_movies: [],
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
