import type {GameState} from "game/GameState";
import {generateBodyFromHex} from "game/map/transformer/transformer";

export abstract class Map {
    abstract width: number
    abstract height: number

    abstract contents: string

    protected constructor(private game: GameState) {}

    init() {
        // yx
        const split = this.contents.split("\n").map((row) => row.split(" "))
        split.forEach((col, y) => {
            col.forEach((hex, x) => {
                generateBodyFromHex(hex, x, y, this.game.world.distanceUnitResolution, this.game)
            })
        })
    }
}