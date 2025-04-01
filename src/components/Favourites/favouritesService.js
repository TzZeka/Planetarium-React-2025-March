import { getFirestore, doc, getDoc, updateDoc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth } from "../../firebase/firebaseConfig";

const db = getFirestore();

// Функция за добавяне в любими
export const addToFavourites = async (itemId) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const userRef = doc(db, "users", auth.currentUser.uid);

  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    await setDoc(userRef, { favourites: [itemId] }); // Създаване на документа, ако липсва
    console.log("Created new user document and added to favourites.");
  } else {
    await updateDoc(userRef, {
      favourites: arrayUnion(itemId),
    });// Добавяне на нова планета
    console.log("Added to favourites.");
  }
};

// Функция за премахване от любими
export const removeFromFavourites = async (itemId) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const userRef = doc(db, "users", auth.currentUser.uid);

  const userDoc = await getDoc(userRef);
  if (!userDoc.exists()) {
    throw new Error("User document does not exist.");
  }

  await updateDoc(userRef, {
    favourites: arrayRemove(itemId),
  });
  console.log("Removed from favourites.");
};

export const getFavourites = async () => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.log("User document does not exist.");
    return [];
  }

  return userDoc.data().favourites || [];
};

// Функция за извличане на пълни данни за любимите планети
export const getFavouritePlanets = async () => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    console.log("User document does not exist.");
    return [];
  }

  const favouriteIds = userDoc.data().favourites || [];
  const planets = [];

  for (const planetId of favouriteIds) {
    const planetRef = doc(db, "planets", planetId);
    const planetDoc = await getDoc(planetRef);
    if (planetDoc.exists()) {
      planets.push({ id: planetId, ...planetDoc.data() }); // Добавяне на пълните данни за всяка планета
    }
  }

  return planets;
};
