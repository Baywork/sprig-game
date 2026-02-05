import Entity from "game/entities/Entity";
import type {GameState} from "game/GameState";
import Screen from "game/graphics/Screen"

export default class PlayerEntity extends Entity {
    x: number
    y: number

    xVelo: number
    yVelo: number

    gravityVelocity: number

    actionable: boolean
    isOnGround: boolean

    constructor() {
        super();
        this.x = 0;
        this.y = 0;

        this.xVelo = 0;
        this.yVelo = 0;

        this.width = 16;
        this.height = 16

        this.gravityVelocity = 0;

        this.actionable = true;
        this.isOnGround = false;
    }


    next(gameState: GameState): void {
        if (Math.abs(this.xVelo) > 0) {
            this.xVelo = Math.floor(Math.abs(this.xVelo) - 1) * this.xVelo/Math.abs(this.xVelo)
        }
        if (Math.abs(this.yVelo) > 0) {
            this.yVelo = Math.floor(Math.abs(this.yVelo) - 1) * this.yVelo/Math.abs(this.yVelo)
        }

        if (this.xVelo == 0 && this.yVelo == 0) {
            if (gameState.wHeld) {
                this.yVelo += dashVeloAdd
            }
            if (gameState.sHeld) {
                this.yVelo -= dashVeloAdd
            }
            if (gameState.aHeld) {
                this.xVelo -= dashVeloAdd
            }
            if (gameState.dHeld) {
                this.xVelo += dashVeloAdd
            }
        }

        this.x += this.xVelo;
        this.y += this.yVelo;
        if (this.x < 0) this.x = 0
        if (this.y < 0) this.y = 0
    }

    draw(screen: Screen): Screen {
        screen.setPixelsAt(this.x, this.y, this.toString())
        return screen
    }

    toString(): string {
        return placeholder
    }
}

const dashVeloAdd = 3
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