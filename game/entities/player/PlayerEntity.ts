import Entity from "game/entities/Entity.ts";
import type { GameState } from "game/GameState";
import Screen from "game/graphics/Screen"

export default class PlayerEntity extends Entity {
    x: number
    y: number

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
    }


    next(gameState: GameState): void {

        this.x += 1;
        this.y += 1;
    }
    draw(screen: Screen): Screen {
        screen.setPixelsAt(this.x, this.y, this.toString())
        return screen
    }
    toString(): string {
        return placeholder
    }
}

const placeholder = `..00.........0..
..00........00..
..00.......000..
.0000.....00000.
.00000000000000.
0000000000000000
0000000000000000
0000000000000000
0022220000022220
0022220000022220
0000000220000000
0000002222000000
0000002002200000
000000000000000.
..000000000000..
.....00.00.00...`