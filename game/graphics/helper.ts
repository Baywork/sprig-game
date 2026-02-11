import type {WebEngineAPI} from "sprig/web";

// maximum screen 160x128
export const SCREEN_SPRITE_DIMENSIONS = [10, 8]
export const AVAILABLE_LEGEND_KEYS = "0123456789qwrtyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMāēžščģūīņķļĀŠŽĒČĢŪĪŅĶĻ"


export function drawScreen(api: WebEngineAPI, string: string) {
    const {
        setLegend,
        bitmap,
        map,
        setBackground,
        setMap,
        onInput,
        getFirst,
        afterInput
    } = api

    const charMatrix = string.split("\n").map((row) => row.split(""))

    if (charMatrix.length > SCREEN_SPRITE_DIMENSIONS[1] * 16) throw new Error("Provided string's height is above the maximum allowed")
    if (charMatrix[0].length > SCREEN_SPRITE_DIMENSIONS[0] * 16) throw new Error("Provided string's width is above the maximum allowed")

    // dimensions are charMatrix / 16
    const chunks: [any] = [[]]
    const newLegend: [string, string][] = []

    let y = 0
    let x = 0

    for (const row of charMatrix) {
        const rowNumber = Math.floor(y / 16)

        // y position within the 16x16 chunk
        const subRowNumber = y % 16
        if (subRowNumber === 0) chunks[rowNumber] = new Array(SCREEN_SPRITE_DIMENSIONS[0]).fill([], 0, SCREEN_SPRITE_DIMENSIONS[0])

        for (const char of row) {
            const columnNumber = Math.floor(x / 16)
            if (x % 16 == 0 && y % 16 == 0) chunks[rowNumber][columnNumber][x % 16] = ""
            chunks[rowNumber][columnNumber] += char
            if (x % 16 == 15) chunks[rowNumber][columnNumber] += "\n"

            x++
        }

        x = 0
        y++
    }

    let i = 0
    let newMap = ``
    let addt = ".".repeat(SCREEN_SPRITE_DIMENSIONS[0] - chunks[0].length) + "\n"

    for (const bigRow of chunks) {
        for (const bigGroup of bigRow) {
            newLegend.push([`${AVAILABLE_LEGEND_KEYS[i]}`, bitmap`${bigGroup}`])
            newMap += AVAILABLE_LEGEND_KEYS[i]
            i++
        }
        if (i % (SCREEN_SPRITE_DIMENSIONS[0]) > 0) newMap += ".".repeat(i % SCREEN_SPRITE_DIMENSIONS[0])
        newMap += addt
    }

    setLegend(...newLegend)
    setMap(newMap)
}