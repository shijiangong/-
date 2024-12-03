import React, { useState, useEffect } from "react";

const Game2 = () => {
  const [timeLimit, setTimeLimit] = useState(10);
  const [goal, setGoal] = useState(5);
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState("onboarding"); // "onboarding", "playing", "end"
  const [lastAccuracy, setLastAccuracy] = useState(null);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        if (score < goal) spawnTarget();
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (gameState === "playing" && timeLeft === 0) {
      endGame();
    }
  }, [gameState, timeLeft]);

  const spawnTarget = () => {
    const newGrid = Array(10).fill(null).map(() => Array(10).fill(false));
    const targetX = Math.floor(Math.random() * 10);
    const targetY = Math.floor(Math.random() * 10);
    newGrid[targetX][targetY] = true;
    setGrid(newGrid);
  };

  const handleTargetClick = (x, y) => {
    if (grid[x][y]) {
      setScore((prev) => prev + 1);
      setGrid(Array(10).fill(null).map(() => Array(10).fill(false))); // Clear the target
      if (score + 1 >= goal) {
        setTimeout(() => {
          alert("You have won!");
          endGame();
        }, 100);
      }
    } else {
      setMisses((prev) => prev + 1);
    }
  };

  const startGame = () => {
    setScore(0);
    setMisses(0);
    setTimeLeft(timeLimit);
    setGameState("playing");
    spawnTarget();
  };

  const endGame = () => {
    const accuracy = (score / (score + misses)) * 100 || 0;
    setLastAccuracy(accuracy.toFixed(2));
    setGameState("end");
  };

  const restartGame = () => {
    setGameState("onboarding");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {gameState === "onboarding" && (
        <div>
          <h2>Aimlabs Game</h2>
          <div>
            <label>Time Limit (seconds): </label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Goal: </label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
            />
          </div>
          <button onClick={startGame}>START</button>
          {lastAccuracy && <p>Accuracy of your previous game: {lastAccuracy}%</p>}
        </div>
      )}

      {gameState === "playing" && (
        <div>
          <h2>Time Left: {timeLeft}s</h2>
          <h3>Score: {score}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gridGap: "2px",
              margin: "20px auto",
              width: "500px",
              height: "500px",
            }}
          >
            {grid.map((row, x) =>
              row.map((cell, y) => (
                <div
                  key={`${x}-${y}`}
                  onClick={() => handleTargetClick(x, y)}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {cell && (
                    <div
                      style={{
                        width: "50%",
                        height: "50%",
                        backgroundColor: "red",
                        borderRadius: "50%",
                      }}
                    ></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {gameState === "end" && (
        <div>
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <p>Your accuracy: {lastAccuracy}%</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game2;
