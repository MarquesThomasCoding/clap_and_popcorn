import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db, auth } from "@/firebaseConfig"
import { updateProfile } from "firebase/auth"
import { Movie, Serie } from "@/types/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getAuthUser = () => auth.currentUser

const getUserRef = (userUid: string) => doc(db, "users", userUid)

export const getToSeeMovies = async (limit?: number) => {
  const userUid = getAuthUser()?.uid
  if(!userUid) return []
  const docSnap = await getDoc(getUserRef(userUid))

  if(docSnap.exists()) {
    const userData = docSnap.data()
    const toSeeMovies = userData.to_see_movies || []
    if(limit) return toSeeMovies.slice(0, limit)
    else return toSeeMovies
  } else {
    return []
  }
}

export const getSeenMovies = async (limit?: number) => {
  const userUid = getAuthUser()?.uid
  if(!userUid) return []
  const docSnap = await getDoc(getUserRef(userUid))

  if(docSnap.exists()) {
    const userData = docSnap.data()
    const seenMovies = userData.seen_movies || []
    if(limit) return seenMovies.slice(0, limit)
    else return seenMovies
  } else {
    return []
  }
}

export const getToSeeSeries = async (limit?: number) => {
  const userUid = getAuthUser()?.uid
  if(!userUid) return []
  const docSnap = await getDoc(getUserRef(userUid))

  if(docSnap.exists()) {
    const userData = docSnap.data()
    const toSeeSeries = userData.to_see_series || []
    if(limit) return toSeeSeries.slice(0, limit)
    else return toSeeSeries
  } else {
    return []
  }
}

export const getSeenSeries = async (limit?: number) => {
  const userUid = getAuthUser()?.uid
  if(!userUid) return []
  const docSnap = await getDoc(getUserRef(userUid))

  if(docSnap.exists()) {
    const userData = docSnap.data()
    const seenSeries = userData.seen_series || []
    if(limit) return seenSeries.slice(0, limit)
    else return seenSeries
  } else {
    return []
  }
}

export const updateDisplayName = async (newDisplayName: string) => {
  const authUser = getAuthUser()
  try {
    if (authUser) {
      await updateProfile(authUser, {
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
  const authUser = getAuthUser();
  if (!authUser) return false;
  const userId = authUser.uid;
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
    ...(type === "movie" ? { title: (media as Movie).title } : { name: (media as Serie).name }),
    poster_path: media.poster_path,
    release_date: type === "movie" ? (media as Movie).release_date : (media as Serie).first_air_date,
    vote_average: media.vote_average,
    overview: media.overview,
  };

  const authUser = getAuthUser();
  if (authUser) {
    const userUid = authUser.uid;
    if (userUid) {
      const userRef = getUserRef(userUid);
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
    ...(type === "movie" ? { title: (media as Movie).title } : { name: (media as Serie).name }),
    poster_path: media.poster_path,
    release_date: type === "movie" ? (media as Movie).release_date : (media as Serie).first_air_date,
    vote_average: media.vote_average,
    overview: media.overview,
  };
  
  const authUser = getAuthUser();
  if (authUser) {
    const userUid = authUser.uid;
    if (userUid) {
      const userRef = getUserRef(userUid);
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