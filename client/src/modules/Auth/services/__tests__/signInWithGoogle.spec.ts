import { signInWithGoogle } from '..'
import { signInWithPopup } from 'firebase/auth'
import { addDoc, getDocs, collection } from 'firebase/firestore'
import { COLLECTIONS } from '../../../../const'

describe('auth >> signInWithGoogle', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should throw an Error in case of rejection of signInWithPopup', async () => {
        expect.hasAssertions()
        ;(signInWithPopup as jest.Mock).mockImplementation(() => Promise.reject('__MOCK__ERROR__'))
        try {
            await signInWithGoogle()
        } catch (error: any) {
            expect(error.message).toBe('Error to sign in with a Google Account')
        }
    })

    it('should throw an Error in case of rejection to get a doc', async () => {
        expect.hasAssertions()
        const mockUID = '__MOCK__UID__'
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        ;(signInWithPopup as jest.Mock).mockResolvedValue({
            user: {
                uid: mockUID,
                email: mockEmail,
                name: mockName,
            },
        })
        ;(getDocs as jest.Mock).mockImplementation(() => Promise.reject('__MOCK__ERROR__'))
        try {
            await signInWithGoogle()
        } catch (error: any) {
            expect(error.message).toBe('Error to sign in with a Google Account')
        }
    })

    it('should signIn correctly with a valid google account', async () => {
        const mockUID = '__MOCK__UID__'
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        const mockUser = {
            uid: mockUID,
            email: mockEmail,
            displayName: mockName,
        }
        ;(signInWithPopup as jest.Mock).mockResolvedValue({
            user: mockUser,
        })
        ;(getDocs as jest.Mock).mockResolvedValue({ docs: [mockUser] })

        await signInWithGoogle()

        expect(signInWithPopup).toHaveBeenCalledTimes(1)
        expect(collection).toHaveBeenCalledTimes(1)
        expect(collection).toHaveBeenCalledWith(undefined, COLLECTIONS.USERS)
        expect(getDocs).toHaveBeenCalledTimes(1)
        expect(addDoc).toHaveBeenCalledTimes(0)
    })

    it('should signIn correctly with a valid google account and add a new user if this the first access', async () => {
        const mockUID = '__MOCK__UID__'
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        ;(signInWithPopup as jest.Mock).mockResolvedValue({
            user: {
                uid: mockUID,
                email: mockEmail,
                displayName: mockName,
            },
        })
        ;(getDocs as jest.Mock).mockResolvedValue({ docs: [] })

        await signInWithGoogle()

        expect(signInWithPopup).toHaveBeenCalledTimes(1)
        expect(collection).toHaveBeenCalledTimes(2)
        expect(collection).toHaveBeenCalledWith(undefined, COLLECTIONS.USERS)
        expect(getDocs).toHaveBeenCalledTimes(1)
        expect(addDoc).toHaveBeenCalledTimes(1)
        expect(addDoc).toHaveBeenCalledWith(undefined, {
            uid: mockUID,
            name: mockName,
            authProvider: 'google',
            email: mockEmail,
        })
    })
})
