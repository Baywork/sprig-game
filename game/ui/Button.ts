import type {GameState} from "game/GameState.ts";
import type Screen from "game/graphics/Screen.ts";

export default abstract class Button {
    abstract onClick(gameState: GameState): GameState

    abstract next(gameState: GameState): void

    abstract draw(screen: Screen): Screen

    abstract toString(): string
}