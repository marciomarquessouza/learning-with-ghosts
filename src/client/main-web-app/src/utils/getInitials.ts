export function getInitials(name: string) {
    const regex = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
    const initials = [...name.matchAll(regex)]

    return ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase()
}
