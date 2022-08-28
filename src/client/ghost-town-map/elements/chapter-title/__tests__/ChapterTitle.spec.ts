import ChapterTitle from '../ChapterTitle'
import { html, fixture, expect } from '@open-wc/testing'
import '../../index'

describe('client > elements > chapter-title > ChapterTitle', () => {
    it('renders properly with default values ', async () => {
        const chapterTitle: ChapterTitle = await fixture(html`<chapter-title></chapter-title>`)

        expect(chapterTitle.title).to.equal('')
        expect(chapterTitle.subtitle).to.equal('')
        expect(chapterTitle.chapterNumber).to.equal('01')
    })

    it('renders all props properly', async () => {
        const chapterTitle: ChapterTitle = await fixture(
            html`<chapter-title
                mainTitle="__MAIN__TITLE__"
                subtitle="__SUB__TITLE__"
                chapterNumber="__CHAPTER__NUMBER__"
            ></chapter-title>`
        )

        expect(chapterTitle.mainTitle).to.equal('__MAIN__TITLE__')
        expect(chapterTitle.subtitle).to.equal('__SUB__TITLE__')
        expect(chapterTitle.chapterNumber).to.equal('__CHAPTER__NUMBER__')
    })
})
