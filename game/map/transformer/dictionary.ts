import {GrassTile} from "game/body/tiles/GrassTile";
import {Body} from "game/body/Body";
import {EarthTile} from "game/body/tiles/EarthTile";
import {CloudTile} from "game/body/tiles/CloudTile";

const hexReferenceTable = {
    "26dc36": GrassTile,
    "a59041": EarthTile,
    "e2c1ff": CloudTile
}


export const tileHexMap : {[p: string] : (...args : ConstructorParameters<typeof Body>) => Body} = {
    ...Object.fromEntries(Object.entries(hexReferenceTable).map(([key, BodyType])=> [key, (...args: ConstructorParameters<typeof Body>): Body => new BodyType(...args)]))
}