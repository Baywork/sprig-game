import type Entity from "game/entities/Entity.ts";
import type {Menu} from "game/ui/menu.ts";
import PlayerEntity from "game/entities/player/PlayerEntity.ts";
import Screen from "game/graphics/Screen"
import type {WebEngineAPI} from "sprig/web";

export class GameState {

    entities: Entity[]
    player: PlayerEntity
    menus: Menu
    screen: Screen
    wHeld: boolean
    sHeld: boolean
    aHeld: boolean
    dHeld: boolean


    constructor(public api: WebEngineAPI) {
        this.player = new PlayerEntity();
        this.screen = new Screen(160, 128)
        this.wHeld = false
        this.sHeld = false
        this.aHeld = false
        this.dHeld = false

        this.api.onInput("a", () => {
            console.log("a")
        })
    }

    tick() {
        this.screen.clear()
        this.player.next(this)
        this.screen = this.player.draw(this.screen)
    }

    toString() {
        return this.screen.toString()
    }
}