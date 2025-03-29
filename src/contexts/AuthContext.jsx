import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig"; // Импорт на Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Добавяме състояние за зареждане

  // Функция за логин
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
  };

  // Функция за регистрация
  const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
  };

  // Функция за изход
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Проверка за потребител при презареждане на страницата
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Задаваме текущия потребител
      setLoading(false); // Спираме зареждането
    });

    return () => unsubscribe(); // Спира слушането при излизане от компонента
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children} {/* Показваме children само след зареждане */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
