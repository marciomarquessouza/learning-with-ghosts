export enum GAME_KEYS {
    FWD_KEY = 'fwdPressed',
    BKD_KEY = 'bkdPressed',
    LFT_KEY = 'lftPressed',
    RGT_KEY = 'rgtPressed',
    ESC_KEY = 'escPressed',
    SPACE_KEY = 'spacePressed',
    I_KEY = 'iPressed',
    M_KEY = 'mPressed',
}

export interface GameKeysInputs {
    [GAME_KEYS.FWD_KEY]: boolean
    [GAME_KEYS.BKD_KEY]: boolean
    [GAME_KEYS.LFT_KEY]: boolean
    [GAME_KEYS.RGT_KEY]: boolean
    [GAME_KEYS.ESC_KEY]: boolean
    [GAME_KEYS.SPACE_KEY]: boolean
    [GAME_KEYS.I_KEY]: boolean
    [GAME_KEYS.M_KEY]: boolean
}

export class KeyboardInputs {
    protected _pressed = false
    public gameKeysInputs: GameKeysInputs = {
        fwdPressed: false,
        bkdPressed: false,
        lftPressed: false,
        rgtPressed: false,
        escPressed: false,
        spacePressed: false,
        iPressed: false,
        mPressed: false,
    }

    protected _setKeyPressed(event: KeyboardEvent, keyPressed: boolean): void {
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.gameKeysInputs.fwdPressed = keyPressed
                break
            case 'KeyS':
            case 'ArrowDown':
                this.gameKeysInputs.bkdPressed = keyPressed
                break
            case 'KeyD':
            case 'ArrowRight':
                this.gameKeysInputs.rgtPressed = keyPressed
                break
            case 'KeyA':
            case 'ArrowLeft':
                this.gameKeysInputs.lftPressed = keyPressed
                break
            case 'Escape':
                this.gameKeysInputs.escPressed = keyPressed
                break
            case 'KeyI':
                this.gameKeysInputs.iPressed = keyPressed
                break
            case 'KeyM':
                this.gameKeysInputs.mPressed = keyPressed
                break
            case 'Space':
                this.gameKeysInputs.spacePressed = keyPressed
                break
        }
    }

    public onKeyDown(event: KeyboardEvent): void {
        this._setKeyPressed(event, true)
    }

    public onKeyUp(event: KeyboardEvent): void {
        this._setKeyPressed(event, false)
        this._pressed = false
    }
}
