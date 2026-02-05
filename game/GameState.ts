import type Entity from "game/entities/Entity";
import type {Menu} from "game/ui/menus/menu";
import PlayerEntity from "game/entities/player/PlayerEntity";
import Screen from "game/graphics/Screen"
import type {WebEngineAPI} from "sprig/web";
import World from "game/world/World";
import Camera from "game/camera/Camera";

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


    constructor(public api: WebEngineAPI) {
        this.player = new PlayerEntity();
        this.screen = new Screen(160, 128)
        this.camera = new Camera(160, 120)
        this.wHeld = false
        this.sHeld = false
        this.aHeld = false
        this.dHeld = false
        this.world = new World(this.player, 1000, 200, "")

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

    tick() {
        this.screen.clear()
        this.player.next(this)
        this.screen = this.camera.frame(this, this.screen)

        this.wHeld = false;
        this.sHeld = false;
        this.aHeld = false;
        this.dHeld = false;
    }

    toString() {
        return this.screen.toString()
    }
}