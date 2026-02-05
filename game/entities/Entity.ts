import type {GameState} from "game/GameState";
import Screen from "game/graphics/Screen"
import {Body} from "game/body/Body";

export default abstract class Entity extends Body {


    abstract next(gameState: GameState): void

    abstract draw(screen: Screen): Screen

    abstract toString(): String
}