export default class KeyboardControls {
    protected _lockCommands = true
    protected _fwdPressed = false
    protected _bkdPressed = false
    protected _lftPressed = false
    protected _rgtPressed = false
    protected _escPressed = false
    protected _spacePressed = false
    protected _iPressed = false
    protected _mPressed = false
    protected _pressed = false

    protected _setKeyPressed(event: KeyboardEvent, keyPressed: boolean): void {
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this._fwdPressed = keyPressed
                break
            case 'KeyS':
            case 'ArrowDown':
                this._bkdPressed = keyPressed
                break
            case 'KeyD':
            case 'ArrowRight':
                this._rgtPressed = keyPressed
                break
            case 'KeyA':
            case 'ArrowLeft':
                this._lftPressed = keyPressed
                break
            case 'Escape':
                this._escPressed = keyPressed
                break
            case 'KeyI':
                this._iPressed = keyPressed
                break
            case 'Space':
                this._spacePressed = keyPressed
                break
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        this._setKeyPressed(event, true)
    }

    onKeyUp(event: KeyboardEvent): void {
        this._setKeyPressed(event, false)
        this._pressed = false
    }
}
