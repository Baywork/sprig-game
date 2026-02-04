import type {GameState} from "game/GameState";
import Screen from "game/graphics/Screen"

export default abstract class Entity {
    constructor() {
    }

    abstract next(gameState: GameState): void
    abstract draw(screen: Screen): Screen
    abstract toString(): String
}