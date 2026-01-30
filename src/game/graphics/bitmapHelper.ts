/*
const {palette} = require("./pallette");
const {intToRGBA, Jimp} = require("jimp");
const fs = require('fs')

export async function transformImageToBitmap() {
    const file = await Jimp.read("../../assets/Sprite-0001.png")
    console.log(file)
    const width = file.width;
    const height = file.height;

    const rows: { r: number, g: number, b: number, a: number }[][] = []


    for (let y = 0; y < height; y++) {
        rows[y] = [].fill({}, 0, width - 1)
        for (let x = 0; x < width; x++) {
            rows[y][x] = intToRGBA(file.getPixelColor(x, y))
            console.log(intToRGBA(file.getPixelColor(x, y)))
        }
    }

    const stringified = rows.map((row) => row.map((px) => {
        //console.log(px)
        //console.log(closestPaletteColor(px).item[1])
        return closestPaletteColor(px).item[0]
    }))

    //console.log(stringified)
    return stringified.map((row) => row.join("")).join("\n")
}

function closestPaletteColor(rgba: { r: number, g: number, b: number, a: number }) {
    const {r, g, b, a} = rgba
    return palette.map((paletteItem) => {
        const colors = paletteItem[1]
        return {
            difference: Math.abs(colors[0] - r) + Math.abs(colors[1] - g) + Math.abs(colors[2] - b),
            item: paletteItem
        }
    }).sort((a, b) => a.difference - b.difference)[0]
}

transformImageToBitmap().then((res) =>  fs.writeFileSync("str.txt", res))*/
