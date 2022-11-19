import MenuObserver from './MenuObserver'
import MenuSubject from './MenuSubject'

const menuObserver = new MenuObserver('screenGUI')
const menuSubject = new MenuSubject()
menuSubject.subscribe(menuObserver)

export { menuObserver, menuSubject }
