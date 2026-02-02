import type {GameState} from "game/GameState";
import {Menu} from "game/ui/menu.ts";
import type {InputKey} from "sprig";

export default class MainMenu extends Menu {
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
