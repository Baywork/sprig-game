import Entity from "game/entities/Entity";
import type {GameState} from "game/GameState";

export default class PlayerEntity extends Entity {
    width: number;
    height: number;
    name: string;
    actionable: boolean

    constructor(game: GameState) {
        super(24, 12, game);

        this.xVelocity = 0;
        this.yVelocity = 0;

        this.width = 16;
        this.height = 16

        this.gravityVelocity = 0;

        this.actionable = true;
    }

    sprite(): string {
        return placeholder
    }

    onTick(deltaTime: number): void {
        if (Math.abs(this.xVelocity) > 0) {
            this.xVelocity = Math.floor(Math.abs(this.xVelocity) / 2) * this.xVelocity / Math.abs(this.xVelocity)
        }
        if (Math.abs(this.yVelocity) > 0) {
            this.yVelocity = Math.floor(Math.abs(this.yVelocity) / 2) * this.yVelocity / Math.abs(this.yVelocity)
        }

        if (Math.abs(this.xVelocity) <= 4 && Math.abs(this.yVelocity) <= 4) {
            if (this.game.wHeld) {
                this.yVelocity += dashVeloAdd
            }
            if (this.game.sHeld) {
                this.yVelocity -= dashVeloAdd
            }
            if (this.game.aHeld) {
                this.xVelocity -= dashVeloAdd
            }
            if (this.game.dHeld) {
                this.xVelocity += dashVeloAdd
            }
        } else {
            if (this.game.wHeld || this.game.sHeld || this.game.aHeld || this.game.dHeld) {
                console.log("Tried to perform an action while inactionable")
            }
        }

        if (this.x < 0) this.x = 0
        if (this.y < 0) this.y = 0
    }

    toString(): string {
        return placeholder
    }
}

const dashVeloAdd = 13
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