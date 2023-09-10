import React, { useState, useEffect } from "react";
import {
  startSnakeBody,
  CellType,
  randomPos,
  numCols,
  numRows
} from "../utils/utils";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import GameOver from "./GameOver";

const BoxMain = () => {
  // State Initialization
  const [snakeBody, setSnakeBody] = useState(startSnakeBody);
  const [target, setTarget] = useState(randomPos());
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);

  // Functions
  const resetGame = () => {
    setSnakeBody(startSnakeBody);
    setTarget(randomPos());
    setDirection("RIGHT");
    setGameOver(false);
  };

  const handlefunction = (direct) => {
    switch (direct) {
      case "Up":
        setDirection("UP");
        break;
      case "Down":
        setDirection("DOWN");
        break;
      case "Left":
        setDirection("LEFT");
        break;
      case "Right":
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  // UseEffect
  useEffect(() => {
    if (gameOver) return;

    const moveSnakeBody = () => {
      const newSnakeBody = [...snakeBody];
      const head = { ...newSnakeBody[0] };

      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        default:
          break;
      }

      newSnakeBody.unshift(head);

      if (head.x === target.x && head.y === target.y) {
        setTarget(randomPos());
      } else {
        newSnakeBody.pop();
      }

      if (
        head.x < 0 ||
        head.x >= numCols ||
        head.y < 0 ||
        head.y >= numRows ||
        newSnakeBody
          .slice(1)
          .some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      } else {
        setSnakeBody(newSnakeBody);
      }
    };

    const gameInterval = setInterval(() => {
      moveSnakeBody();
    }, 200);

    return () => {
      clearInterval(gameInterval);
    };
  }, [snakeBody, direction, target, gameOver]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500 || window.innerHeight < 500) {
        setGameOver(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection("UP");
          break;
        case "ArrowDown":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
          setDirection("LEFT");
          break;
        case "ArrowRight":
          setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <Container>
      {gameOver && <GameOver restart={resetGame} gameOver={gameOver} />}
      <Header>Snake Game</Header>
      <Board>
        {Array.from({ length: numRows * numCols }).map((_, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          const cellType = snakeBody.some(
            (segment) => segment.x === col && segment.y === row
          )
            ? CellType.SNAKE
            : target.x === col && target.y === row
            ? CellType.TARGET
            : CellType.EMPTY;

          return (
            <CellComp
              key={index}
              bgC={
                cellType === CellType.SNAKE
                  ? "snake"
                  : cellType === CellType.TARGET
                  ? "target"
                  : ""
              }
            />
          );
        })}
      </Board>

      <ButtonContainer>
        <Button onClick={() => handlefunction("Up")}>
          <KeyboardArrowUpIcon />
        </Button>
        <div>
          <Button onClick={() => handlefunction("Left")}>
            <KeyboardArrowLeftIcon />
          </Button>
          <Button onClick={() => handlefunction("Right")}>
            <KeyboardArrowRightIcon />
          </Button>
        </div>
        <Button onClick={() => handlefunction("Down")}>
          <KeyboardArrowDownIcon />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default BoxMain;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Header = styled.div`
  font-size: 2rem;
  font-weight: 600;
  font-family: cursive;
  margin: 0.5rem 0;
`;
const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-gap: 1px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  justify-content: center;
  width: fit-content;
`;

const CellComp = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) =>
    props.bgC === "snake" ? "green" : props.bgC === "target" ? "red" : "blue"};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  margin: 0.5rem;
  width: 4rem;
  padding: 0.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 2rem;
`;
