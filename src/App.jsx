import "./App.css";
import React, { useState } from "react";
import useCatAPI from "./hooks/useCatAPI";
import AttributeList from "./components/AttributeList";
import BanList from "./components/BanList";
import CatCard from "./components/CatCard";

export default function App() {
  const [banList, setBanList] = useState([]);
  const { cat, loading, error, fetchCat } = useCatAPI(banList);

  const handleBan = (key, value) => {
    const newBan = `${key}:${value}`;
    setBanList((prev) =>
      prev.includes(newBan)
        ? prev.filter((x) => x !== newBan)
        : [...prev, newBan]
    );
  };

  return (
    <div className="app-container">
      <div className="main-card">
        {/* LEFT SIDE */}
        <div className="left-panel">
          <div className="intro-text">
            <h1>Veni Vici!</h1>
            <p>Discover cats from your wildest dreams!</p>
            <p className="emoji-line">😺🐱😻🙀😹😼🐈</p>
          </div>

          {error && <p className="error-text">{error}</p>}
          {loading && <p>Loading cat...</p>}

          <CatCard cat={cat} loading={loading} error={error} />

          {cat && (
            <div className="attributes-wrapper">
              <AttributeList
                cat={cat}
                banList={banList}
                toggleBan={handleBan}
              />
            </div>
          )}

          <button className="discover-btn" onClick={fetchCat}>
            Discover!
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          <h2>Ban List</h2>
          <p className="ban-instruction">Select an attribute to ban it</p>
          <BanList
            banList={banList}
            removeBan={(b) =>
              setBanList((prev) => prev.filter((x) => x !== b))
            }
          />
        </div>
      </div>
    </div>
  );
}
