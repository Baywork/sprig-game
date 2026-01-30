"use client"
import {webEngine} from "sprig/web"
import {useEffect} from "react";
import {start} from "game/index";
import clsx from "clsx";

export default function GameWindowComponent({width, className = ""}: { width: number, className?: string}) {
    useEffect(() => {
        const engine = webEngine(document.getElementById("canvas") as HTMLCanvasElement)
        start(engine.api)
    }, []);

    return (<>
        <canvas className={clsx("border-2 w-fit", className)} width={width} height={(width * 4) / 5} id="canvas" tabIndex={0}></canvas>
    </>)

}