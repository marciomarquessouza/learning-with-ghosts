import { STAR } from '../../const'
import { Items } from '../../entities'

export const stars: Items = {
    name: STAR,
    key: STAR,
    repeat: 11,
    xy: { x: 12, y: 0, stepX: 70 },
    bounceY: { start: 0.4, end: 0.8 },
}
