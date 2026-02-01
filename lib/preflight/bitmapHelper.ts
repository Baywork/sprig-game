import {palette} from "../dependencies/pallette";
import {intToRGBA, Jimp} from "jimp";
import * as fs from "node:fs";
import * as Path from "node:path";


async function transformImageToBitmap(path: string) {
    const file = await Jimp.read(path)
    const width = file.width;
    const height = file.height;

    const rows: { r: number, g: number, b: number, a: number }[][] = []


    for (let y = 0; y < height; y++) {
        rows[y] = ([] as { r: number, g: number, b: number, a: number }[]).fill({r: 0, g: 0, b: 0, a: 0}, 0, width - 1)
        for (let x = 0; x < width; x++) {
            rows[y][x] = intToRGBA(file.getPixelColor(x, y))
        }
    }

    const stringified = rows.map((row) => row.map((px) => {
        return closestPaletteColor(px).item[0]
    }))

    return stringified.map((row) => row.join("")).join("\n")
}

function closestPaletteColor(rgba: { r: number, g: number, b: number, a: number }) {
    const {r, g, b, a} = rgba
    if (a == 0) {
        return {difference: 0, item: ['.', [0, 0, 0, 0]]}
    }
    return palette.map((paletteItem) => {
        const colors = paletteItem[1]
        return {
            difference: Math.abs(colors[0] - r) + Math.abs(colors[1] - g) + Math.abs(colors[2] - b),
            item: paletteItem
        }
    }).sort((a, b) => a.difference - b.difference)[0]
}

async function transformImagesToStringBitmaps(src: string, target: string) {
    const fileNames: string[] = fs.lstatSync(src).isDirectory() ? fs.readdirSync(src) : [Path.basename(src)]
    const dirPath = fs.lstatSync(src).isDirectory() ? src : Path.dirname(src)

    if (!fs.existsSync(Path.dirname(target))) fs.mkdirSync(Path.dirname(target))
    if (!fs.existsSync(target)) fs.mkdirSync(target)

    for (const fileName of fileNames) {
        const path = Path.join(dirPath, fileName)
        const converted = await transformImageToBitmap(path)

        fs.writeFileSync(Path.join(target, `${fileName.split(".").slice(0, -1).join(".")}.txt`), converted)
    }
}

transformImagesToStringBitmaps("../../assets/sprites", "../../dist/sprites")