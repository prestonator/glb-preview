import { useState } from "react";
import Scene from "./components/Scene";
import "./index.css"; // Import the global styles we updated

function App() {
  const [useCustomEnv, setUseCustomEnv] = useState(true);
  const [currentStage, setCurrentStage] = useState(1);
  const totalStages = 26;

  const nextStage = () => {
    setCurrentStage((prev) => Math.min(prev + 1, totalStages));
  };

  const prevStage = () => {
    setCurrentStage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Scene useCustomEnv={useCustomEnv} currentStage={currentStage} />
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          fontFamily: "sans-serif",
          zIndex: 10,
          pointerEvents: "none",
          textShadow: "1px 1px 2px black",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>Homestead Model Preview</h1>
        <p style={{ margin: "5px 0", fontSize: "14px", opacity: 0.8 }}>
          Drag to rotate, scroll to zoom. Stage {currentStage} / {totalStages}
        </p>
        <div style={{ pointerEvents: "auto", marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={useCustomEnv}
              onChange={(e) => setUseCustomEnv(e.target.checked)}
              style={{ cursor: "pointer" }}
            />
            Custom Environment
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={prevStage}
              disabled={currentStage === 1}
              style={{
                padding: "8px 12px",
                backgroundColor: currentStage === 1 ? "#555" : "#333",
                color: "white",
                border: "1px solid #666",
                borderRadius: "4px",
                cursor: currentStage === 1 ? "default" : "pointer",
              }}
            >
              Previous Stage
            </button>
            <button 
              onClick={nextStage}
              disabled={currentStage === totalStages}
              style={{
                padding: "8px 12px",
                backgroundColor: currentStage === totalStages ? "#555" : "#333",
                color: "white",
                border: "1px solid #666",
                borderRadius: "4px",
                cursor: currentStage === totalStages ? "default" : "pointer",
              }}
            >
              Next Stage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
