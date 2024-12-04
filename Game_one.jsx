import React, { useState, useEffect } from "react";

const colors = ["red", "blue", "orange", "yellow", "green", "purple", "pink"];

const Game1 = () => {
  const [textColor, setTextColor] = useState("");
  const [round, setRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [colorOptions, setColorOptions] = useState([]);

  useEffect(() => {
    const startGame = setTimeout(() => {
      setGameStarted(true);
      generateNewRound();
    }, 2000);

    return () => clearTimeout(startGame);
  }, []);

  const generateNewRound = () => {
    const randomTextColor = colors[Math.floor(Math.random() * colors.length)];
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random()).slice(0, 4);
    if (!shuffledColors.includes(randomTextColor)) {
      shuffledColors[Math.floor(Math.random() * 4)] = randomTextColor;
    }
    setTextColor(randomTextColor);
    setColorOptions(shuffledColors);
  };

  const handleColorClick = (color) => {
    if (color === textColor) {
      if (round === 2) {
        alert("You have won!");
        setRound(0);
        
        let nowwon = 0
        // 设置变量到 localStorage
        if(localStorage.getItem('ini')==1){
          nowwon = 0
        }else{
          nowwon = parseInt(localStorage.getItem('gamesWon'),10);
        }
        localStorage.setItem('gamesWon', nowwon+1); // 假设设置初始值为5
        localStorage.setItem('ini', 0);
        setGameStarted(false);
        setTimeout(() => setGameStarted(true), 2000);
      } else {
        setRound((prevRound) => prevRound + 1);
        generateNewRound();
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Section */}
      <div
        style={{
          background: "#999",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2em",
          visibility: gameStarted ? "visible" : "hidden",
        }}
      >
        <span style={{ color: textColor }}>{textColor}</span>
      </div>

      {/* Right Section */}
      <div
        style={{
          background: "#666",
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "10px",
          padding: "20px",
          visibility: gameStarted ? "visible" : "hidden",
        }}
      >
        {colorOptions.map((color, index) => (
          <div
            key={index}
            onClick={() => handleColorClick(color)}
            style={{
              backgroundColor: color,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Game1;
