"use client";
import Link from "next/link";
import Image from "next/image";
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
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link
          href={"/"}
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <div>
            back to main
          </div>
        </Link>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="p-24">
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
            <Square value={value} onSquareClick={() => { handleClick(value) }} key={"4-" + index} />
          ))}
          <div></div>
          {randomizeArrayElement.slice(20, 25).map((value, index) => (
            <Square value={value} onSquareClick={() => { handleClick(value) }} key={"5-" + index} />
          ))}
        </div>
        <div>
          {gameStatusString}
        </div>
      </div>
    </main>
  </>
  );
}


