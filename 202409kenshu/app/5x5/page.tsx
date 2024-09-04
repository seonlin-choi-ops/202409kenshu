"use client";
import Link from "next/link";
import { ReactElement, useState, useEffect } from "react";
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
  let [squareMatrixElement, setSquareMatrixElement] = useState<ReactElement[]>([]);

  useEffect(() => {
    const randomizeArray: any[] = [...defaultArray].sort(() => 0.5 - Math.random());
    const tempBody: ReactElement[] = []
    let indexCounter: number = 0

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let t = randomizeArray[indexCounter]
        let e = <Square value={t} onSquareClick={() => { handleClick(t) }} key={t} />
        tempBody.push(e)
        indexCounter++
      }
      tempBody.push(<div key={"row" + i}></div>)
    }

    setSquareMatrixElement(tempBody)
  }, []);

  function handleClick(clickedValue: number) {
    console.log(clickedValue)
  }

  return squareMatrixElement
}