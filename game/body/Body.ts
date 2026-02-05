export abstract class Body {
    abstract x: number
    abstract y: number

    abstract width: number
    abstract height: number

    abstract name: string

    abstract sprite(): string

    isWithinRange(minX: number, minY: number, maxX: number, maxY: number) {
        const upperX = this.width + this.x
        const upperY = this.height + this.y

        return (minX < upperX && maxX > this.x && minY < upperY && maxY > this.y)
    }
}