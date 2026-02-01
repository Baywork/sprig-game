import {transformImagesToStringBitmaps} from "lib/preflight/bitmapHelper.ts";

function transformSprites() {
    transformImagesToStringBitmaps("assets/sprites", "dist/sprites")
}

transformSprites()