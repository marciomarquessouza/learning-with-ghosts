export type keyActions = {
    isDown: boolean
}

export class Cursor {
    left: keyActions = { isDown: false }
    right: keyActions = { isDown: false }
    up: keyActions = { isDown: false }
    down: keyActions = { isDown: false }
}
