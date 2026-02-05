import PlayerEntity from "game/entities/player/PlayerEntity";
import Entity from "game/entities/Entity";
import {GameState} from "game/GameState";
import {Body} from "game/body/Body";

export default class World {
    map: Body[][][]
    mapWidth: number
    mapHeight: number
    entities: Entity[]

    // maybe we manage our max width and height somewhere else? dunno for now
    constructor(player: PlayerEntity, width: number, height: number, map: string) {
        this.mapWidth = width;
        this.mapHeight = height
        this.entities = []
        this.map = new Array(width).fill([], 0, width).map(() => new Array(height).fill([], 0, height).map(() => []))

        this.entities.push(player)
    }

    tick(gameState: GameState) {

    }

    getObjectsInRange(minX: number, minY: number, maxX: number, maxY: number) {
        const width = maxX - minX
        const height = maxY - minY

        const res = new Array(width).fill([], 0, width).map(() => new Array(height).fill([], 0, height).map((): Body[] => []))

        for (const entity of this.entities) {
            if (entity.isWithinRange(minX, minY, maxX, maxY)) res[entity.x - minX][entity.y - minY].push(entity)
        }

        for (let x = minX; x < maxX; x++) {
            for (let y = minY; y < maxY; y++) {
                res[x][y].push(...this.map[x][y])
            }
        }

        return res
    }
}