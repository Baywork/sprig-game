import Entity from "game/entities/Entity";
import {GameState} from "game/GameState";
import {Body} from "game/body/Body";

export default class World {
    map: Body[][][]
    mapWidth: number
    mapHeight: number
    entities: Entity[]

    bufferSize: number = 16
    distanceUnitResolution: number = 12

    // maybe we manage our max width and height somewhere else? dunno for now
    constructor(width: number, height: number, map: string) {
        this.mapWidth = width;
        this.mapHeight = height
        this.entities = []
        this.map = new Array(width).fill([], 0, width).map(() => new Array(height).fill([], 0, height).map(() => []))
    }

    tick(gameState: GameState) {

    }

    getRangeBodies(minX: number, minY: number, maxX: number, maxY: number) {
        const width = maxX - minX
        const height = maxY - minY

        const res = new Array(width).fill([], 0, width).map(() => new Array(height).fill([], 0, height).map((): Body[] => []))

        for (let x = minX; x < maxX; x++) {
            for (let y = minY; y < maxY; y++) {

                if (this.map[x][y] && this.map[x][y].length > 0) {
                    for (const body of this.map[x][y]) {
                        if (body.isWithinRange(minX, minY, maxX, maxY)) res[x - minX][y - minY].push(body)
                    }

                    res[x - minX][y - minY].push(...this.map[x][y])
                }
            }
        }
        for (const entity of this.entities) {
            // todo: this is NOT a fix.
            try {

                if (entity.isWithinRange(minX, minY, maxX, maxY)) {
                    if (entity.x < minX || entity.y < minY) {
                        console.log("range resolution overlapped with out of bounds entity")

                    } else {
                        res[entity.x - minX][entity.y - minY].push(entity)
                    }
                }
            } catch (e) {
                console.error(e)
                console.log(`${entity.x} - ${minX}`)
                console.log(`${entity.y} - ${minY}`)
            }
        }

        return res
    }

    getBodiesCollidingWith(body: Body, searchRadius: number = this.bufferSize) {
        const xA = body.x;
        const yA = body.y;
        const xB = body.x + body.width;
        const yB = body.y + body.width;


        return this.getCollidingBodies(xA, yA, xB, yB, searchRadius)
    }


    getCollidingBodies(xA: number, yA: number, xB: number, yB: number, searchRadius: number = this.bufferSize) {
        const res = []
        let lowerX = xA - searchRadius
        let lowerY = yA - searchRadius

        if (lowerX < 0) lowerX = 0;
        if (lowerY < 0) lowerY = 0;

        const slice = this.map.slice(lowerX, xB + searchRadius).map((column) => column.slice(lowerY, yB + searchRadius))
        for (const row of slice) {
            for (const col of row) {
                for (const body of col) {
                    if (body.isWithinRange(xA, yA, xB, yB)) res.push(body)
                }
            }
        }
        return res
    }


    addBody(body: Body) {
        this.map[body.x][body.y].push(body)
        if (body.width > this.bufferSize) this.bufferSize = body.width
        if (body.height > this.bufferSize) this.bufferSize = body.height
    }

    addEntity(entity: Entity) {
        this.entities.push(entity)
        if (entity.width > this.bufferSize) this.bufferSize = entity.width
        if (entity.height > this.bufferSize) this.bufferSize = entity.height
    }
}