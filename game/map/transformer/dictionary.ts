import {GrassBody} from "game/body/platform/GrassBody.ts";
import {Body} from "game/body/Body.ts";
import {EarthBody} from "game/body/platform/EarthBody.ts";
import {CloudBody} from "game/body/platform/CloudBody.ts";

export const tileHexMap: {[p: string] : (...args : ConstructorParameters<typeof Body>) => Body} = {
    "26dc36": (...args: ConstructorParameters<typeof Body>): Body => new GrassBody(...args),
    "a59041": (...args: ConstructorParameters<typeof Body>): Body => new EarthBody(...args),
    "e2c1ff": (...args: ConstructorParameters<typeof Body>): Body => new CloudBody(...args)
}