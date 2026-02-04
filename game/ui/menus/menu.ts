import type {InputKey} from "sprig";
import type {GameState} from "game/GameState";

export abstract class Menu {
    abstract onInput(key: InputKey, gameState: GameState): GameState
    abstract nextFrame(): string
}