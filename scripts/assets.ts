import {transformImagesToStringBitmaps} from "lib/preflight/bitmapHelper";

function transformSprites() {
    transformImagesToStringBitmaps("assets/sprites", "dist/sprites")
}

transformSprites()