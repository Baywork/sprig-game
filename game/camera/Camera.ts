import Screen from "game/graphics/Screen";
import {GameState} from "game/GameState";

export default class Camera {
    // in our imaginary world units
    width: number
    height: number

    xPos: number
    yPos: number

    constructor(width: number, height: number, originX = 0, originY = 0) {
        this.width = width;
        this.height = height;

        this.xPos = originX;
        this.yPos = originY
    }

    frame(gameState: GameState, screen: Screen): Screen {
        const widthScalar = screen.width/this.width
        const heightScalar = screen.height/this.height
        const world = gameState.world

        if (gameState.player.x && (gameState.player.x-this.xPos > 120) || gameState.player.x - this.xPos < 0) {
            const sign = gameState.player.x > this.xPos ? 1 : -1
            this.xPos += sign * 2
        }

        const entities = world.getRangeBodies(this.xPos, this.yPos, this.width + this.xPos, this.height + this.yPos)

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                for (const entity of entities[x][y]) {
                        screen.setPixelsAt(x, (this.height - y - (entity.height)), entity.sprite())
                }
            }
        }

        return screen
    }
}