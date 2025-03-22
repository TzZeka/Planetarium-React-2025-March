import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";

const db = getFirestore();

// Създаване на нов елемент
export const createItem = async (collectionName, data) => {
  if (!auth.currentUser) throw new Error("User not logged in");

  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdBy: auth.currentUser.uid,
    createdAt: new Date(),
  });
  return docRef.id;
};

// Получаване на всички елементи
export const getItems = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Получаване на конкретен елемент
export const getItem = async (collectionName, id) => {
  if (!collectionName || !id) {
    throw new Error("Collection name or ID is undefined");
  }

  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Item does not exist");
    }
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};

// Обновяване на елемент
export const updateItem = async (collectionName, id, updatedData) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Изтриване на елемент
export const deleteItem = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
