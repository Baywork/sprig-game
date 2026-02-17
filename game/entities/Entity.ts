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
            const dx = potentialX-this.x
            const dy = potentialY-this.y

            const xCollisions: Body[] = this.game.world.getCollidingBodies(dx <= 0 ? potentialX : this.x, this.y, dx <= 0 ? this.x + this.width : potentialX + this.width, this.y + this.height).flat(2).filter((val) => !(val instanceof Entity))
            const yCollisions: Body[] = this.game.world.getCollidingBodies(this.x, potentialY < this.y ? potentialY : this.y, this.x + this.width, potentialY > this.y ? potentialY : this.y + this.height, 12).flat(3).filter((val) => !(val instanceof Entity))
            const xSorted = xCollisions.sort((a, b) => (dx > 0) ? (a.x - b.x) : (b.x - a.x)).filter((body) => dx <= 0 ? body.x <= this.x : body.x >= this.x)

            //if (dx !== 0 ) console.log(xCollisions.sort((a, b) => (dx > 0) ? (a.x - b.x) : (b.x - a.x)))
            if (dx !== 0 && xSorted[0] !== undefined) {
                const collider = xSorted[0]
                if (dx <= 0) {
                    potentialX = collider.x + collider.width
                    console.log("left")
                } else {
                    potentialX = collider.x - this.width
                    console.log("Right")
                }

            }
            const ySorted = yCollisions.sort((a, b) => (dy > 0) ? (a.y - b.y) : (b.y - a.y)).filter((body) => dy <= 0 ? body.y <= this.y : body.y >= this.y)

            if (dy !== 0 && ySorted[0] !== undefined) {
                const collider = ySorted[0]
                if (dy <= 0) {
                    potentialY = collider.y + collider.height
                    console.log("Bottom")
                } else {
                    potentialY = collider.y - this.height
                    console.log('Top')
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