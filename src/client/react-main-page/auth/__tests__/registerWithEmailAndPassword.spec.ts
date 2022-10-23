import { registerWithEmailAndPassword } from '..'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { COLLECTIONS } from '../../const'

describe('auth >> registerWithEmailAndPassword', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should throw an Error in case of rejection of createUserWithEmailAndPassword', async () => {
        expect.hasAssertions()
        ;(createUserWithEmailAndPassword as jest.Mock).mockImplementation(() =>
            Promise.reject('__MOCK__ERROR__')
        )
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'
        try {
            await registerWithEmailAndPassword(mockName, mockEmail, mockPassword)
        } catch (error: any) {
            expect(error.message).toBe('Error to register with email and password')
        }
    })

    it('should throw an Error in case of rejection to add a new doc', async () => {
        expect.hasAssertions()
        ;(addDoc as jest.Mock).mockImplementation(() => Promise.reject('__MOCK__ERROR__'))
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'
        try {
            await registerWithEmailAndPassword(mockName, mockEmail, mockPassword)
        } catch (error: any) {
            expect(error.message).toBe('Error to register with email and password')
        }
    })

    it('should return a new user from createUserWithEmailAndPassword and the new user must be added in the users collection', async () => {
        const mockUID = '__MOCK__UID__'
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'
        ;(createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
            user: {
                uid: mockUID,
                email: mockEmail,
                name: mockName,
            },
        })

        await registerWithEmailAndPassword(mockName, mockEmail, mockPassword)

        expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1)
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            undefined,
            mockEmail,
            mockPassword
        )
        expect(collection).toHaveBeenCalledTimes(1)
        expect(collection).toHaveBeenCalledWith(undefined, COLLECTIONS.USERS)
        expect(addDoc).toHaveBeenCalledTimes(1)
        expect(addDoc).toHaveBeenCalledWith(undefined, {
            uid: mockUID,
            name: mockName,
            authProvider: 'local',
            email: mockEmail,
        })
    })
})
