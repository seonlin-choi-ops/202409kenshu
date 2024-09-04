"use client";
import Link from "next/link";
import { ReactElement, useState, useEffect, cloneElement } from "react";
import "./style.css";

function Shuffle(targetArray: number[]) {
  //const [resultArray , setResultArray] = useState<number[]>(structuredClone(targetArray));
  const resultArray :number[] = structuredClone(targetArray)
  let currentIndex: number = resultArray.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [resultArray[currentIndex], resultArray[randomIndex]] = [
      resultArray[randomIndex], resultArray[currentIndex]];
  }

  return resultArray;
}

function Square({value, onSquareClick}:{value:number, onSquareClick:Function}) {
  return <button 
    className='square' 
    onClick={()=>onSquareClick()}>
      {value}
  </button>;
}


function BuildSquareMatrix(resultArray : number[], handleClick : Function) {
  const tempBody : ReactElement[] = []
  let indexCounter : number = 0
  for (let i = 0 ; i < 5 ; i ++){
    for(let j = 0 ; j < 5 ;  j ++){
      let t = resultArray[indexCounter]
      console.log(t)
      let e = <Square value={resultArray[indexCounter]} onSquareClick={() => {handleClick(t)}} key={t} />
      tempBody.push(e)
      indexCounter++
    }
    tempBody.push(<div key={"row"+i}></div>)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+i)
  }
  //setMatrixBody([...tempBody])
  return tempBody
}

function BuildSquareMatrixTest(resultArray : number[], handleClick : Function) {
  let [matrixBody , setMatrixBody] = useState<ReactElement[]>([]);
  const tempBody : ReactElement[] = []
  let indexCounter : number = 0
  for (let i = 0 ; i < 5 ; i ++){
    for(let j = 0 ; j < 5 ;  j ++){
      let t = resultArray[indexCounter]
      console.log(t)
      let e = <Square value={resultArray[indexCounter]} onSquareClick={() => {handleClick(t)}} key={t} />
      tempBody.push(e)
      indexCounter++
    }
    tempBody.push(<div key={"row"+i}></div>)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+i)
  }
  //setMatrixBody([...tempBody])
  matrixBody = [...tempBody]
  return tempBody
}

export default function Game() {
  const [numArray , setNumArray] = useState<number[]>(Array.from({ length: 25 }, (_, i) => i + 1));
  const [resultArray , setResultArray] = useState<number[]>(Shuffle(numArray));
  const [gamingArray , setGamingArray] = useState<number[]>([]);
  function handleClick(clickedValue : number){
    console.log(clickedValue)
  }
  //const tempBody : ReactElement[] = BuildSquareMatrix( resultArray, handleClick )
  //console.log(tempBody)

  const tempBody : ReactElement[] = []
  let indexCounter : number = 0

  /*
  for (let i = 0 ; i < 5 ; i ++){
    for(let j = 0 ; j < 5 ;  j ++){
      let t = resultArray[indexCounter]
      console.log(t)
      let e = <Square value={resultArray[indexCounter]} onSquareClick={() => {handleClick(t)}} key={t} />
      tempBody.push(e)
      indexCounter++
    }
    tempBody.push(<div key={"row"+i}></div>)
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+i)
  }

  */

  useEffect(()=>{
    for(let j = 0 ; j < 5 ;  j ++){
      let t = resultArray[indexCounter]
      console.log(t)
      let e = <Square value={resultArray[indexCounter]} onSquareClick={() => {handleClick(t)}} key={t} />
      tempBody.push(e)
      indexCounter++
    }
    return ()=>{
      console.log(tempBody)
      tempBody;
    }
  })
  

    


  const testB : ReactElement[] = []

  return tempBody
}

