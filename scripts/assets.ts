import {transformImagesToStringBitmaps} from "lib/preflight/bitmapHelper";
import {transformImagesToMaps} from "lib/preflight/mapHelper";

function transformSprites() {
    transformImagesToStringBitmaps("assets/sprites", "dist/sprites")
}

function transformMaps() {
    transformImagesToMaps("assets/maps", "dist/maps")
}

transformSprites()
transformMaps()