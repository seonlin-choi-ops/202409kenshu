"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import "./style.css";

//三目並べと一緒（多分）
function Square({ value, onSquareClick }: { value: number, onSquareClick: Function }) {
  return <button
    className='square'
    onClick={() => onSquareClick()}>
    {value}
  </button>;
}

//1-25までのnumber配列
const defaultArray: number[] = Array.from({ length: 25 }, (_, i) => i + 1)
//デフォルト関数（MAIN的な）
export default function Game() {
  //ランダムになったnumber配列
  const [randomizeArrayElement, setRandomizeArrayElement] = useState<Array<number | any>>([]);
  //今押押下する番号
  const [currentNum, setCurrentNum] = useState<number>(1);
  //ゲーム進行中なのか確認
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  //画面に表示する為のゲーム状態を表せる文字列
  const [gameStatusString, setGameStatusString] = useState<String>("Preparing");
  //タイマー
  const [time, setTime] = useState(0);
  //タイマー動いてるかどうか
  const [isRunning, setIsRunning] = useState(false);
  //これ勉強して、useRefってなんでしょう。
  const intervalRef = useRef<any>(null);

  //defaultArray (1-25までの配列)を順番ランダムの配列に変更する
  //const randomArray = Array.from(randomizeArrayElement);

  //なぜあえてuesEffectの中にいれてるのか？
  useEffect(() => {
    //中身埋めて
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
  }, []);

  //Squareがクリックされたときの動き
  function handleClick(clickedValue: number) {
    //今押すべき番号を確認、
    //押された番号の確認、
    //上記2つの数字を比べて、どうにか処理する。
    //if(random[i]順番に押されているかを比較){
    //押されたボタンの表示を消す
    //}else{
    //ボタンを押せない処理
    //}else if(最初と最後のボタンが押されたら){
    //gameControlの関数を呼ぶ
    //}
    //
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
  }

  //今ゲーム中なのか、ゲーム中じゃないかの判断。
  //handleClick関数の中で呼ばれる想定、だったけどほかの良い手があればそっちでやっても良し
  function gameControl() {
    //
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
    /************************************************************************************/
  }

  //タイマースタート関数
  function handleStart() {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
  }

  //タイマーポーズ関数
  function handlePause() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  //タイマー定時関数（今は特に使わない。もう一回遊ぶとかリセット機能が出来たら使うかも。）
  function handleReset() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  }

  //タイマー表示の為の変数たち
  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);

  //画面表示用りたーん
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

    <div>
        <Link href="/">
          メインに戻る
        </Link>
      </div>
  </>
  );
}