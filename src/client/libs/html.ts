function html(text: TemplateStringsArray, ...props: (string | number)[]): HTMLElement {
    const element = document.createElement('div')
    const content = text.reduce(
        (result, currentString, index) =>
            `${result}${currentString}${props[index] ? `${props[index]}` : ''}`,
        ''
    )
    element.innerHTML = content
    return element
}

export default html
