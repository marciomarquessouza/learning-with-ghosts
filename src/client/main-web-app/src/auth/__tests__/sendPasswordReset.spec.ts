import { sendPasswordReset } from '..'
import { sendPasswordResetEmail } from 'firebase/auth'

describe('auth >> sendPasswordReset', () => {
    it('should call the sendPasswordResetEmail correctly', async () => {
        const mockEmail = '__MOCK__EMAIL__'
        await sendPasswordReset(mockEmail)
        expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1)
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(undefined, mockEmail)
    })

    it('should throw an Error in case of rejection of sendPasswordResetEmail', async () => {
        expect.hasAssertions()
        ;(sendPasswordResetEmail as jest.Mock).mockImplementation(() =>
            Promise.reject('__MOCK__ERROR__')
        )
        const mockEmail = '__MOCK__EMAIL__'
        try {
            await sendPasswordReset(mockEmail)
        } catch (error: any) {
            expect(error.message).toBe('Error sending the reset e-mail')
        }
    })
})
