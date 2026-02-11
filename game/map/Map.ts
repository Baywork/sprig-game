import {GrassBody} from "game/body/platform/GrassBody.ts";
import type {GameState} from "game/GameState.ts";

export abstract class Map {
    abstract width: number
    abstract height: number

    abstract contents: string

    tileMap: Body[][][]

    constructor(private game: GameState) {
    }

    init() {
        // yx
        const split = this.contents.split("\n").map((row) => row.split(" "))
        this.tileMap = new Array(this.width).fill([], 0, this.width).map((col, x) => new Array(this.height).fill([], 0, this.height).map((bodies, y) => {
            const res = []
            if (split[y][x] == grassTileColor) {

                res.push(new GrassBody(x * this.game.world.distanceUnitResolution, y * this.game.world.distanceUnitResolution, this.game))
            }
            if (split[y][x] == playerSpawnColor) {
                this.game.player.x = x * this.game.world.distanceUnitResolution
                this.game.player.y = y * this.game.world.distanceUnitResolution
            }
            return res
        }))
    }
}

const earthTileColor = "a59041"
const grassTileColor = "26dc36"
const playerSpawnColor = "ef2ab3"
const pickupSpawnColor = "71c6fc"
const goalTileColor = "fe7c01"
const dangerTileColor = "ff1600"