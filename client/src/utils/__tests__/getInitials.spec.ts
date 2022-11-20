import { getInitials } from '../getInitials'

describe('utils >> getInitials', () => {
    it('should return the initials of the given names correctly', () => {
        expect.hasAssertions()
        const samples = [
            {
                name: 'Marcio',
                expected: 'M',
            },
            {
                name: 'Marcio Marques',
                expected: 'MM',
            },
            {
                name: '',
                expected: '',
            },
            {
                name: '12',
                expected: '',
            },
            {
                name: '/',
                expected: '',
            },
        ]

        samples.forEach(({ name, expected }) => {
            expect(getInitials(name)).toBe(expected)
        })
    })
})
