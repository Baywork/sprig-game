import Path from "path";
import * as fs from "fs"

export function scanDirectoryRecursive(path: string) {
    const files = []
    fs.readdirSync(path).forEach((val) => {
        const absPath = Path.join(path, val)
        if (fs.statSync(absPath).isDirectory()) {
            files.push(...scanDirectoryRecursive(absPath))
        } else {
            files.push(absPath)
        }
    })
    return files
}
