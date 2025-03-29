import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const auth = getAuth();


export const updateUserProfile = async (data) => {
  if (!auth.currentUser) {
    throw new Error("User is not logged in");
  }

  try {
    const userRef = doc(db, "users", auth.currentUser.uid); // Вземи референцията към потребителя
    await updateDoc(userRef, data); // Актуализиране на документа
    console.log("Profile updated successfully!");
  } catch (error) {
    console.error("Failed to update profile:", error.message);
    throw error;
  }
};
