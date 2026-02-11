import {Body} from "game/body/Body";
import World from "game/world/World";
import {GameState} from "game/GameState";

export class GrassBody extends Body {
    name: string;
    width: number = 12;
    height: number = 12;

    constructor(x: number, y: number, game: GameState) {
        super(x, y, game);
    }


    sprite(): string {
        return `444444444444
444444444444
444444444444
44C44C4C44C4
CCCCCCCCCCCC
1CCLCCCCCLCC
CCCCCC1CCCCC
CCCCCCCCCC1C
CCLCCCCLCCCC
CCCCCCCCCCCC
C1CC1CCCCC1C
CCCCCCCCCCCC`;
    }

}