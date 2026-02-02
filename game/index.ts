import type {WebEngineAPI} from "sprig/web";
import {drawScreen} from "game/graphics/helper.ts";
import Screen from "game/graphics/Screen"
import {sleep} from "game/utils/sleep.ts";
import {GameState} from "game/GameState.ts";

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

    const game = new GameState()
    while (true) {
        game.tick()
        drawScreen(api, game.toString())
        await sleep(LOOP_DELAY_MS)
    }
}
