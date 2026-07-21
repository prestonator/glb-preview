import { useState } from "react";
import Scene from "./components/Scene";
import "./index.css"; // Import the global styles we updated

function App() {
  const [useCustomEnv, setUseCustomEnv] = useState(true);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Scene useCustomEnv={useCustomEnv} />
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
          Drag to rotate, scroll to zoom.
        </p>
        <label
          style={{
            pointerEvents: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            cursor: "pointer",
            marginTop: "6px",
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
      </div>
    </div>
  );
}

export default App;
