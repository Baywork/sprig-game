import fs from "node:fs";
import Path from "node:path";
import {intToRGBA, Jimp} from "jimp";


export async function transformImageToMap(path) {
    const file = await Jimp.read(path)
    const width = file.width;
    const height = file.height;

    const rows: string[][] = []


    for (let y = 0; y < height; y++) {
        rows[height - y - 1] = ([] as string[]).fill("", 0, width - 1)
        for (let x = 0; x < width; x++) {
            rows[height - y - 1][x] = rgbaToHex(intToRGBA(file.getPixelColor(x, y)))
        }
    }

    return rows.map((row) => row.join(" ")).join("\n")
}

function rgbaToHex({r, g, b, a}) {
    return [r, g, b].map(i => i.toString(16).padStart(2, "0"))
        .join("")
}

export async function transformImagesToMaps(src: string, target: string) {
    const fileNames: string[] = fs.lstatSync(src).isDirectory() ? fs.readdirSync(src) : [Path.basename(src)]
    const dirPath = fs.lstatSync(src).isDirectory() ? src : Path.dirname(src)

    if (!fs.existsSync(Path.dirname(target))) fs.mkdirSync(Path.dirname(target))
    if (!fs.existsSync(target)) fs.mkdirSync(target)

    for (const fileName of fileNames) {
        const path = Path.join(dirPath, fileName)
        const converted = await transformImageToMap(path)

        fs.writeFileSync(Path.join(target, `${fileName.split(".").slice(0, -1).join(".")}.txt`), converted)
    }
}