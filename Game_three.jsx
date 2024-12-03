import React, { useState } from "react";

const TowerOfHanoi = () => {
  const [numBlocks, setNumBlocks] = useState(null);
  const [towers, setTowers] = useState([[], [], []]);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState("setup"); // "setup", "playing", "won"
  const [draggedBlock, setDraggedBlock] = useState(null); // Track the dragged block

  const initializeGame = (blocks) => {
    if (!blocks || blocks <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }
    const initialTower = Array.from({ length: blocks }, (_, i) => blocks - i);
    setTowers([initialTower, [], []]);
    setNumBlocks(blocks);
    setMoves(0);
    setGameState("playing");
  };

  const handleDragStart = (towerIndex) => {
    const sourceTower = towers[towerIndex];
    if (sourceTower.length > 0) {
      setDraggedBlock({ towerIndex, block: sourceTower[sourceTower.length - 1] });
    }
  };

  const handleDrop = (targetIndex) => {
    if (!draggedBlock) return;

    const { towerIndex: sourceIndex, block } = draggedBlock;
    const sourceTower = [...towers[sourceIndex]];
    const targetTower = [...towers[targetIndex]];

    if (
      sourceIndex !== targetIndex &&
      (targetTower.length === 0 || block < targetTower[targetTower.length - 1])
    ) {
      sourceTower.pop();
      targetTower.push(block);

      setTowers((prevTowers) =>
        prevTowers.map((tower, i) =>
          i === sourceIndex ? sourceTower : i === targetIndex ? targetTower : tower
        )
      );
      setMoves((prevMoves) => prevMoves + 1);

      if (targetTower.length === numBlocks && targetIndex === 2) {
        setGameState("won");
      }
    }

    setDraggedBlock(null); // Clear dragged block
  };

  const resetGame = () => {
    setGameState("setup");
    setTowers([[], [], []]);
    setMoves(0);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {gameState === "setup" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h2>Select Number of Blocks</h2>
          <input
            type="number"
            placeholder="Enter number of blocks"
            onKeyDown={(e) => {
              if (e.key === "Enter") initializeGame(Number(e.target.value));
            }}
            style={{ padding: "10px", width: "100px", margin: "10px 0" }}
          />
          <button
            onClick={() => initializeGame(Number(document.querySelector("input").value))}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <h2>Moves: {moves}</h2>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            {towers.map((tower, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDrop={() => handleDrop(index)}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  flex: 1,
                  minHeight: "200px",
                  border: "3px solid #999",
                  margin: "0 10px",
                  position: "relative",
                  backgroundColor: draggedBlock?.towerIndex === index ? "#f0f8ff" : "transparent",
                }}
              >
                {/* Base */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    width: "80%",
                    height: "10px",
                    backgroundColor: "#333",
                    transform: "translateX(-50%)",
                  }}
                ></div>
                {/* Blocks */}
                {tower.map((block, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      bottom: `${i * 20}px`,
                      left: "50%",
                      width: `${block * 20}px`,
                      height: "20px",
                      backgroundColor: `hsl(${block * 60}, 70%, 50%)`,
                      transform: "translateX(-50%)",
                      cursor: "grab",
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === "won" && (
        <div>
          <h2>Success in {moves} moves!</h2>
          <div
            style={{
              width: "200px",
              height: "50px",
              margin: "20px auto",
              backgroundColor: "#fff",
              border: "10px dashed #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14pt",
            }}
          >
            Success in {moves} moves
          </div>
          <button
            onClick={resetGame}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      )}

      {/* Display the dragged block */}
      {draggedBlock && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${draggedBlock.block * 20}px`,
            height: "20px",
            backgroundColor: `hsl(${draggedBlock.block * 60}, 70%, 50%)`,
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        ></div>
      )}
    </div>
  );
};

export default TowerOfHanoi;
