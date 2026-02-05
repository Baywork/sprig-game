import type {GameState} from "game/GameState";
import {Menu} from "game/ui/menus/menu";
import type {InputKey} from "sprig";

export default class MainMenu extends Menu {


    constructor() {
        super();

    }

    onInput(key: InputKey, gameState: GameState): GameState {

        return undefined
    }

    nextFrame(): string {

        return
    }

    draw(screen : Screen) : Screen {

        return screen
    }
}
