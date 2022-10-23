import { logInWithEmailAndPassword } from '..'
import { signInWithEmailAndPassword } from 'firebase/auth'

describe('auth >> logInWithEmailAndPassword', () => {
    it('should call the signInWithEmailAndPassword correctly', async () => {
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'
        await logInWithEmailAndPassword(mockEmail, mockPassword)
        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, mockEmail, mockPassword)
    })

    it('should throw an Error in case of rejection of signInWithEmailAndPassword', async () => {
        expect.hasAssertions()
        ;(signInWithEmailAndPassword as jest.Mock).mockImplementation(() =>
            Promise.reject('__MOCK__ERROR__')
        )
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'
        try {
            await logInWithEmailAndPassword(mockEmail, mockPassword)
        } catch (error: any) {
            expect(error.message).toBe('Error to sign in with email and password')
        }
    })
})
