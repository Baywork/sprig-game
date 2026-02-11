import World from "game/world/World";
import {GameState} from "game/GameState";

export abstract class Body {
    x: number
    y: number

    game: GameState
    abstract width: number

    abstract height: number

    abstract name: string
    abstract sprite(): string

    isWithinRange(minX: number, minY: number, maxX: number, maxY: number) {
        const upperX = this.width + this.x
        const upperY = this.height + this.y

        return (minX < upperX && maxX > this.x && minY < upperY && maxY > this.y)
    }

    constructor(x: number, y: number, game: GameState) {
        this.x = x
        this.y = y
        this.game = game

        this.instantiate(game.world)
    }

    /**
     * Returns the body with the width and height incremented by 2*by and the x and y offset by by
     * @param by
     */
    expand(by: number){
        const copy: Body = Object.assign({}, this)
        copy.x -= by
        copy.y -= by
        copy.width += 2*by
        copy.height += 2*by
        return copy
    }

    protected instantiate(world: World) {
        world.addBody(this)
    }
}