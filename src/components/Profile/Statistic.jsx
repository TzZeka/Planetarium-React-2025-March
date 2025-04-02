import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../contexts/AuthContext"; // Предполага се, че имате контекст за аутентификация// Ако имате специфичен CSS

export const Statistics = () => {
  const { user } = useAuth();
  const [planetCount, setPlanetCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const planetsRef = collection(db, "planets");
    const q = query(planetsRef, where("createdBy", "==", user.uid));

    // onSnapshot слуша промените в реално време и обновява броя
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPlanetCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <section className="stats-section">
      <h2>Statistics</h2>
      <div className="stats-counters">
        <div className="stat-counter">
          <span className="stat-value">{planetCount}</span>
          <span className="stat-label">Planets Created</span>
        </div>
      </div>
    </section>
  );
};
