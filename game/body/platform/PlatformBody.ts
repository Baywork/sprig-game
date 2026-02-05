import {Body} from "game/body/Body";

export class PlatformBody extends Body {
    name: string;
    x: number;
    y: number;
    width: 1;
    height: 1;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
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