"use client";
import Link from "next/link";
import { useState, useEffect, useActionState, useRef } from "react";
import "./style.css";

function Square({ value, onSquareClick }: { value: number, onSquareClick: Function }) {
  return <button
    className='square'
    onClick={() => onSquareClick()}>
    {value}
  </button>;
}

const defaultArray: number[] = Array.from({ length: 25 }, (_, i) => i + 1)

export default function Game() {
  const [randomizeArrayElement, setRandomizeArrayElement] = useState<Array<number | any>>([]);
  const [currentNum, setCurrentNum] = useState<number>(1);
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [gameStatusString, setGameStatusString] = useState<String>("Preparing");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const randomizeArray: any[] = [...defaultArray].sort(() => 0.5 - Math.random());
    setRandomizeArrayElement(randomizeArray)
  }, []);


  function handleClick(clickedValue: number) {
    if (currentNum < 26 && clickedValue === currentNum) {
      const numbers = randomizeArrayElement.slice();
      var index = numbers.indexOf(clickedValue);
      numbers[index] = null;
      let nextNum = currentNum + 1
      setRandomizeArrayElement(numbers)
      setCurrentNum(nextNum)
      gameControl()
    }
    console.log(currentNum)
  }

  function gameControl() {
    if (currentNum === 1) {
      setIsGameOn(true)
      handleStart()
      setGameStatusString("Playing")
    }
    else if (currentNum !== 25) {
      return;
    }
    else {
      setIsGameOn(false)
      handlePause()
      setGameStatusString("Game Over")
    }
  }

  function handleStart() {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
  }

  function handlePause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  }

  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

  return (<>
    <div>
      <p>{hours}:{minutes}:{seconds}:{milliseconds}</p>
    </div>
    <div>
      {randomizeArrayElement.slice(0, 5).map((value, index) => (
        <Square value={value} onSquareClick={() => { handleClick(value) }} key={"1-" + index} />
      ))}
      <div></div>
      {randomizeArrayElement.slice(5, 10).map((value, index) => (
        <Square value={value} onSquareClick={() => { handleClick(value) }} key={"2-" + index} />
      ))}
      <div></div>
      {randomizeArrayElement.slice(10, 15).map((value, index) => (
        <Square value={value} onSquareClick={() => { handleClick(value) }} key={"3-" + index} />
      ))}
      <div></div>
      {randomizeArrayElement.slice(15, 20).map((value, index) => (
        <Square value={value} onSquareClick={() => { handleClick(value) }} key={"3-" + index} />
      ))}
      <div></div>
      {randomizeArrayElement.slice(20, 25).map((value, index) => (
        <Square value={value} onSquareClick={() => { handleClick(value) }} key={"3-" + index} />
      ))}
    </div>
    <div>
      {gameStatusString}
    </div>
  </>
  );
}