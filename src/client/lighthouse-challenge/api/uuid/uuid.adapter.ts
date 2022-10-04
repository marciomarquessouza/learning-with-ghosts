import { CreateIDAdapter } from '../../data'
import { v4 as uuid } from 'uuid'

export class UniqueIdentifierUUID implements CreateIDAdapter {
    create(): string {
        return uuid()
    }
}
