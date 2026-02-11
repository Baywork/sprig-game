import type {GameState} from "game/GameState";
import {Body} from "game/body/Body";
import World from "game/world/World";

export default abstract class Entity extends Body {
    xVelocity: number
    yVelocity: number
    gravityVelocity: number
    isOnGround: () => boolean = () => {
        const colliders = this.game.world.getBodiesCollidingWith(this.expand(1))
        for (const body of colliders) {
            if (body.y <= this.y) return true
        }
        return false
    }

    constructor(x: number, y: number, game: GameState) {
        super(x, y, game);
        this.xVelocity = 0
        this.yVelocity = 0
        this.gravityVelocity = 0
    }

    abstract onTick(deltaTime: number): void

    nextPhysicsTick(deltaTime: number) {
        if (!this.isOnGround() || Math.abs(this.xVelocity) > 0 || Math.abs(this.yVelocity) > 0) {
            if (!this.isOnGround()) {
                this.gravityVelocity += 10 * deltaTime / 1000
            } else if (this.isOnGround()) {
                this.gravityVelocity = 0
            }


            let potentialX = Math.round((this.xVelocity * deltaTime) / 100) + this.x
            let potentialY = Math.round((this.yVelocity - this.gravityVelocity) * deltaTime / 100) + this.y

            //console.log((this.xVelocity * deltaTime)/1000)
            const xCollisions = this.game.world.getCollidingBodies(potentialX, this.y, potentialX + this.width, this.y + this.height).flat(2).filter((val) => val != this)
            const yCollisions = this.game.world.getCollidingBodies(this.x, potentialY, this.x + this.width, potentialY + this.height).flat(2).filter((val) => val != this)

            if (potentialY !== this.y) console.log(potentialY)
            // todo: actually complete collision code. this only checks to see if any body potentially collides and prevents that rather than moving to the maximum possible non collision
            if (xCollisions.length == 0) this.x = potentialX
            if (yCollisions.length == 0) this.y = potentialY
        }
    }


    next(deltaTime: number) {
        this.nextPhysicsTick(deltaTime)
        this.onTick(deltaTime)
    }

    abstract toString(): String

    protected override instantiate(world: World) {
        world.addEntity(this)
    }
}