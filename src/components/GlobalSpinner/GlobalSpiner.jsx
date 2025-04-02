// GlobalSpinner.js
import React from "react";
import RingLoader from "react-spinners/RingLoader";
import { useLoading } from "../../contexts/LoadingContext";

const GlobalSpinner = () => {
  const { loading } = useLoading();

  return (
    loading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(17, 17, 17, 0.98)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <RingLoader color="#00ffcc" size={150} />
      </div>
    )
  );
};

export default GlobalSpinner;
