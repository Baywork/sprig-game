import type {GameState} from "game/GameState.ts";
import {Body} from "game/body/Body.ts";
import {tileHexMap} from "game/map/transformer/dictionary.ts";

const mapKeys = Object.keys(tileHexMap)

const playerSpawn =  "ef2ab3"
export function generateBodyFromHex(hex: string, x: number, y: number, distanceResolution: number, game: GameState) {
    if (hex == "000000") return
    if (mapKeys.includes(hex)) {
        tileHexMap[hex](x * distanceResolution, y * distanceResolution, game)
    }
    if (hex == playerSpawn) {
        game.player.x = x * distanceResolution;
        game.player.y = y * distanceResolution;
        game.player.xVelocity = 0;
        game.player.yVelocity = 0;
    }
}