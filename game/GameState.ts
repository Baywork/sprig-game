import type Entity from "game/entities/Entity.ts";
import type {Menu} from "game/ui/menu.ts";
import PlayerEntity from "game/entities/player/PlayerEntity.ts";
import Screen from "game/graphics/Screen"

export class GameState {

    entities: Entity[]
    player: PlayerEntity
    menus: Menu
    screen: Screen

    constructor() {
        this.player = new PlayerEntity();
        this.screen = new Screen(160, 128)
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