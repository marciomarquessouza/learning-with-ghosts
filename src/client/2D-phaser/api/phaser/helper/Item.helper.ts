import { Items } from '../../../entities'
import { sceneHelper } from './Scene.helper'
import { itemsPhaser } from '../phaser-elements.cache'

export type ItemElement = Phaser.Physics.Arcade.Sprite

class ItemHelper {
    getItemByName(groupName: string, itemName: string): ItemElement {
        const items = itemsPhaser.get(groupName).children.getArray()
        return items.find(({ name }) => name === itemName) as ItemElement
    }

    createItems(items: Items, createId: () => string) {
        const { key, repeat, xy, bounceY, name } = items
        const scene = sceneHelper.getScene()
        const phaserItem = scene.physics.add.group({ key, repeat, setXY: xy })
        phaserItem.children.iterate((child) => child.setName(createId()))
        if (bounceY) {
            const { start, end } = bounceY
            // @ts-ignore
            phaserItem.children.iterate((child: ItemElement) => {
                child.setBounceY(Phaser.Math.FloatBetween(start, end))
            })
        }
        itemsPhaser.set(name, phaserItem)
    }

    disableItem(groupName: string, itemName: string) {
        const item = this.getItemByName(groupName, itemName)
        item.disableBody(true, true)
    }
}

export const itemHelper = new ItemHelper()
