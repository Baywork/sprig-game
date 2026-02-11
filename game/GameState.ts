import type Entity from "game/entities/Entity";
import type {Menu} from "game/ui/menus/menu";
import PlayerEntity from "game/entities/player/PlayerEntity";
import Screen from "game/graphics/Screen"
import type {WebEngineAPI} from "sprig/web";
import World from "game/world/World";
import Camera from "game/camera/Camera";
import {GrassBody} from "game/body/platform/GrassBody.ts";
import {TestMap} from "game/map/testmap.ts";

export class GameState {

    entities: Entity[]
    player: PlayerEntity
    world: World
    menus: Menu
    camera: Camera
    screen: Screen
    wHeld: boolean
    sHeld: boolean
    aHeld: boolean
    dHeld: boolean
    deltaTime: number

    constructor(public api: WebEngineAPI) {
        this.screen = new Screen(160, 128)
        this.camera = new Camera(160, 128)
        this.wHeld = false
        this.sHeld = false
        this.aHeld = false
        this.dHeld = false
        this.world = new World(1000, 200, "")

        for (let i = 0; i < this.world.mapWidth; i++) {
            if (i % this.world.distanceUnitResolution == 0) {
                this.world.map[i][0].push(new GrassBody(i, 0, this))
            }
        }
        this.player = new PlayerEntity(this);

        const map = new TestMap(this)


        this.deltaTime = 0


        this.api.onInput("a", () => {
            this.aHeld = true
        })
        this.api.onInput("d", () => {
            this.dHeld = true
        })
        this.api.onInput("w", () => {
            this.wHeld = true
        })
        this.api.onInput("s", () => {
            this.sHeld = true
        })
    }

    tick(deltaTime: number) {

        this.screen.clear()
        this.player.next(deltaTime)
        this.screen = this.camera.frame(this, this.screen)

        this.deltaTime = deltaTime

        this.wHeld = false;
        this.sHeld = false;
        this.aHeld = false;
        this.dHeld = false;
    }

    toString() {
        return this.screen.toString()
    }
}