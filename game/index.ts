import type {WebEngineAPI} from "sprig/web";
import {drawScreen} from "game/graphics/helper.ts";
import Screen from "game/graphics/Screen"
import {sleep} from "game/utils/sleep.ts";

const LOOP_DELAY_MS: number = 50
const SCREEN_WIDTH = 160
const SCREEN_HEIGHT = 128

export async function start(api: WebEngineAPI) {
    const {
        setLegend,
        bitmap,
        map,
        setBackground,
        setMap,
        onInput,
        getFirst,
        afterInput
    } = api
    const screen = new Screen(SCREEN_WIDTH, SCREEN_HEIGHT)
    let x = 0
    while (true) {

        screen.setPixelsAt(0, 0, `00000000
00....00
0......0
0......0
00000000
00000000
...0....
...00...
....0...
....0...
...00...
...00...
..000...
.00.00..
.0...0..
00...00.
0......0
0.......`)

     /*   screen.setPixelsAt(x, 5, `..3333...3333..
.333333.333333.
333333333333333
333333333333333
333333333333333
333333333333333
.3333333333333.
..33333333333..
...333333333...
....3333333....
.....33333.....
......333......`)*/

        drawScreen(api, screen.toString())
        x++
        if (x >= SCREEN_WIDTH - 14) x = 0
        await sleep(LOOP_DELAY_MS)
    }
}
