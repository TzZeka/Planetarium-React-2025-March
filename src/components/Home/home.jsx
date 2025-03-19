import React from "react";
import Globe from "./rotatingGlobe";

const Home = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
                Welcome to Planetarium
            </h1>
            <Globe />
        </div>
    );
};
export default Home;
