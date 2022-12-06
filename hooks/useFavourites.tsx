import { getAuth } from "firebase/auth";
import { doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestoreDb } from "../firebase/clientApp";
import { Post } from "../types/Post";

export const useFavourtes = (post?: Post) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [isFavourite, setisFavourite] = useState(false);

  const [document, setDocument] = useState<DocumentData | undefined>();
  if (user) onSnapshot(doc(firestoreDb, "favourites", user.uid), (doc) => setDocument(doc.data()));

  useEffect(() => {
    if (!document || !post) return;
    setisFavourite(document.favourites.some((favourite: Post) => favourite.timestamp.toString() === router.query.id));
  }, [document, post, router.query.id]);

  const toggleFavourite = async () => {
    if (!user || !document) return;
    if (!isFavourite) await updateDoc(doc(firestoreDb, "favourites", user.uid), { favourites: [...document.favourites, post] });
    else {
      await updateDoc(doc(firestoreDb, "favourites", user.uid), {
        favourites: document.favourites.filter((favourite: Post) => favourite.timestamp.toString() !== router.query.id),
      });
    }
  };

  return { toggleFavourite, isFavourite, setisFavourite, favouriteDocument: document, user };
};
