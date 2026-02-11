import type {WebEngineAPI} from "sprig/web";
import {drawScreen} from "game/graphics/helper";
import {sleep} from "game/utils/sleep";
import {GameState} from "game/GameState";

const LOOP_DELAY_MS: number = 50
const SCREEN_WIDTH = 160
const SCREEN_HEIGHT = 128

export async function start(api: WebEngineAPI) {
    const game = new GameState(api)
    let prevTime =  performance.now()
    while (true) {
        const now = performance.now()
        game.tick(now - prevTime)
        drawScreen(api, game.toString())
        prevTime = now
        await sleep(LOOP_DELAY_MS)
    }
}
