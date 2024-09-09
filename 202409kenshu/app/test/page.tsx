"use client";

import { useEffect, useState } from "react";
import { testConsole } from "./logic.js";
const array = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }];

export default function IndexPage() {
    const [randomArray, setRandomArray] = useState<any[]>([]);

    useEffect(() => {
        const randomizeArray: any[] = [...array].sort(() => 0.5 - Math.random());
        setRandomArray(randomizeArray);
    }, []);

    console.log(randomArray)
    return (<>
        <div>
            {randomArray.map((s, id) => (
                <div key={id}>
                    <h2>{s.name}</h2>
                </div>
            ))}
        </div>
        <button onClick={() => { testConsole() }}>
            test
        </button>
    </>
    );
}