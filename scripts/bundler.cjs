const Path = require("node:path");
const fs  = require("node:fs");

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
function exportBundledCode(file = Path.join(process.cwd(), "dist", "bundle.js")) {
    if (!fs.existsSync(file)) throw new Error("File not found.")
    let plaintext = fs.readFileSync(file).toString()
    plaintext += appendStr;
    fs.writeFileSync(file, plaintext)
}

exportBundledCode()