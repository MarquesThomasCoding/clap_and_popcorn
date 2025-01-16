import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db, auth } from "@/firebaseConfig"
import { updateProfile } from "firebase/auth"
import { Movie, Serie } from "@/types/types"

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

export const updateDisplayName = async (newDisplayName: string) => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      return { success: true };
    } else {
      throw new Error('No authenticated user found');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
  }
};

export const checkMediaInSeenList = async (mediaId: number, type: "movie" | "serie") => {
  if (!auth.currentUser) return false;
  const userId = auth.currentUser.uid;
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    const seenList = type === "movie" ? userData.seen_movies || [] : userData.seen_series || [];
    return seenList.some((media: Movie | Serie) => media.id === mediaId);
  } else {
    return false;
  }
};

export const addToSeeMedia = (media: Movie | Serie, type: "movie" | "serie") => {
  const mediaToSee = <Movie | Serie>{
    id: media.id,
    title: type === "movie" ? (media as Movie).title : (media as Serie).name,
    poster_path: media.poster_path,
    release_date: type === "movie" ? (media as Movie).release_date : (media as Serie).first_air_date,
    vote_average: media.vote_average,
    overview: media.overview,
  };

  if (auth.currentUser) {
    const userUid = auth.currentUser.uid;
    if (userUid) {
      const userRef = doc(db, "users", userUid);
      const updateField = type === "movie" ? "to_see_movies" : "to_see_series";
      updateDoc(userRef, {
        [updateField]: arrayUnion(mediaToSee),
      })
        .then(() => {
          return { success: true, message: `Film ajouté à la liste 'à voir'` };
        })
        .catch((error) => {
          console.error(`Erreur lors de l'ajout du ${type} à la liste 'à voir' : `, error);
          return { success: false, message: error };
        });
    } else {
      console.log("Utilisateur non connecté");
      return { success: false, message: "Utilisateur non connecté" };
    }
  } else {
    console.log("Utilisateur non connecté");
    return { success: false, message: "Utilisateur non connecté" };
  }
};

export const addSeenMedia = (media: Movie | Serie, type: "movie" | "serie") => {
  const mediaSeen = <Movie | Serie>{
    id: media.id,
    title: type === "movie" ? (media as Movie).title : (media as Serie).name,
    poster_path: media.poster_path,
    release_date: type === "movie" ? (media as Movie).release_date : (media as Serie).first_air_date,
    vote_average: media.vote_average,
    overview: media.overview,
  };
  
  if (auth.currentUser) {
    const userUid = auth.currentUser.uid;
    if (userUid) {
      const userRef = doc(db, "users", userUid);
      const updateField = type === "movie" ? "seen_movies" : "seen_series";
      updateDoc(userRef, {
        [updateField]: arrayUnion(mediaSeen),
      })
        .then(() => {
          return { success: true, message: `Film ajouté à la liste 'vus'` };
        })
        .catch((error) => {
          console.error(`Erreur lors de l'ajout du ${type} à la liste 'vus' : `, error);
          return { success: false, message: error };
        });
    } else {
      console.log("Utilisateur non connecté");
      return { success: false, message: "Utilisateur non connecté" };
    }
  } else {
    console.log("Utilisateur non connecté");
    return { success: false, message: "Utilisateur non connecté" };
  }
};