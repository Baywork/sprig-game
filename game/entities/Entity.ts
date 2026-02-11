import type {GameState} from "game/GameState";
import {Body} from "game/body/Body";
import World from "game/world/World";
import {gravityVelocity} from "game/physics/physics.ts";

export default abstract class Entity extends Body {
    xVelocity: number
    yVelocity: number
    gravityVelocity: number
    gravity: boolean

    constructor(x: number, y: number, game: GameState) {
        super(x, y, game);
        this.gravity = true
        this.xVelocity = 0
        this.yVelocity = 0
        this.gravityVelocity = 0
    }

    isOnGround: () => boolean = () => {
        const colliders = this.game.world.getCollidingBodies(this.x + 1, this.y - 1, this.x + this.width - 1, this.y + this.height)
        for (const body of colliders) {
            if (body.y <= this.y) return true
        }
        return false
    }

    abstract onTick(deltaTime: number): void

    nextPhysicsTick(deltaTime: number) {
        if (!this.isOnGround() || Math.abs(this.xVelocity) > 0 || Math.abs(this.yVelocity) > 0) {
            if (!this.isOnGround() && this.gravity) {
                this.gravityVelocity = gravityVelocity(this.gravityVelocity, deltaTime)
            } else if (this.isOnGround()) {
                this.gravityVelocity = 0
            }


            let potentialX = Math.round((this.xVelocity * deltaTime) / 100) + this.x
            let potentialY = Math.round((this.yVelocity - this.gravityVelocity) * deltaTime / 100) + this.y

            //console.log((this.xVelocity * deltaTime)/1000)
            const xCollisions: Body[] = this.game.world.getCollidingBodies(potentialX, this.y, potentialX + this.width, this.y + this.height).flat(2).filter((val) => !(val instanceof Entity))
            const yCollisions: Body[] = this.game.world.getCollidingBodies(this.x, potentialY, this.x + this.width, potentialY + this.height).flat(2).filter((val) => !(val instanceof Entity))

            for (const collision of xCollisions) {
                // -1:L 1:R

                if (potentialX < collision.x) {
                    console.log('Right side collision')
                    potentialX = collision.x - this.width
                    this.xVelocity = 0
                } else if (potentialX < collision.x) {
                    console.log("Left side collision")
                    potentialX = collision.x + collision.width
                    this.xVelocity = 0
                }
            }

            for (const collision of yCollisions) {
                if (collision.y < potentialY) {
                    console.log(`Bottom collision; Relative floor ${collision.y + collision.height} compared to player ${potentialY}`)
                    potentialY = collision.y + collision.height
                    this.yVelocity = 0
                    this.gravityVelocity = 0
                    if ((collision.y + collision.height) >= potentialY) {
                        console.log("Overlap")
                    } else {
                        console.log("Non overlap")
                    }
                } else if (collision.y > potentialY && (potentialY + this.height) > collision.y) {
                    console.log("Top collision")
                    potentialY = collision.y - this.height
                    this.yVelocity = 0
                }
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