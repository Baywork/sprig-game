import type {GameState} from "game/GameState";
import {Body} from "game/body/Body";
import World from "game/world/World";
import {gravityVelocity} from "game/physics/physics.ts";

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
                this.gravityVelocity = gravityVelocity(this.gravityVelocity, deltaTime)
            } else if (this.isOnGround()) {
                this.gravityVelocity = 0
            }


            let potentialX = Math.round((this.xVelocity * deltaTime) / 100) + this.x
            let potentialY = Math.round((this.yVelocity - this.gravityVelocity) * deltaTime / 100) + this.y

            //console.log((this.xVelocity * deltaTime)/1000)
            const xCollisions: Body[] = this.game.world.getCollidingBodies(potentialX, this.y, potentialX + this.width, this.y + this.height).flat(2).filter((val) => val != this)
            const yCollisions: Body[] = this.game.world.getCollidingBodies(this.x, potentialY, this.x + this.width, potentialY + this.height).flat(2).filter((val) => val != this)

            if (potentialY !== this.y) console.log(potentialY)

            for (const collision of xCollisions) {
                // -1:L 1:R

                if (potentialX < collision.x && collision.x + collision.width > potentialX) potentialX = collision.x + collision.width + 1
                else if (potentialX > collision.x) potentialX = collision.x - this.width - 1
            }

            for (const collision of yCollisions) {
                if (collision.y < potentialY && collision.y + collision.height > potentialY) {
                    console.log("y col")
                    potentialY = collision.y + collision.height
                }
                else if (collision.y > potentialY) potentialY = collision.y - this.height - 1
            }
            this.x = potentialX
            this.y = potentialY
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