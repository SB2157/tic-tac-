import React, { useState, useRef, useEffect } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";
import backgroundMusic from "../Assets/music1.mp3";

const backgrounds = [
  "url('https://source.unsplash.com/1600x900/?nature,water')",
  "url('https://source.unsplash.com/1600x900/?nature,mountain')",
  "url('https://source.unsplash.com/1600x900/?nature,forest')",
  "url('https://source.unsplash.com/1600x900/?nature,beach')",
  "url('https://source.unsplash.com/1600x900/?nature,sky')",
  "url('https://source.unsplash.com/1600x900/?nature,desert')",
];

export const TicTacToe = () => {
  const initialData = ["", "", "", "", "", "", "", "", ""];
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [crossWins, setCrossWins] = useState(0);
  const [circleWins, setCircleWins] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [background, setBackground] = useState(backgrounds[0]);
  const audioRef = useRef(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    audioRef.current.play();
  }, []);

  const checkWinner = (player) => {
    for (let combo of winningCombinations) {
      if (combo.every((index) => data[index] === player)) {
        return true;
      }
    }
    return false;
  };
  console.log("Hello")
  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return;
    }

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = "x";
    } else {
      newData[num] = "o";
    }
    setData(newData);
    setCount(count + 1);

    if (checkWinner(newData[num])) {
      setLock(true);
      setWinner(newData[num]);
      setGamesPlayed(gamesPlayed + 1);
      if (newData[num] === "x") {
        setCrossWins(crossWins + 1);
      } else {
        setCircleWins(circleWins + 1);
      }
    } else if (count === 8) {
      // If all boxes are filled and no winner, set the game as tied
      setLock(true);
      setWinner("tie");
      setGamesPlayed(gamesPlayed + 1);
    }
  };

  const resetGame = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    setWinner(null);
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  };

  const resetScores = () => {
    resetGame();
    setGamesPlayed(0);
    setCrossWins(0);
    setCircleWins(0);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="container" style={{ backgroundImage: background }}>
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop />
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <button className="music-toggle" onClick={toggleMusic}>
        {isMusicPlaying ? "Turn Music Off" : "Turn Music On"}
      </button>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}>{data[0] && <img src={data[0] === "x" ? cross_icon : circle_icon} alt={data[0]} />}</div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}>{data[1] && <img src={data[1] === "x" ? cross_icon : circle_icon} alt={data[1]} />}</div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}>{data[2] && <img src={data[2] === "x" ? cross_icon : circle_icon} alt={data[2]} />}</div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}>{data[3] && <img src={data[3] === "x" ? cross_icon : circle_icon} alt={data[3]} />}</div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}>{data[4] && <img src={data[4] === "x" ? cross_icon : circle_icon} alt={data[4]} />}</div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}>{data[5] && <img src={data[5] === "x" ? cross_icon : circle_icon} alt={data[5]} />}</div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}>{data[6] && <img src={data[6] === "x" ? cross_icon : circle_icon} alt={data[6]} />}</div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}>{data[7] && <img src={data[7] === "x" ? cross_icon : circle_icon} alt={data[7]} />}</div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}>{data[8] && <img src={data[8] === "x" ? cross_icon : circle_icon} alt={data[8]} />}</div>
        </div>
      </div>
      <button className="reset" onClick={resetGame}>New Game</button>
      <button className="reset" onClick={resetScores}>Reset Scores</button>
      {winner && (
        <div className="result">
          {winner === "x" ? "Player X wins!" : winner === "o" ? "Player O wins!" : "It's a tie!"}
        </div>
      )}
      <div className="scoreboard">
        <p>Games Played: {gamesPlayed}</p>
        <p>Player X Wins: {crossWins}</p>
        <p>Player O Wins: {circleWins}</p>
      </div>
    </div>
  );
};
