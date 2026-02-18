import {GrassBody} from "game/body/platform/GrassBody.ts";
import {Body} from "game/body/Body.ts";
import {EarthBody} from "game/body/platform/EarthBody.ts";
import {CloudBody} from "game/body/platform/CloudBody.ts";

const hexReferenceTable = {
    "26dc36": GrassBody,
    "a59041": EarthBody,
    "e2c1ff": CloudBody
}


export const tileHexMap : {[p: string] : (...args : ConstructorParameters<typeof Body>) => Body} = {
    ...Object.fromEntries(Object.entries(hexReferenceTable).map(([key, BodyType])=> [key, (...args: ConstructorParameters<typeof Body>): Body => new BodyType(...args)]))
}