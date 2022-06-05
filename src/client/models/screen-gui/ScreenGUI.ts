import createChapterTitle, { ChapterTitleProps } from '../../components/chapter-title'
import createLifeMenu, { LiveMenuProps } from '../../components/live-menu'
import { LiveMenu } from '../../components/live-menu/LiveMenu'
import { PARAMS } from '../../const'

export class ScreenGUI {
    private _lifeMenu: LiveMenu | null = null

    public showChapterTitle(props: ChapterTitleProps) {
        const chapterTitle = createChapterTitle(props)
        setTimeout(() => chapterTitle.unmount(), PARAMS.CHAPTER_TITLE_FADE_OUT)
    }

    public initiateLifeMenu(props: LiveMenuProps) {
        this._lifeMenu = createLifeMenu(props)
    }

    public setLives(lives: number) {
        this._lifeMenu?.setLives(lives)
    }
}
