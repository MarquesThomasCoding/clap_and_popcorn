import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebaseConfig"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getToSeeMovies = async (userEmail: string, limit?: number) => {
  const userRef = doc(db, "users", userEmail)
  const docSnap = await getDoc(userRef)

  if(docSnap.exists()) {
    const userData = docSnap.data()
    const toSeeMovies = userData.to_see_movies || []
    if(limit) return toSeeMovies.slice(0, limit)
    else return toSeeMovies
  } else {
    return []
  }
}

export const getSeenMovies = async (userEmail: string, limit?: number) => {
  const userRef = doc(db, "users", userEmail)
  const docSnap = await getDoc(userRef)

  if(docSnap.exists()) {
    const userData = docSnap.data()
    const seenMovies = userData.seen_movies || []
    if(limit) return seenMovies.slice(0, limit)
    else return seenMovies
  } else {
    return []
  }
}