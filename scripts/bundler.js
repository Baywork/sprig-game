import * as Path from "node:path";
import * as fs from "node:fs";

const appendStr = `
const api = {
        setLegend,
        bitmap,
        map,
        setBackground,
        setMap,
        onInput,
        getFirst,
        afterInput
    }

GameLibrary.start(api)`

export function exportBundledCode(file = Path.join(__dirname, "dist", "bundle.js")) {
    if (!fs.existsSync(file)) throw new Error("File not found.")
    let plaintext = fs.readFileSync(file).toString()
    plaintext += appendStr;
    fs.writeFileSync(file, plaintext)
}

exportBundledCode()