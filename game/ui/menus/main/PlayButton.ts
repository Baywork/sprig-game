import type {GameState} from "game/GameState";
import type Screen from "game/graphics/Screen";
import Button from "game/ui/Button";

export default class PlayButton extends Button {
    onClick(gameState: GameState): GameState {
        throw new Error("Method not implemented.");
    }

    next(gameState: GameState): void {
        throw new Error("Method not implemented.");
    }

    draw(screen: Screen): Screen {
        throw new Error("Method not implemented.");
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }
}

