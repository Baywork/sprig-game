// arbitrary max for the moment
const TERMINAL_VELOCITY = 20;

// m/s/s. tbd
const GRAVITY = 10;

// todo: make more complicated dunno
export function gravityVelocity(previousGravity: number, dTimeMS: number) : number {
    if (previousGravity >= TERMINAL_VELOCITY) return TERMINAL_VELOCITY

    const addtVelocity = GRAVITY * dTimeMS * (1/100)
    return previousGravity + addtVelocity
}