import PlayerEntity from "game/entities/player/PlayerEntity";
import Screen from "game/graphics/Screen"
import type {WebEngineAPI} from "sprig/web";
import World from "game/world/World";
import Camera from "game/camera/Camera";
import {TestMap} from "game/map/TestMap";

export class GameState {

    player: PlayerEntity
    world: World
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

        this.player = new PlayerEntity(this);
        new TestMap(this)


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