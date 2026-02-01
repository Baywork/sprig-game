export default class Screen {
    get height(): number {
        return this._height;
    }

    get width(): number {
        return this._width;
    }

    private readonly _width: number
    private readonly _height: number

    private readonly pixels: string[][]

    private withinBounds = (x: number, y: number): boolean => {
        return x < this.width && y < this.height;
    }

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;

        this.pixels = new Array(height).fill([], 0, height).map(() => new Array(width).fill(".", 0, width))
    }

    public getPixelAt(x: number, y: number) {
        if (!this.withinBounds(x, y)) throw new Error(`Attempted to access address (${x}, ${y}) out of upper bounds (${this.width}, ${this.height}).`)
        return this.pixels[y][x]
    }

    public setPixelAt(x: number, y: number, newValue: string) {
        if (!this.withinBounds(x, y)) throw new Error(`Attempted to access address (${x}, ${y}) out of upper bounds (${this.width}, ${this.height}).`)
        this.pixels[y][x] = newValue;
    }

    /**
     @param {number} x Origin x-coordinate for the bottom left of the pixels to be placed. Left to right. Zero-indexed.
     @param {number} y Origin y-coordinate for the bottom left of the pixels to be placed. Top to bottom. Zero-indexed.
     @param {string} newPixels Set of pixel values to be applied over the current screen values.
     */
    public setPixelsAt(x: number, y: number, newPixels: string) {
        const rows = newPixels.split("\n")
        const matrix = rows.map((row) => row.split(""))

        return this.setPixelMatrixAt(x, y, matrix)
    }

    /**
     @param {number} x Origin x-coordinate for the bottom left of the pixels to be placed. Left to right. Zero-indexed.
     @param {number} y Origin y-coordinate for the bottom left of the pixels to be placed. Top to bottom. Zero-indexed.
     @param {string[][]} pixelMatrix Set of pixel values to be applied over the current screen values. Should be oriented pixelMatrix[x][y].
     */
    public setPixelMatrixAt(x: number, y: number, pixelMatrix: string[][]) {
        if (!this.withinBounds(x, y)) throw new Error(`Attempted to access address (${x}, ${y}) out of upper bounds (${this.width} x ${this.height}).`)
        if (!(pixelMatrix[0].length + x <= this.width, pixelMatrix.length + y <= this.height)) throw new Error(`Attempted to apply pixel matrix of size (${pixelMatrix[0].length} x ${pixelMatrix.length}) at (${x}, ${y}) out of upper bounds (${this.width} x ${this.height}).`)

        let yPos = y;
        for (const row of pixelMatrix) {
            row.forEach((val, index) => this.setPixelAt(index + x, yPos, val))
            yPos += 1
        }
    }

    toString() {
        return this.pixels.map((row) => row.join("")).join("\n")
    }
}